import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../../navigations/router';
import Styles from '../../styles/components';

interface IProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export default function Home({navigation}: IProps) {
  return (
    <SafeAreaView style={Styles.Home.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('RoomSelector');
        }}
        style={Styles.Home.button}>
        <Text style={Styles.Home.buttonText}>Select guests & rooms</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
