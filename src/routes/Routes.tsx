import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AuthStack } from './AuthStack';

export function Routes() {
  const user = false;

  return <NavigationContainer>{user ? null : <AuthStack />}</NavigationContainer>;
}
