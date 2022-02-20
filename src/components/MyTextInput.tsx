import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState
} from 'react';
import {
	View,
	TextStyle,
	StyleSheet,
	TextInput,
	StyleProp,
	TouchableOpacity,
	Platform,
	TextInputProps,
	ViewStyle,
	Animated,
	LayoutChangeEvent
} from 'react-native';
import { Colors } from '_styles/index';
import MyText from './MyText';
import Row from './Row';
import MySvgImage from './MySvgImage';
import { getFontNameByWeight } from '_src/utils';

const isEmpty = (str: any) => {
	return str == null || str == undefined || str == '';
};

interface IProps extends TextInputProps {
	boxStyle?: StyleProp<ViewStyle>;
	fixedLabel?: boolean;
	label?: string;
	labelStyle?: StyleProp<TextStyle>;
	icon?: Element;
	focusedIcon?: Element;
	clearBtn?: boolean;
	engDigitFont?: boolean;
	forwardedRef?: React.RefObject<TextInput>;
	autoAlign?: boolean;
	borderColor?: string;
	activeBorderColor?: string;
	showSoftInputOnFocus?: boolean;
}

const MyTextInput = forwardRef<TextInput, IProps>((props, forwardedRef) => {
	const { value, defaultValue, fixedLabel, label } = props;
	const [isFocused, setIsFocused] = useState(false);
	const [labelHeight, setLabelHeight] = useState(24);
	const [boxHeight, setBoxHeight] = useState(60);
	const inputRef = useRef<TextInput>(null);
	const transY = useRef(new Animated.Value(0)).current;
	const prevMoveLabelToTop = useRef(
		!isEmpty(label) && (isFocused || !isEmpty(value) || fixedLabel == true)
	);

	let animationFunc = Animated.timing(transY, {
		toValue: 0,
		useNativeDriver: true
	});

	// @ts-ignore
	useImperativeHandle(forwardedRef, () => inputRef.current);

	useEffect(() => {
		if (fixedLabel || !isEmpty(value) || !isEmpty(defaultValue)) {
			moveLabelToTop();
		}
	});

	const moveLabelToTop = () => {
		animationFunc.stop();
		animationFunc = Animated.spring(transY, {
			toValue: -0.5 * (boxHeight - labelHeight) + 5,
			friction: 10,
			tension: 100,
			useNativeDriver: true
		});
		animationFunc.start();
	};

	const moveLabelToCenter = () => {
		animationFunc.stop();
		animationFunc = Animated.spring(transY, {
			toValue: 0,
			friction: 8,
			tension: 100,
			useNativeDriver: true
		});
		animationFunc.start();
	};

	const moveToTop =
		!isEmpty(label) && (isFocused || !isEmpty(value) || fixedLabel == true);
	if (prevMoveLabelToTop.current != moveToTop) {
		prevMoveLabelToTop.current = moveToTop;
		if (moveToTop) {
			moveLabelToTop();
		} else {
			moveLabelToCenter();
		}
	}

	const {
		borderColor,
		activeBorderColor,
		labelStyle,
		icon,
		focusedIcon,
		clearBtn,
		boxStyle,
		engDigitFont,
		style,
		onFocus,
		onBlur,
		autoCorrect,
		autoAlign,
		placeholder,
		showSoftInputOnFocus,
		...rest
	} = props;

	const { width } = StyleSheet.flatten(boxStyle) || {};
	const { textAlign, fontWeight } = StyleSheet.flatten(style) || {};
	const isLabelOnTop =
		!isEmpty(label) && (isFocused || !isEmpty(value) || fixedLabel == true);
	const isStartWithPersianChar = /^[\u0600-\u06FF\s]/.test(
		value || placeholder || ''
	);
	const autoTextAlign = isStartWithPersianChar ? 'right' : 'left';
	const newTextAlign = autoAlign ? autoTextAlign : textAlign || 'right';
	const labelIcon = (isLabelOnTop ? focusedIcon : icon) || icon;
	const labelAnimatedStyle = {
		transform: [{ translateY: transY }]
	};
	return (
		<TouchableOpacity
			onPress={inputRef.current?.focus}
			activeOpacity={1}
			style={[boxStyle, width ? { width } : { width: '100%' }]}
		>
			<Row
				style={[
					styles.container,
					isFocused
						? {
								borderColor: activeBorderColor || '#333'
						  }
						: { borderColor: borderColor || '#eee' },
					boxStyle,
					styles.rest
				]}
				onLayout={(e: LayoutChangeEvent) => {
					setBoxHeight(e.nativeEvent.layout.height);
				}}
			>
				<View style={styles.innerBox}>
					{!isEmpty(label) ? (
						<Animated.View
							style={[
								styles.labelRow,
								{
									position: 'absolute',
									left: 10,
									right: 10
								},
								labelAnimatedStyle
							]}
							onLayout={(e: LayoutChangeEvent) => {
								setLabelHeight(e.nativeEvent.layout.height);
							}}
						>
							{labelIcon && (
								<View style={{ marginLeft: 3 }}>
									{labelIcon}
								</View>
							)}
							<MyText
								weight={isLabelOnTop ? '500' : '400'}
								style={labelStyle}
							>
								{label}
							</MyText>
						</Animated.View>
					) : null}
					<TextInput
						placeholder={placeholder}
						showSoftInputOnFocus={showSoftInputOnFocus ?? true}
						value={value}
						style={[
							styles.input,
							label && !isLabelOnTop ? { opacity: 0 } : null,
							isLabelOnTop ? { marginTop: labelHeight } : null,
							label && !isLabelOnTop
								? { marginVertical: labelHeight / 2 }
								: null,
							style,
							{
								textAlign: newTextAlign,
								fontWeight: undefined,
								fontFamily: getFontNameByWeight(
									fontWeight,
									!engDigitFont
								)
							}
						]}
						autoCorrect={autoCorrect || false}
						placeholderTextColor="#ccc"
						returnKeyType="done"
						onFocus={(e) => {
							setIsFocused(true);
							if (typeof onFocus == 'function') {
								onFocus(e);
							}
						}}
						onBlur={(e) => {
							setIsFocused(false);
							if (typeof onBlur == 'function') {
								onBlur(e);
							}
						}}
						{...rest}
						ref={inputRef}
					/>
				</View>
				{clearBtn == true && (
					<TouchableOpacity
						onPress={() => props.onChangeText?.('')}
						style={
							isEmpty(value)
								? styles.disableClearBtn
								: styles.clearBtn
						}
						disabled={isEmpty(value)}
					>
						<MySvgImage
							style={styles.clearIcon}
							source="CloseIcon"
							width={22}
							height={22}
							fill="#333"
						/>
					</TouchableOpacity>
				)}
			</Row>
		</TouchableOpacity>
	);
});

export default MyTextInput;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderColor: '#eee',
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 5
	},
	rest: {
		width: undefined,
		padding: 0,
		margin: 0,
		paddingRight: 0,
		paddingLeft: 0,
		paddingBottom: 0,
		paddingTop: 0,
		marginRight: 0,
		marginLeft: 0,
		marginBottom: 0,
		marginTop: 0
	},
	innerBox: {
		flex: 1,
		justifyContent: 'center'
	},
	input: {
		color: Colors.PRIMARY,
		paddingVertical: 5,
		paddingHorizontal: 10,
		height: 40,
		fontSize: 16
	},
	disableClearBtn: {
		margin: 3,
		justifyContent: 'center',
		opacity: 0
	},
	clearBtn: {
		margin: 3,
		justifyContent: 'center'
	},
	clearIcon: {
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 20,
		padding: 6,
		margin: 5
	},
	labelRow: { flexDirection: 'row-reverse', alignItems: 'center' }
});
