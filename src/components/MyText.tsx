import React, { memo, PropsWithChildren } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { TFontWeight } from '_src/interfaces';
import { getFontNameByWeight } from '_src/utils';
import { toPersianDigit } from '_utils/formatters';

type TProps = TextProps & {
	weight?: TFontWeight;
	color?: string;
	fontSize?: number;
	fontFamily?: string;
	textAlign?: 'auto' | 'right' | 'left' | 'center' | 'justify';
	dontChangeDigits?: boolean;
};

const MyText = (props: PropsWithChildren<TProps>) => {
	const {
		style,
		color,
		weight,
		children,
		fontSize,
		textAlign,
		fontFamily,
		dontChangeDigits,
		...rest
	} = props;
	const text =
		(typeof children == 'string' || typeof children == 'number') &&
		dontChangeDigits !== true
			? toPersianDigit(children)
			: children;
	const textStyle = StyleSheet.flatten(style) || {};
	const fontName = fontFamily || textStyle.fontFamily;
	const styleAttr = [
		style,
		{
			fontWeight: fontName ? weight || textStyle.fontWeight : undefined,
			fontFamily: fontName
				? fontName
				: getFontNameByWeight(weight || textStyle.fontWeight),
			fontSize: (fontSize || textStyle.fontSize) ?? 14,
			textAlign: textAlign || textStyle.textAlign || 'right',
			color: color || textStyle.color
		}
	];

	return (
		<Text allowFontScaling={false} style={styleAttr} {...rest}>
			{text}
		</Text>
	);
};

export default memo(MyText);
