import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { AppTabBar } from './AppTabBar';

import { HomeScreen, NewServiceScreen } from '~/screens';

export type AppTabBottomTabParamList = {
  HomeScreen: undefined;
  NewServiceScreen: undefined;
};

function renderTabBar(props: BottomTabBarProps) {
  return <AppTabBar {...props} />;
}

export function AppTabNavigator() {
  const { Navigator, Screen } = createBottomTabNavigator<AppTabBottomTabParamList>();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={renderTabBar}>
      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="NewServiceScreen" component={NewServiceScreen} />
    </Navigator>
  );
}
