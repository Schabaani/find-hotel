import React, { PureComponent } from 'react';
import {
	TouchableOpacity,
	Dimensions,
	Animated,
	StyleSheet,
	View
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { Colors } from '_styles/index';
import Row from './Row';
import MyText from './MyText';
import MySvgImage from './MySvgImage';

const { width, height } = Dimensions.get('window');
const BoxH = height * 0.1;

type Props = {};

type State = {
	top: Animated.Value;
	message?: string;
	title?: string;
	show: boolean;
	type?: 'DANGER' | 'WARNING' | 'SUCCESS' | 'INFO';
};

export default class AlertBox extends PureComponent<Props, State> {
	private animationFunc: Animated.CompositeAnimation;

	constructor(props: Props) {
		super(props);
		this.state = {
			top: new Animated.Value(-3 * BoxH),
			message: undefined,
			title: undefined,
			show: false,
			type: 'INFO'
		};
		this.animationFunc = Animated.timing(this.state.top, {
			useNativeDriver: false,
			toValue: -3 * BoxH
		});
	}

	show = (
		msg:
			| string
			| {
					message: string;
					type?: 'DANGER' | 'WARNING' | 'SUCCESS' | 'INFO';
					title?: string;
			  }
	) => {
		const { message, title = '', type = 'DANGER' } =
			typeof msg == 'string' ? { message: msg } : msg;
		this.setState(
			{
				type,
				message,
				title,
				show: true
			},
			() => this.animationIn(this.animationOut)
		);
	};

	private animationIn = (callback?: () => void) => {
		this.animationFunc.stop();
		this.animationFunc = Animated.sequence([
			Animated.timing(this.state.top, {
				toValue: -3 * BoxH,
				duration: 200,
				useNativeDriver: true
			}),
			Animated.spring(this.state.top, {
				toValue: -100,
				friction: 4,
				tension: 30,
				useNativeDriver: true
			}),
			Animated.delay(3000)
		]);
		this.animationFunc.start((res) => {
			if (res.finished) {
				callback?.();
			}
		});
	};

	private animationOut = (callback?: () => void) => {
		this.animationFunc.stop();
		this.animationFunc = Animated.timing(this.state.top, {
			toValue: -3 * BoxH,
			duration: 300,
			useNativeDriver: true
		});
		this.animationFunc.start(() => {
			callback?.();
			this.setState({ show: false, message: undefined });
		});
	};

	render() {
		const { title, message, type, show } = this.state;
		let bgColor = Colors.ALERT;
		let iconName: 'CloseIcon' | 'ExclamationIcon' | 'CheckMark' =
			'ExclamationIcon';
		switch (type) {
			case 'SUCCESS':
				bgColor = Colors.SUCCESS;
				iconName = 'CheckMark';
				break;

			case 'WARNING':
				bgColor = Colors.WARNING;
				iconName = 'ExclamationIcon';
				break;

			case 'INFO':
				bgColor = Colors.INFO;
				iconName = 'ExclamationIcon';
				break;

			default:
				bgColor = Colors.ALERT;
				iconName = 'CloseIcon';
				break;
		}

		return (
			show && (
				<Animated.View
					style={[
						styles.wrapper,
						{
							transform: [
								{
									translateY: this.state.top
								}
							]
						}
					]}
				>
					<SafeAreaInsetsContext.Consumer>
						{(insets) => (
							<View
								style={{
									backgroundColor: bgColor,
									paddingTop: insets?.top
								}}
							>
								<TouchableOpacity
									activeOpacity={1}
									onPressIn={() => this.animationOut()}
									style={styles.button}
								>
									<Row style={styles.container}>
										<Row style={styles.iconShadow}>
											<Row style={styles.iconWrapper}>
												<MySvgImage
													source={iconName}
													width={20}
													height={20}
													fill={bgColor}
												/>
											</Row>
										</Row>
										<Row style={styles.messageContainer}>
											{title != '' && title != null ? (
												<MyText
													weight="bold"
													style={styles.title}
												>
													{title}
												</MyText>
											) : null}
											{message != '' &&
											message != null ? (
												<MyText
													weight="500"
													style={styles.message}
												>
													{message}
												</MyText>
											) : null}
										</Row>
									</Row>
								</TouchableOpacity>
							</View>
						)}
					</SafeAreaInsetsContext.Consumer>
				</Animated.View>
			)
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		top: 0,
		width
	},
	button: {
		justifyContent: 'flex-end',
		alignItems: 'center'
		// backgroundColor: Colors.ALERT
	},
	container: {
		marginTop: 100,
		height: BoxH,
		width: '100%',
		alignItems: 'center',
		paddingHorizontal: 20
	},
	title: {
		fontSize: 15,
		color: '#fff'
	},
	message: {
		fontSize: 14,
		color: '#fff'
	},
	messageContainer: {
		flex: 1,
		alignItems: 'flex-start',
		paddingLeft: 10
	},
	iconShadow: {
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50
	},
	iconWrapper: {
		padding: 5,
		backgroundColor: '#fff',
		width: 38,
		height: 38,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 38
	}
});
