import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export function Routes() {
  const user = true;

  return <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>;
}
