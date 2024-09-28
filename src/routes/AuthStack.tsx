import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { LoginScreen } from '../screens/Auth/LoginScreen';
import { Step1 } from '../screens/Auth/Register/Step1';

export type AuthStackParamList = {
  LoginScreen: undefined;
  Step1: undefined;
};

export function AuthStack() {
  const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>();

  return (
    <Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Screen name="LoginScreen" component={LoginScreen} />
      <Screen name="Step1" component={Step1} />
    </Navigator>
  );
}
