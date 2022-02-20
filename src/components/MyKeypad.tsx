import React, { FC, useEffect, useRef, useState } from 'react';
import {
	View,
	ViewStyle,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	StyleProp
} from 'react-native';
import useTheme from '_utils/useTheme';
import MySvgImage from './MySvgImage';
import MyText from './MyText';

const { width } = Dimensions.get('window');

const Colors = {
	dark: {
		backgroundColor: '#1f2229',
		button: {
			textColor: '#fff',
			activeTextColor: '#333843',
			borderColor: '#3b4151',
			backgroundColor: '#2e333f',
			activeBgColor: '#fff'
		}
	},
	light: {
		backgroundColor: '#fff',
		button: {
			textColor: '#333843',
			activeTextColor: '#fff',
			borderColor: '#dee0e4',
			backgroundColor: '#f6f6f6',
			activeBgColor: '#2e333f'
		}
	}
};

const KeypadButton: FC<{
	value: string;
	theme: 'dark' | 'light';
	disabled: boolean;
	onPress: (val: string) => void;
	render?: (isActive: boolean) => React.ReactElement;
	style?: StyleProp<ViewStyle>;
}> = (props) => {
	const {
		style = {},
		value,
		onPress,
		disabled = false,
		render,
		theme
	} = props;
	const timeoutRef = useRef(0);
	const [isActive, setIsActive] = useState(false);

	const btnColors = Colors[theme].button;

	const activeStyle = {
		backgroundColor: btnColors.activeBgColor,
		borderWidth: 0
	};

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, []);

	return (
		<TouchableOpacity
			style={[
				style,
				styles.btn,
				{
					borderColor: btnColors.borderColor,
					backgroundColor: btnColors.backgroundColor
				},
				isActive ? activeStyle : null
			]}
			onPress={() => onPress(value)}
			onPressIn={() => setIsActive(true)}
			onPressOut={() => {
				timeoutRef.current = setTimeout(() => setIsActive(false), 0);
			}}
			activeOpacity={1}
			disabled={disabled}
		>
			{render ? (
				render(isActive)
			) : (
				<MyText
					weight="black"
					fontSize={30}
					color={
						isActive
							? btnColors.activeTextColor
							: btnColors.textColor
					}
				>
					{value}
				</MyText>
			)}
		</TouchableOpacity>
	);
};

const ClearButton: FC<{
	disabled: boolean;
	theme: 'dark' | 'light';
	onPress: (val: string) => void;
}> = (props) => {
	const { disabled = false, theme = 'dark' } = props;
	const count = useRef(0);
	const timeoutRef = useRef(0);
	const intervalRef = useRef(0);
	const intervalTimeout = useRef(0);
	const [isActive, setIsActive] = useState(false);

	const activeStyle = {
		backgroundColor: Colors[theme].button.activeBgColor
	};

	const onPress = () => {
		props.onPress('DEL');
	};

	const startInterval = () => {
		let t = 80;
		if (count.current > 10) {
			t = 0;
		} else if (count.current > 5) {
			t = 40;
		}
		onPress();
		count.current += 1;
		intervalRef.current = setTimeout(startInterval, t);
	};

	const onPressIn = () => {
		onPress();
		setIsActive(true);
		count.current = 0;
		intervalTimeout.current = setTimeout(startInterval, 400);
	};

	const onPressOut = () => {
		clearTimeout(intervalRef.current);
		timeoutRef.current = setTimeout(() => setIsActive(false), 0);
		clearTimeout(intervalTimeout.current);
	};

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
			clearTimeout(intervalRef.current);
			clearTimeout(intervalTimeout.current);
		};
	}, []);

	return (
		<TouchableOpacity
			style={[
				styles.btn,
				styles.clearBtnStyle,
				{ borderColor: Colors[theme].button.borderColor },
				isActive ? activeStyle : null
			]}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			activeOpacity={1}
			disabled={disabled}
		>
			<MySvgImage
				source="Clear"
				width={40}
				height={40}
				fill={isActive ? Colors[theme].button.activeTextColor : '#fff'}
			/>
		</TouchableOpacity>
	);
};

