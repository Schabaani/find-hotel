import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigations/router';
import {RouteProp} from '@react-navigation/native';
import {Colors} from '../../styles/index';

type TProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SecondaryScreen'>;
  route: RouteProp<RootStackParamList, 'SecondaryScreen'>;
};

const SecondaryScreen = (props: TProps) => {
  return <SafeAreaView style={Style.container}></SafeAreaView>;
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY,
  },
});

export default SecondaryScreen;
