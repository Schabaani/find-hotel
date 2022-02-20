import React, { PureComponent } from 'react';
import {
	View,
	StyleSheet,
	StyleProp,
	ViewStyle,
	StatusBar
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { isIPhoneX } from '_utils/responsive';

type Props = {
	style?: StyleProp<ViewStyle>;
	headerColor?: string;
	footerColor?: string;
	barStyle?: 'dark-content' | 'default' | 'light-content';
	animatedBarStyle?: boolean;
};

export default class MySafeView extends PureComponent<Props> {
	obj = {};

	componentDidMount() {
		const { headerColor, barStyle, animatedBarStyle } = this.props;
		this.obj = StatusBar.pushStackEntry({
			barStyle: barStyle || 'dark-content',
			backgroundColor: headerColor || '#fff',
			animated: animatedBarStyle === false
		});
	}

	componentWillUnmount() {
		StatusBar.popStackEntry(this.obj);
	}

	render() {
		const { style, children, headerColor, footerColor } = this.props;
		return (
			<SafeAreaInsetsContext.Consumer>
				{(insets) => (
					<View
						style={[
							styles.container,
							style,
							{
								paddingTop: insets?.top
							},
							isIPhoneX ? { marginBottom: 20 } : null
						]}
					>
						{insets?.top != 0 && insets?.top != undefined && (
							<View
								style={[
									styles.header,
									{
										backgroundColor: headerColor || '#fff',
										height: insets?.top
									}
								]}
							/>
						)}
						{isIPhoneX && (
							<View
								style={[
									styles.iphoneXfooter,
									{
										backgroundColor: footerColor || '#fff'
									}
								]}
							/>
						)}
						{children}
					</View>
				)}
			</SafeAreaInsetsContext.Consumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	header: {
		width: '100%',
		right: 0,
		position: 'absolute'
	},
	iphoneXfooter: {
		zIndex: 100,
		width: '100%',
		height: 20,
		position: 'absolute',
		bottom: -20
	}
});
