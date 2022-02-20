import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MyImage from './MyImage';

const { width } = Dimensions.get('window');

export default class MyHeaderBg extends PureComponent {
	render() {
		const { children } = this.props;
		return (
			<View style={styles.container}>
				<MyImage
					style={styles.bgImage}
					source="HeaderBgIcon"
					width={width}
					height={width * 0.33}
				/>
				<View style={styles.content}>{children}</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
		paddingBottom: 15
	},
	bgImage: {
		position: 'absolute',
		bottom: 0
	},
	content: {
		width: '100%',
		minHeight: 70
	}
});
