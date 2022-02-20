import React, { useEffect } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import Animated, {
	withSequence,
	withDelay,
	withRepeat,
	withTiming,
	useSharedValue,
	useAnimatedStyle
} from 'react-native-reanimated';

interface IProps extends Animated.AnimateProps<ViewProps> {
	isActive: boolean;
}

const AnimatedCircle = ({ isActive, style, ...rest }: IProps) => {
	const opacity = useSharedValue(0);
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value
	}));

	useEffect(() => {
		if (isActive) {
			opacity.value = withRepeat(
				withSequence(
					withDelay(50, withTiming(1)),
					withDelay(800, withTiming(0.1))
				),
				-1
			);
		} else {
			opacity.value = 0;
		}
	}, [isActive]);

	return (
		<Animated.View
			style={[style, styles.circle, animatedStyle]}
			{...rest}
		/>
	);
};

const styles = StyleSheet.create({
	circle: {
		width: 11,
		height: 11,
		borderRadius: 10,
		backgroundColor: '#ff3566'
	}
});

export default AnimatedCircle;
