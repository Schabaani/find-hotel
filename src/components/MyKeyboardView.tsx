import React, { PureComponent } from 'react';
import {
	StyleProp,
	ViewStyle,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet
} from 'react-native';

type Props = {
	behavior?: 'padding' | 'position' | 'height';
	style?: StyleProp<ViewStyle>;
	scrollViewContainerStyle?: StyleProp<ViewStyle>;
	withScrollView?: boolean;
	nestedScrollEnabled?: boolean;
	bounces?: boolean;
};
export default class MyKeyboardView extends PureComponent<Props> {
	render() {
		const {
			style,
			children,
			behavior,
			bounces,
			withScrollView,
			scrollViewContainerStyle,
			nestedScrollEnabled,
			...rest
		} = this.props;
		return (
			<KeyboardAvoidingView
				enabled
				behavior={Platform.OS == 'ios' ? 'padding' : behavior}
				keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 30}
				style={style}
				{...rest}
			>
				{withScrollView === true ? (
					<ScrollView
						bounces={bounces == true}
						style={styles.scrollview}
						contentContainerStyle={scrollViewContainerStyle}
						nestedScrollEnabled={nestedScrollEnabled}
					>
						{children}
					</ScrollView>
				) : (
					children
				)}
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	scrollview: {
		width: '100%'
	}
});
