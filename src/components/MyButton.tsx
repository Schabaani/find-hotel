import React, { PureComponent } from 'react';
import {
	View,
	ActivityIndicator,
	StyleSheet,
	StyleProp,
	ViewStyle,
	TouchableWithoutFeedback,
	TouchableWithoutFeedbackProps,
	Animated
} from 'react-native';
import MyText from '_components/MyText';

type Props = TouchableWithoutFeedbackProps & {
	onPress?: () => void;
	onPressIn?: () => void;
	onPressOut?: () => void;
	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
	text?: string;
	textColor?: string;
	fontSize?: number;
	color?: string;
	shadowColor?: string;
	shadowDepth?: number;
	loading?: boolean;
	loadingColor?: string;
	loadingSize?: 'small' | 'large';
	height?: string | number;
	width?: string | number;
	disableAnimation?: boolean;
	is3D?: boolean;
};

export default class MyButton extends PureComponent<Props> {
	defaultDepth = this.props.is3D ? this.props.shadowDepth || 4 : 0;
	shadowY = new Animated.Value(this.defaultDepth);
	scale = new Animated.Value(1);
	opacity = new Animated.Value(1);

	onPressIn = () => {
		const { is3D, loading, disableAnimation, onPressIn } = this.props;
		onPressIn?.();
		if (loading) return;
		if (disableAnimation) {
			Animated.spring(this.opacity, {
				toValue: 0.5,
				useNativeDriver: true
			}).start();
		} else if (is3D) {
			this.shadowY.setValue(0);
		} else {
			Animated.spring(this.scale, {
				toValue: 0.97,
				useNativeDriver: true
			}).start();
		}
	};

	onPressOut = () => {
		const { is3D, disableAnimation, onPressOut } = this.props;
		onPressOut?.();
		if (disableAnimation) {
			Animated.spring(this.opacity, {
				toValue: 1,
				friction: 2,
				tension: 10,
				useNativeDriver: true
			}).start();
		} else if (is3D) {
			Animated.spring(this.shadowY, {
				toValue: this.defaultDepth,
				friction: 20,
				tension: 400,
				useNativeDriver: true
			}).start();
		} else {
			Animated.spring(this.scale, {
				toValue: 1,
				friction: 2,
				tension: 10,
				useNativeDriver: true
			}).start();
		}
	};

	render() {
		const {
			loading,
			disabled,
			loadingSize,
			loadingColor,
			onPress,
			text,
			textColor,
			fontSize,
			style,
			color,
			shadowColor,
			width,
			height,
			is3D,
			children,
			...rest
		} = this.props;
		const animatedStyle = {
			opacity: this.opacity.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 1]
			}),
			transform: [
				{
					scale: this.scale.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 1]
					})
				},
				{
					translateY: this.shadowY.interpolate({
						inputRange: [0, 1],
						outputRange: [0, -1]
					})
				}
			]
		};
		const animatedStyle3D = {
			opacity: this.opacity.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 1]
			}),
			transform: [
				{
					translateY: this.shadowY.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 1]
					})
				}
			]
		};
		const buttonstyle = StyleSheet.flatten(style) || {};
		const flexDirection = buttonstyle.flexDirection || 'row-reverse';
		const bgColor = shadowColor || '#0045db';
		return (
			<TouchableWithoutFeedback
				onPress={onPress}
				disabled={disabled || loading}
				onPressIn={this.onPressIn}
				onPressOut={this.onPressOut}
				{...rest}
			>
				<View
					style={[
						style,
						width ? { width } : null,
						height ? { height } : null,
						styles.restPadding,
						is3D ? { paddingBottom: this.defaultDepth } : null,
						{
							backgroundColor: 'transparent',
							borderWidth: undefined
						}
					]}
				>
					<Animated.View style={animatedStyle}>
						{is3D && (
							<Animated.View
								style={[
									styles.defaultShadow,
									style,
									styles.restWidth,
									styles.restPadding,
									styles.restMargin,
									animatedStyle3D,
									{
										backgroundColor: bgColor,
										borderWidth: undefined
									}
								]}
							/>
						)}
						<View
							style={[
								styles.button,
								style,
								styles.restWidth,
								styles.restMargin,
								color ? { backgroundColor: color } : null,
								height ? { minHeight: undefined } : null,
								{ flexDirection }
							]}
						>
							{loading != false && loading != undefined && (
								<ActivityIndicator
									size={loadingSize || 'large'}
									color={loadingColor || '#fff'}
								/>
							)}

							{!(loading != false && loading != undefined) &&
								(children == undefined ? (
									<MyText
										weight="bold"
										style={[
											styles.buttonText,
											textColor
												? { color: textColor }
												: null,
											fontSize ? { fontSize } : null
										]}
									>
										{text}
									</MyText>
								) : (
									children
								))}
						</View>
					</Animated.View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		minHeight: 50,
		borderRadius: 10,
		backgroundColor: '#1a62ff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	defaultShadow: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		borderRadius: 10
	},
	buttonText: {
		color: '#fff',
		fontSize: 14
	},
	restWidth: {
		width: '100%'
	},
	restMargin: {
		margin: 0,
		marginRight: 0,
		marginLeft: 0,
		marginBottom: 0,
		marginTop: 0,
		marginHorizontal: 0,
		marginVertical: 0,
		marginEnd: 0,
		marginStart: 0
	},
	restPadding: {
		padding: 0,
		paddingRight: 0,
		paddingLeft: 0,
		paddingBottom: 0,
		paddingTop: 0,
		paddingVertical: 0,
		paddingHorizontal: 0,
		paddingEnd: 0,
		paddingStart: 0
	}
});
