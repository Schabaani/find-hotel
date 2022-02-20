import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTheme from '_utils/useTheme';
import MyText from './MyText';
import MySvgImage from './MySvgImage';

type THeader = {
	title: string;
	hideBtn?: boolean;
	btnType?: 'text' | 'icon';
};

const MyHeader = ({ title, hideBtn = false, btnType = 'text' }: THeader) => {
	const theme = useTheme();
	const navigation = useNavigation();

	return (
		<View style={Styles.container}>
			<TouchableOpacity onPress={() => {}}>
				<View style={Styles.btnInner} />
			</TouchableOpacity>
			{!hideBtn && (
				<TouchableOpacity
					onPress={navigation.goBack}
					hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
					style={[Styles.btn, theme.styles.btn]}
				>
					<View style={Styles.btnInner}>
						<MySvgImage
							source={
								btnType == 'text'
									? 'ArrowLeftIcon'
									: 'CloseIcon'
							}
							fill={theme.colors.text}
							width={15}
							height={15}
						/>
						{btnType == 'text' && (
							<MyText
								style={Styles.text}
								color={theme.colors.text}
							>
								بازگشت
							</MyText>
						)}
					</View>
				</TouchableOpacity>
			)}
			<MyText
				textAlign="right"
				color={theme.colors.text}
				fontSize={18}
				weight="900"
				style={Styles.title}
			>
				{title}
			</MyText>
		</View>
	);
};

export default MyHeader;

const Styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	btn: {
		height: 40,
		minWidth: 40,
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 10,
		overflow: 'hidden'
	},
	btnInner: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},
	text: { marginLeft: 10 },
	title: {
		flex: 1,
		height: 45,
		paddingTop: 5
	}
});
