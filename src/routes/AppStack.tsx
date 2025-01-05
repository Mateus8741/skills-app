import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AppTabBottomTabParamList, AppTabNavigator } from './BottomTabsNavigation/AppTabNavigator';

import { ServiceCardProps } from '~/models';
import {
  AddressScreen,
  AllCategoriesScreen,
  CategoryServicesScreen,
  NewServiceScreen,
  PersonalInfoScreen,
  ServiceDetailsScreen,
  SettingsScreen,
  UserServicesScreen,
} from '~/screens';

export type AppStackParamList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>;
  ServiceDetailsScreen: ServiceCardProps;
  NewServiceScreen: undefined;
  CategoryServicesScreen: {
    category: string;
    name: string;
  };
  AllCategoriesScreen: undefined;
  UserServicesScreen: undefined;
  PersonalInfoScreen: undefined;
  AddressScreen: undefined;
  SettingsScreen: undefined;
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
      <Screen name="CategoryServicesScreen" component={CategoryServicesScreen} />
      <Screen name="AllCategoriesScreen" component={AllCategoriesScreen} />
      <Screen name="UserServicesScreen" component={UserServicesScreen} />
      <Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
      <Screen name="AddressScreen" component={AddressScreen} />
      <Screen name="SettingsScreen" component={SettingsScreen} />
    </Navigator>
  );
}
