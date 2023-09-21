import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/HomeScreen';
import {RootScreens, RootStackParamList} from './types';
import UserDetails from '../screens/UserDetails/UserDetails';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => (
  <Stack.Navigator initialRouteName={RootScreens.HomeScreen}>
    <Stack.Screen
      name={RootScreens.HomeScreen}
      component={HomeScreen}
      options={{
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        title: 'Home',
      }}
    />
    <Stack.Screen
      name={RootScreens.UserDetails}
      component={UserDetails}
      options={{
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        title: 'Details',
      }}
    />
  </Stack.Navigator>
);

export default RootStack;
