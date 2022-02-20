import React, {useCallback, useState} from 'react';
import {BackHandler} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';

import Primary from '../scenes/primary';
import Secondary from '../scenes/secondary';
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
        <Tab.Screen name="Primary" component={Primary} />
        <Tab.Screen name="Secondary" component={Secondary} />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabs;
