import React, { PureComponent, useState, useEffect, memo } from 'react';
import { Image, View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SvgCss } from 'react-native-svg';
import { Images } from '_styles/index';
import PngIcons from '_images/png';

type AdditionalProps = {
	onError?: (error: Error) => void;
	override?: Object;
};

type UriProps = {
	uri: string;
	fill?: string;
	fillSecond?: string;
} & AdditionalProps;

type Props = {
	uri: string;
	style?: StyleProp<ViewStyle>;
	fill?: string;
	resizeMode?: 'center' | 'cover' | 'contain' | 'stretch' | 'repeat';
	fillSecond?: string;
	height: string | number;
	width: string | number;
};

const noImageSvg =
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.8 114.2"><g fill="#2e4057"><path d="M4.9 3.9v106.5h135.4V3.9H4.9zm124.5 94.9H16.5V15.4h112.9v83.4z"/><path d="M97.9 49.8l-4.9 3-10.9-13-27.7 29.4-8.7-3.8L22.3 90h102.1z"/><circle transform="rotate(-13.286 49.301 36.535)" cx="49.3" cy="36.5" r="10.2"/></g></svg>';

const fetchText = async (uri: string) => {
	const response = await fetch(uri);
	if (response.status == 200) {
		const svgContent = await response.text();
		return { svgContent, isFetched: true };
	} else {
		return { svgContent: noImageSvg, isFetched: false };
	}
};

const SvgCssUri = (props: UriProps) => {
	const { uri, fill = '#2e4057', fillSecond = '#ffa300' } = props;
	const [xml, setXml] = useState<string | null>(null);
	const fillXml =
		xml == null
			? null
			: xml
					.replace(/'#2e4057'/gi, fill)
					.replace(/'#ffa300'/gi, fillSecond);

	useEffect(() => {
		if (uri) {
			AsyncStorage.getItem(`svg-${uri}`).then((localData) => {
				if (localData) {
					setXml(localData);
				} else {
					fetchText(uri).then(({ svgContent, isFetched }) => {
						setXml(svgContent);
						if (isFetched) {
							AsyncStorage.setItem(`svg-${uri}`, svgContent);
						}
					});
				}
			});
		}
	}, [uri]);

	return <SvgCss xml={fillXml} override={props} />;
};

const MyUriImage = (props: Props) => {
	const {
		uri = '',
		style,
		width,
		height,
		fill,
		fillSecond,
		resizeMode
	} = props;
	const isSvg = uri.endsWith('.svg');
	const imageStyle = StyleSheet.flatten(style) || {};
	const imgWidth = width || imageStyle.width;
	const imgHeight = height || imageStyle.height;
	return (
		<View style={[style, { width: imgWidth, height: imgHeight }]}>
			{isSvg ? (
				<SvgCssUri
					width="100%"
					height="100%"
					fill={fill}
					fillSecond={fillSecond}
					uri={uri}
				/>
			) : (
				<Image
					fadeDuration={0}
					defaultSource={PngIcons.ImagePlaceholder}
					source={{ uri, cache: 'force-cache' }}
					style={
						resizeMode
							? [Images.Style.img, { resizeMode }]
							: Images.Style.img
					}
				/>
			)}
		</View>
	);
};

export default memo(MyUriImage);
