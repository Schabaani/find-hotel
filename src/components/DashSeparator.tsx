import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

const DashSeparator = ({
	count,
	style,
	space = 5,
	color = '#2a2f35',
	thickness = 1,
	dir = 'row'
}: {
	count: number;
	space?: number;
	style?: StyleProp<ViewStyle>;
	thickness?: number;
	color?: string;
	dir?: 'row' | 'column';
}) => {
	const ItemStyle =
		dir == 'row'
			? {
					flex: 1,
					height: thickness,
					borderRadius: thickness / 2,
					backgroundColor: color
			  }
			: {
					flex: 1,
					width: thickness,
					borderRadius: thickness / 2,
					backgroundColor: color
			  };
	return (
		<View
			style={[
				style,
				{
					flexDirection: dir
				}
			]}
		>
			{Array.from({ length: count })
				.map((_, idx) => idx)
				.map((val, idx) => {
					const margin =
						dir == 'column'
							? { marginTop: space }
							: { marginLeft: space };
					return (
						<View
							key={val}
							style={[ItemStyle, idx ? margin : null]}
						/>
					);
				})}
		</View>
	);
};

export default memo(DashSeparator);
