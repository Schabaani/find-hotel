import React, { PureComponent } from 'react';
import {
	Image,
	View,
	ImageSourcePropType,
	StyleProp,
	ViewStyle,
	ImageStyle,
	StyleSheet,
	ImageResizeMode
} from 'react-native';
import PngIcons from '_images/png';

import { Images } from '_styles/index';

type Props = {
	source: ImageSourcePropType | keyof typeof PngIcons;
	style?: StyleProp<ViewStyle>;
	height?: string | number;
	width?: string | number;
	imageStyle?: StyleProp<ImageStyle>;
	resizeMode?: ImageResizeMode;
};

export default class MyImage extends PureComponent<Props> {
	render() {
		const {
			source,
			style,
			width,
			height,
			imageStyle,
			resizeMode
		} = this.props;
		const imgSource = typeof source == 'string' ? PngIcons[source] : source;
		const styleObj = StyleSheet.flatten(style) || {};
		const imgWidth = width || styleObj.width;
		const imgHeight = height || styleObj.height;
		return (
			<View style={[style, { width: imgWidth, height: imgHeight }]}>
				<Image
					fadeDuration={0}
					source={imgSource}
					style={[Images.Style.img, imageStyle]}
					resizeMode={resizeMode}
				/>
			</View>
		);
	}
}