const ConfirmButton: FC<{
	disabled: boolean;
	theme: 'dark' | 'light';
	onPress: (val: string) => void;
}> = (props) => {
	const { onPress, disabled = false, theme = 'dark' } = props;
	const timeoutRef = useRef(0);
	const [isActive, setIsActive] = useState(false);

	const activeStyle = {
		backgroundColor: Colors[theme].button.activeBgColor
	};

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, []);

	return (
		<TouchableOpacity
			style={[
				styles.btn,
				styles.confirmBtnStyle,
				{ borderColor: Colors[theme].button.borderColor },
				isActive ? activeStyle : null
			]}
			onPress={() => onPress('Backspace')}
			onPressIn={() => setIsActive(true)}
			onPressOut={() => {
				timeoutRef.current = setTimeout(() => setIsActive(false), 0);
			}}
			activeOpacity={1}
			disabled={disabled}
		>
			<MySvgImage
				source="CheckMark"
				width={36}
				height={36}
				fill={isActive ? Colors[theme].button.activeTextColor : '#fff'}
			/>
		</TouchableOpacity>
	);
};

const MyKeypad: FC<{
	disabled?: boolean;
	onConfirm?: () => void;
	onDeny?: () => void;
	value?: string;
	onChange: (val: string) => void;
	theme?: 'dark' | 'light';
}> = (props) => {
	const {
		value = '',
		onChange,
		onDeny = () => {},
		onConfirm = () => {},
		disabled = false
	} = props;
	const [localVal, setLocalVal] = useState(value);
	const valRef = useRef(value);
	const { isDark } = useTheme();
	const themeKey = isDark ? 'dark' : 'light';
	const theme = props.theme ? props.theme : themeKey;

	useEffect(() => {
		valRef.current = value;
	}, [value, localVal]);

	const onKeyPress = (key: string) => {
		let newVal = `${valRef.current}${key}`;
		if (key == 'DEL') {
			newVal =
				valRef.current && valRef.current.length
					? `${valRef.current}`.substr(0, valRef.current.length - 1)
					: '';
		}

		if (newVal != valRef.current) {
			valRef.current = newVal;
			onChange(newVal);
			setLocalVal(newVal);
		}
	};

	return (
		<TouchableOpacity
			style={[
				styles.keypad,
				{ backgroundColor: Colors[theme].backgroundColor }
			]}
			activeOpacity={1}
		>
			<View style={styles.numberView}>
				{['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
					(num: string) => (
						<KeypadButton
							theme={theme}
							key={num}
							value={num}
							disabled={disabled}
							onPress={onKeyPress}
						/>
					)
				)}
				<KeypadButton
					value="Cancel"
					theme={theme}
					disabled={disabled}
					onPress={onDeny}
					render={(isActive) => (
						<MySvgImage
							source="CloseIcon"
							width={20}
							height={20}
							fill={
								isActive
									? Colors[theme].button.activeTextColor
									: '#f00'
							}
						/>
					)}
				/>
				<KeypadButton
					value="0"
					theme={theme}
					disabled={disabled}
					onPress={onKeyPress}
				/>
				<KeypadButton
					value="."
					theme={theme}
					disabled={disabled || value.indexOf('.') > 0}
					onPress={onKeyPress}
				/>
			</View>
			<View style={styles.extraBtns}>
				<ClearButton
					theme={theme}
					disabled={disabled || value.length == 0}
					onPress={onKeyPress}
				/>
				<ConfirmButton
					theme={theme}
					disabled={disabled}
					onPress={onConfirm}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default MyKeypad;

const styles = StyleSheet.create({
	keypad: {
		flexDirection: 'row',
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		padding: 25
	},
	numberView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		width: (width - 40) * 0.72
	},
	btn: {
		borderWidth: 1,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		height: (width - 40) * 0.22,
		width: (width - 40) * 0.22,
		marginBottom: (width - 40) * 0.03
	},
	extraBtns: {
		marginLeft: (width - 40) * 0.03
	},
	clearBtnStyle: {
		backgroundColor: '#ffac2c'
	},
	confirmBtnStyle: {
		backgroundColor: '#39c7a5',
		height: (width - 40) * 0.72
	}
});
