import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Colors} from '../../styles/index';

import {RootStackParamList} from '../../navigations/router';

interface IProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PrimaryScreen'>;
}

export default function PrimaryScreen({navigation}: IProps) {
  return <SafeAreaView style={Style.container}></SafeAreaView>;
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
