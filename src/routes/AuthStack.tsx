import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { LoginScreen } from '../screens/Auth/LoginScreen';

import { Step1, Step2 } from '~/screens';

export type AuthStackParamList = {
  LoginScreen: undefined;
  Step1: undefined;
  Step2: { email: string };
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
      <Screen name="Step2" component={Step2} />
    </Navigator>
  );
}
