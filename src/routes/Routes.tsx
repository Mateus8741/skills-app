import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

import { setAuthToken } from '~/api';
import { useUserStorage } from '~/contexts';

export function Routes() {
  const { user } = useUserStorage();

  if (user && user.token) {
    setAuthToken(user.token);
  }

  return <NavigationContainer>{user?.user.id ? <AppStack /> : <AuthStack />}</NavigationContainer>;
}
