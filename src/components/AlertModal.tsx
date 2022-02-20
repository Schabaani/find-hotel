import React, { useEffect } from 'react';
import {
	View,
	StatusBar,
	StyleSheet,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import MyText from '_components/MyText';
import MySvgImage, { TSvgImgName } from '_components/MySvgImage';
import Row from '_components/Row';
import { Colors } from '_styles/index';
import SvgIcons from '_images/svg';
import useTheme from '_utils/useTheme';
import useKeepScreenOn from '_utils/useKeepScreenOn';

type TType = 'DANGER' | 'WARNING' | 'SUCCESS' | 'INFO';
interface IProps {
	title: string;
	message: string;
	subMessage?: string;
	type?: TType;
	buttons: {
		type?: TType;
		title: string;
		onPress: () => void;
	}[];
	onModalHide: () => void;
	customIcon?: keyof typeof SvgIcons;
	isVisible: boolean;
}

const { width } = Dimensions.get('window');

const getStyle = (
	type?: TType
): {
	bgColor: string;
	bgShadowColor: string;
	iconName: TSvgImgName;
} => {
	switch (type) {
		case 'SUCCESS':
			return {
				bgShadowColor: 'rgba(57, 199, 165, 0.37)',
				bgColor: Colors.SUCCESS,
				iconName: 'CheckMark'
			};

		case 'WARNING':
			return {
				bgShadowColor: 'rgba(255, 172, 44, 0.47)',
				bgColor: Colors.WARNING,
				iconName: 'ExclamationIcon'
			};

		case 'INFO':
			return {
				bgShadowColor: 'rgba(0, 117, 255, 0.37)',
				bgColor: Colors.INFO,
				iconName: 'ExclamationIcon'
			};

		default:
			return {
				bgShadowColor: 'rgba(255, 53, 102, 0.37)',
				bgColor: Colors.ALERT,
				iconName: 'CloseIcon'
			};
	}
};

export default function AlertModal(props: IProps) {
	const {
		title,
		message,
		buttons,
		isVisible,
		subMessage,
		onModalHide,
		type = 'DANGER',
		customIcon
	} = props;
	const theme = useTheme();
	const { pauseTimer } = useKeepScreenOn();

	useEffect(() => {
		if (isVisible) {
			const resumeTimer = pauseTimer();
			return resumeTimer;
		}
	}, [isVisible]);

	const { bgShadowColor, bgColor, iconName } = getStyle(type);

	return (
		<Modal
			useNativeDriver
			useNativeDriverForBackdrop
			animationIn="pulse"
			animationOut="zoomOut"
			isVisible={isVisible}
			onBackButtonPress={onModalHide}
			onBackdropPress={onModalHide}
			onModalHide={onModalHide}
			style={styles.modal}
		>
			<StatusBar backgroundColor="#494a4b" barStyle="light-content" />
			<View
				style={[
					styles.container,
					{
						backgroundColor: theme.colors.background
					}
				]}
			>
				{customIcon ? (
					<Row
						style={
							type
								? [
										styles.iconShadow,
										{ backgroundColor: bgShadowColor }
								  ]
								: null
						}
					>
						<Row
							style={
								type
									? [
											styles.iconWrapper,
											{ backgroundColor: bgColor }
									  ]
									: [styles.customIconContainer]
							}
						>
							<MySvgImage
								source={customIcon}
								width={type ? '80%' : 100}
								height={type ? '80%' : 80}
								fill="#fff"
							/>
						</Row>
					</Row>
				) : (
					<Row
						style={[
							styles.iconShadow,
							{ backgroundColor: bgShadowColor }
						]}
					>
						<Row
							style={[
								styles.iconWrapper,
								{ backgroundColor: bgColor }
							]}
						>
							<MySvgImage
								source={iconName}
								width={20}
								height={20}
								fill="#fff"
								fillSecond="#fff"
							/>
						</Row>
					</Row>
				)}
				<MyText
					weight="bold"
					fontSize={16}
					color={bgColor}
					style={{ marginBottom: 10 }}
				>
					{title}
				</MyText>
				<MyText
					weight="500"
					fontSize={15}
					color={theme.colors.text}
					style={{
						marginBottom: subMessage ? 5 : 20,
						textAlign: 'center',
						paddingHorizontal: 20,
						lineHeight: 30
					}}
				>
					{message}
				</MyText>
				{subMessage ? (
					<MyText
						weight="400"
						fontSize={10}
						color={theme.colors.text}
						style={{ marginBottom: 20 }}
					>
						{subMessage}
					</MyText>
				) : null}
				<Row>
					{buttons.map((button) => (
						<TouchableOpacity
							onPress={button.onPress}
							style={[
								styles.button,
								theme.styles.btn,
								button.type
									? {
											backgroundColor: getStyle(
												button.type
											).bgColor,
											borderColor: getStyle(button.type)
												.bgColor
									  }
									: null
							]}
							key={button.title}
						>
							<MyText
								color={button.type ? '#fff' : theme.colors.text}
							>
								{button.title}
							</MyText>
						</TouchableOpacity>
					))}
				</Row>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	container: {
		width: width - 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},
	iconShadow: {
		marginBottom: 10,
		width: 70,
		height: 70,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 70
	},
	iconWrapper: {
		padding: 5,
		width: 52,
		height: 52,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 52
	},
	button: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 10,
		marginHorizontal: 5,
		alignItems: 'center'
	},
	customIconContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});
