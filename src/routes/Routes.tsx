import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export function Routes() {
  const user = false;

  return <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>;
}
