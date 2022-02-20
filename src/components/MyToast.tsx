import React, { PureComponent } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import MyText from './MyText';

interface IProps {
	message: string;
	isVisible: boolean;
	duration?: number;
	backgroundColor?: string;
	color?: string;
	position?: 'top' | 'bottom';
}

export default class MyToast extends PureComponent<IProps> {
	minY = 0;
	maxY = 0;
	transY = new Animated.Value(0);
	animationFunc = Animated.timing(this.transY, { toValue: 0 });
	timeoutHandler = 0;

	componentDidMount() {
		const { isVisible, position } = this.props;
		if (isVisible) this.show();
		if (position == 'top') {
			this.minY = 0;
			this.maxY = 200;
		} else {
			this.minY = 0;
			this.maxY = -200;
		}
	}

	componentDidUpdate(prevProps: IProps) {
		const { isVisible, message } = this.props;
		if (isVisible != prevProps.isVisible) {
			if (this.props.isVisible) {
				this.show(this.hide);
			} else {
				this.hide();
			}
		} else if (message != prevProps.message) {
			this.hide(this.show);
		}
	}

	show = (callback?: () => void) => {
		const { duration } = this.props;
		this.animationFunc.stop();
		this.animationFunc = Animated.sequence([
			Animated.spring(this.transY, {
				toValue: this.maxY,
				friction: 8,
				tension: 100,
				useNativeDriver: true
			}),
			Animated.delay(duration || 3000)
		]);
		this.animationFunc.start((res) => {
			if (res.finished) {
				callback?.();
			}
		});
	};

	hide = (callback?: () => void) => {
		this.animationFunc.stop();
		this.animationFunc = Animated.timing(this.transY, {
			toValue: this.minY,
			duration: 100,
			useNativeDriver: true
		});
		this.animationFunc.start((res) => {
			if (res.finished) {
				callback?.();
			}
		});
	};

	render() {
		const { message, backgroundColor, color, position } = this.props;

		return (
			<Animated.View
				style={[
					styles.toast,
					position == 'top' ? { top: -180 } : { bottom: -180 },
					{
						opacity: this.transY.interpolate({
							inputRange:
								position == 'top'
									? [0, 150, 200]
									: [-200, -150, 0],
							outputRange:
								position == 'top' ? [0, 0, 1] : [1, 0, 0]
						}),
						transform: [
							{
								translateY: this.transY
							}
						]
					}
				]}
			>
				<TouchableOpacity
					style={[
						styles.message,
						{ backgroundColor: backgroundColor || '#000000c0' }
					]}
					onPress={() => this.hide()}
					activeOpacity={1}
				>
					<MyText color={color || '#fff'}>{message}</MyText>
				</TouchableOpacity>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	toast: {
		width: '100%',
		alignItems: 'center',
		position: 'absolute',
		zIndex: 999
	},
	message: {
		borderRadius: 40,
		paddingHorizontal: 15,
		paddingVertical: 3
	}
});
