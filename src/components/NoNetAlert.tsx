import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import MyText from '_components/MyText';
import { MySafeView } from '_components/index';
import ConnectionErrorImg from '_images/alerts/no-connection.png';
import ServerErrorImg from '_images/alerts/server-error.png';
import MyImage from '_components/MyImage';

type Props = {
	isVisible: boolean;
	alertType?: 'net' | 'server';
	onDismis?: () => void;
	onBackButtonPress: () => void;
	onModalHide: () => void;
	onPressTryAgain: () => void;
};

type State = {
	isVisible: boolean;
};

export default class NoNetAlert extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			isVisible: true
		};
	}

	static getDerivedStateFromProps(props: Props) {
		return {
			isVisible: props.isVisible
		};
	}

	render() {
		const {
			alertType,
			onDismis,
			onBackButtonPress,
			onModalHide,
			onPressTryAgain
		} = this.props;
		const alertImage =
			alertType == 'server' ? ServerErrorImg : ConnectionErrorImg;
		let title = 'عدم اتصال به اینترنت';
		let message = 'لطفا اتصال وای فای یا دیتا موبایل خود را چک کنید';
		switch (alertType) {
			case 'server':
				title = 'خطا در دریافت اطلاعات';
				message = 'در حال حاضر سرویس مورد نظر در دسترس نمی باشد';
				break;

			default:
				break;
		}
		const onBackPress =
			onDismis == undefined ? onBackButtonPress : onDismis;
		return (
			<Modal
				useNativeDriver
				isVisible={this.state.isVisible}
				onBackButtonPress={onBackPress}
				onBackdropPress={onBackPress}
				onModalHide={onModalHide}
				animationIn="slideInDown"
				animationOut="slideOutUp"
				style={{
					justifyContent: 'flex-start',
					alignItems: 'center',
					padding: 0,
					margin: 0
				}}
			>
				<MySafeView
					style={{
						height: '100%',
						width: '100%',
						backgroundColor: '#fff',
						borderRadius: 0,
						justifyContent: 'flex-start',
						alignItems: 'center'
					}}
				>
					<MyImage
						source={alertImage}
						width="95%"
						height="50%"
						style={{ marginTop: 20 }}
					/>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<MyText
							weight="bold"
							style={{
								fontSize: 20,
								color: '#6f7d93'
							}}
						>
							{title}
						</MyText>
						<View
							style={{
								width: '80%',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<MyText
								weight="bold"
								style={{
									fontSize: 15,
									marginTop: '3%',
									textAlign: 'center',
									color: '#aaa'
								}}
							>
								{message}
							</MyText>
						</View>
					</View>
					<TouchableOpacity
						onPress={onPressTryAgain}
						style={styles.tryBtn}
					>
						<MyText style={{ color: '#fff', fontSize: 17 }}>
							تلاش مجدد
						</MyText>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={onBackPress}
						style={styles.backBtn}
					>
						<MyText
							style={{
								color: '#6f7d93',
								fontSize: 17
							}}
						>
							انصراف
						</MyText>
					</TouchableOpacity>
				</MySafeView>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	tryBtn: {
		width: 180,
		height: 50,
		borderRadius: 30,
		backgroundColor: 'rgb(249, 53, 43)',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
	},
	backBtn: {
		width: 180,
		height: 50,
		borderRadius: 30,
		marginTop: 20,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#6f7d93'
	}
});
