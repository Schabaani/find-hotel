import React, { memo, PropsWithChildren } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

const Row = (props: PropsWithChildren<ViewProps>) => {
	const { children, style, ...rest } = props;
	const rowstyle = StyleSheet.flatten(style) || {};
	const flexDirection = rowstyle.flexDirection || 'row-reverse';
	return (
		<View style={[style, { flexDirection }]} {...rest}>
			{children}
		</View>
	);
};

export default memo(Row);
