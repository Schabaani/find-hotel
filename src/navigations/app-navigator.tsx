import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';
import useTheme from '../utils/useTheme';

import Home from '../scenes/home';
import RoomSelector from '../scenes/room-selector';

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
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="RoomSelector"
        options={{presentation: 'modal'}}
        component={RoomSelector}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
