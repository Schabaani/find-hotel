import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';
import useTheme from '../utils/useTheme';

import Primary from '../scenes/primary';
import Secondary from '../scenes/secondary';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const theme = useTheme();

  useEffect(() => {
    AsyncStorage.getItem('theme').then(str => {
      theme.setTheme(str == 'dark' ? 'dark' : 'light');
    });
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Primary" component={Primary} />
      <Stack.Screen name="Secondary" component={Secondary} />
    </Stack.Navigator>
  );
};

export default AppStack;
