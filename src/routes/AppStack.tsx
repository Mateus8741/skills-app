import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AppTabBottomTabParamList, AppTabNavigator } from './BottomTabsNavigation/AppTabNavigator';

import { ServiceCardProps } from '~/schemas';
import { NewServiceScreen, ServiceDetailsScreen } from '~/screens';

export type AppStackParamList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>;
  ServiceDetailsScreen: ServiceCardProps;
  NewServiceScreen: undefined;
};

export function AppStack() {
  const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

  return (
    <Navigator
      initialRouteName="AppTabNavigator"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Screen name="AppTabNavigator" component={AppTabNavigator} />
      <Screen name="ServiceDetailsScreen" component={ServiceDetailsScreen} />
      <Screen name="NewServiceScreen" component={NewServiceScreen} />
    </Navigator>
  );
}
