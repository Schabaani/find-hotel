import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	FlatList,
	Platform,
	Dimensions,
	Animated
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomNavParamList } from '_navigations/router';
import { MyText, MyUriImage, MySvgImage } from '_components/index';
import SvgImages from '_images/svg';
import { MenuItem } from '_redux/reducers/remote-config';
import { Colors } from '_styles/index';

type FooterMenuItem = MenuItem & { path: keyof BottomNavParamList };

type Props = {
	navigation: BottomTabNavigationProp<
		BottomNavParamList,
		keyof BottomNavParamList
	>;
	// menuItems: FooterMenuItem[];
	activeRoute: keyof BottomNavParamList;
	showAlertBox?: (msg: string) => void;
};

type State = {
	isSubMenuOpen: boolean;
	boxY: Animated.Value;
	rotation: Animated.Value;
	isPopUpMount: boolean;
	popUpInfo: {
		id: string;
		image: {
			path: string;
			width: number;
			height: number;
		};
		disableFor: number;
		repeatAfter: number;
		btnColor: string;
		backgroundColor: string;
		actionType: 'route' | 'link' | 'getLink' | 'extLink' | 'getExtLink';
		actionPath: string;
		title: string;
	};
};

const { width } = Dimensions.get('window');

const menuItems = [
	{
		position: 'footer',
		type: 'route',
		title: 'داشبورد',
		path: 'Dashboard',
		iconLink:
			'https://api.shopp.ir/common/images/main/footer-icons/dashboard.svg',
		activeIconLink:
			'https://api.shopp.ir/common/images/main/footer-icons/dashboard-active.svg',
		icon: 'DashboardIcon',
		activeIcon: 'DashboardActiveIcon',
		isNew: false
	},
	{
		position: 'footer',
		type: 'route',
		title: 'گزارشات',
		path: 'Reports',
		iconLink:
			'https://api.shopp.ir/common/images/main/footer-icons/report.svg',
		activeIconLink:
			'https://api.shopp.ir/common/images/main/footer-icons/report-active.svg',
		icon: 'ReportIcon',
		activeIcon: 'ReportActiveIcon',
		isNew: false
	},
	{
		position: 'footer',
		type: 'route',
		title: 'بارکد',
		path: 'BarCodeScanner',
		iconLink: 'https://api.shopp.ir/common/images/main/footer-icons/qr.svg',
		activeIconLink:
			'https://api.shopp.ir/common/images/main/footer-icons/qr-active.svg',
		icon: 'QrIcon',
		activeIcon: 'QrActiveIcon',
		isNew: false
	},
	{
		position: 'footer',
		type: 'route',
		title: 'پروفایل',
		path: 'Profile',
		iconLink:
			'https://api.shopp.ir/common/images/main/footer-icons/profile.svg',
		activeIconLink:
			'https://api.shopp.ir/common/images/main/footer-icons/profile-active.svg',
		icon: 'ProfileIcon',
		activeIcon: 'ProfileActiveIcon',
		isNew: false
	}
];

class FooterMenu extends PureComponent<Props, State> {
	flatlist = React.createRef<FlatList<any>>();

	constructor(props: Props) {
		super(props);
		this.state = {
			isSubMenuOpen: false,
			boxY: new Animated.Value(300),
			rotation: new Animated.Value(135),
			isPopUpMount: false,
			popUpInfo: {
				id: '-',
				image: {
					path: '',
					width: 830,
					height: 300
				},
				disableFor: 48,
				repeatAfter: 24,
				btnColor: '#fff',
				backgroundColor: '#fff',
				actionType: 'link',
				actionPath: 'https://shopp.ir',
				title: ''
			}
		};
	}

	onPressItem = (item: FooterMenuItem) => {
		const { navigation } = this.props;
		this.closeSubMenu();
		if (item.type == 'route') {
			if (item.path == 'BarCodeScanner') {
				return navigation.navigate('BarCodeScanner', {
					types: ['qr', 'code128'],
					validator: undefined,
					onCodeRecognized: undefined
				});
			}
			return navigation.navigate(item.path);
		}
	};

	renderItem = ({ item }: { item: FooterMenuItem }) => {
		const { activeRoute } = this.props;
		if (item.title == '+') return; //this.renderPlusItem();
		const isActive = activeRoute == item.path;
		const hasValidIcon = Object.keys(SvgImages).includes(item.icon);
		const fontSize = item.title.length > 10 ? 10 : 12;
		return (
			<TouchableOpacity
				onPress={() => this.onPressItem(item)}
				disabled={isActive}
				activeOpacity={0.7}
			>
				<View style={styles.menuItem}>
					{hasValidIcon ? (
						<MySvgImage
							source={
								isActive &&
								item.activeIcon &&
								Object(SvgImages)[item.activeIcon]
									? Object(SvgImages)[item.activeIcon]
									: Object(SvgImages)[item.icon]
							}
							width={30}
							height={30}
							fill={isActive ? Colors.PRIMARY : '#6e8bad'}
						/>
					) : (
						<MyUriImage
							uri={
								isActive && item.activeIconLink != undefined
									? item.activeIconLink
									: item.iconLink
							}
							width={30}
							height={30}
							fill={isActive ? Colors.PRIMARY : '#6e8bad'}
						/>
					)}
					<MyText
						weight={isActive ? 'bold' : 'light'}
						style={[
							styles.menuItemText,
							isActive ? null : { color: '#6e8bad' },
							{ fontSize }
						]}
					>
						{item.title}
					</MyText>
				</View>
			</TouchableOpacity>
		);
	};

