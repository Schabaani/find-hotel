import React, { memo } from 'react';
import {
	View,
	Switch,
	StyleSheet,
	TouchableOpacity,
	StyleProp,
	ViewStyle
} from 'react-native';

type Props = {
	value: boolean;
	activeColor: string;
	inActiveColor: string;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
};

const MySwitch = (props: Props) => {
	const {
		value,
		activeColor,
		inActiveColor,
		disabled,
		style,
		onPress
	} = props;
	return (
		<View style={[style, styles.box]}>
			<View
				style={[
					styles.innerBox,
					{
						backgroundColor: value ? activeColor : inActiveColor
					}
				]}
			>
				<Switch
					trackColor={{ false: inActiveColor, true: activeColor }}
					thumbColor={value ? '#fff' : '#f5f5f5'}
					value={value}
				/>
			</View>
			<TouchableOpacity
				style={styles.cover}
				onPress={onPress}
				activeOpacity={1}
				disabled={disabled}
			/>
		</View>
	);
};

export default memo(MySwitch);

const styles = StyleSheet.create({
	box: {
		overflow: 'hidden'
	},
	innerBox: {
		borderRadius: 30
	},
	cover: {
		zIndex: 1,
		position: 'absolute',
		width: 200,
		height: 200
	}
});
