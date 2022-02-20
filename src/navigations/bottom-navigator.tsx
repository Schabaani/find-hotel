import React, {useCallback, useState} from 'react';
import {BackHandler} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';

import Home from '../scenes/home';
import RoomSelector from '../scenes/room-selector';
import {MyToast} from '../components';

const Tab = createBottomTabNavigator();
let timeoutHandler: NodeJS.Timeout;

const BottomTabs = () => {
  const [backCount, setBackCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setBackCount(val => val + 1);
        clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(() => {
          setBackCount(0);
        }, 2000);
        return backCount < 1;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [backCount]),
  );
  return (
    <>
      <MyToast
        isVisible={backCount > 0}
        message="To Exit, press back button again, please"
        duration={2000}
      />
      <Tab.Navigator tabBar={() => null} backBehavior="none">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="RoomSelector" component={RoomSelector} />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabs;