	openSubMenu = () => {
		Animated.spring(this.state.rotation, {
			toValue: 0,
			friction: 5,
			tension: 30,
			useNativeDriver: true
		}).start();

		Animated.spring(this.state.boxY, {
			toValue: 0,
			friction: 5,
			tension: 30,
			useNativeDriver: true
		}).start();

		this.setState({
			isSubMenuOpen: true
		});
	};

	closeSubMenu = () => {
		Animated.spring(this.state.rotation, {
			toValue: 135,
			friction: 5,
			tension: 30,
			useNativeDriver: true
		}).start();

		Animated.spring(this.state.boxY, {
			toValue: 300,
			friction: 5,
			tension: 30,
			useNativeDriver: true
		}).start();

		this.setState({
			isSubMenuOpen: false
		});
	};

	renderPlusItem = () => {
		const { isSubMenuOpen } = this.state;
		return (
			<TouchableOpacity
				onPress={isSubMenuOpen ? this.closeSubMenu : this.openSubMenu}
				activeOpacity={0.7}
				style={styles.menuBtnItemContainer}
			>
				<View
					style={[
						styles.menuBtnItem,
						isSubMenuOpen
							? {
									backgroundColor: '#a8b3c6',
									borderColor: '#95a0b2',
									borderWidth: 2
							  }
							: null
					]}
				>
					<Animated.View
						style={{
							transform: [
								{
									rotate: this.state.rotation.interpolate({
										inputRange: [0, 360],
										outputRange: ['0deg', '360deg']
									})
								}
							]
						}}
					>
						<MySvgImage
							source="CloseIcon"
							width={20}
							height={20}
							fill="#fff"
						/>
					</Animated.View>
				</View>
			</TouchableOpacity>
		);
	};

	render() {
		const { navigation } = this.props;
		const { isPopUpMount, popUpInfo } = this.state;
		const items = menuItems.filter((item) => item.position == 'footer');
		items.splice(2, 0, {
			position: 'footer',
			type: 'route',
			title: '+',
			path: 'Dashboard',
			iconLink: '',
			icon: '',
			isNew: true
		});
		return (
			<View>
				<Animated.View
					style={[
						styles.submenuContiner,
						{
							transform: [
								{
									translateY: this.state.boxY
								}
							]
						}
					]}
				>
					<LinearGradient
						colors={['#fff', '#ddd']}
						style={styles.linearGradient}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
					>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('MetroTicketList');
								this.closeSubMenu();
							}}
							style={styles.menuItem}
						>
							<MySvgImage
								style={styles.iconContainer}
								source="TrainIcon"
								width={50}
								height={50}
								fill="#ce5d06"
							/>
							<MyText weight="bold" style={styles.menuItemText}>
								بلیت من
							</MyText>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('CarServices');
								this.closeSubMenu();
							}}
							style={styles.menuItem}
						>
							<MySvgImage
								style={styles.iconContainer}
								source="Car"
								width={50}
								height={50}
								fill="#ce5d06"
							/>
							<MyText
								weight="bold"
								style={styles.menuItemText}
								fontSize={12}
							>
								طرح ترافیک
							</MyText>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('Wallet');
								this.closeSubMenu();
							}}
							style={styles.menuItem}
						>
							<MySvgImage
								style={styles.iconContainer}
								source="WalletIcon"
								width={50}
								height={50}
								fill="#ce5d06"
							/>
							<MyText weight="bold" style={styles.menuItemText}>
								کیف پول
							</MyText>
						</TouchableOpacity>
					</LinearGradient>
				</Animated.View>
				<View style={styles.container}>
					<FlatList
						horizontal
						data={items}
						ref={this.flatlist}
						extraData={items}
						scrollEnabled={items.length > 5}
						renderItem={this.renderItem}
						keyExtractor={(item) => item.title}
						contentContainerStyle={styles.flatList}
					/>
				</View>
			</View>
		);
	}
}

export default FooterMenu;

const styles = StyleSheet.create({
	container: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#eee',
		margin: -1,
		marginTop: 0
	},
	flatList: {
		flexGrow: 1,
		justifyContent: 'space-around',
		flexDirection: 'row-reverse'
	},
	menuItem: {
		width: width * 0.21,
		paddingVertical: 10,
		paddingHorizontal: 7,
		alignItems: 'center'
	},
	menuItemText: {
		marginTop: Platform.OS == 'ios' ? 5 : 2
	},
	submenuContiner: {
		width: width + 2,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#eee',
		margin: -1,
		bottom: 0,
		position: 'absolute',
		overflow: 'hidden'
	},
	menuBtnItemContainer: {
		width: width * 0.16,
		alignItems: 'center',
		justifyContent: 'center'
	},
	menuBtnItem: {
		width: width * 0.14,
		height: width * 0.14,
		maxWidth: 80,
		maxHeight: 80,
		borderWidth: 0,
		backgroundColor: '#0757ff',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconContainer: {
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 10
	},
	linearGradient: {
		flex: 1,
		paddingBottom: 80,
		paddingTop: 10,
		paddingHorizontal: 20,
		flexDirection: 'row-reverse',
		justifyContent: 'space-around'
	}
});
