import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { useAppSafeArea } from '~/hooks';

interface Props {
  children: React.ReactNode;
  scrollable?: boolean;
  isStatusBarHidden?: boolean;
}

export function Box({ children, scrollable = false, isStatusBarHidden = false }: Props) {
  const { top, bottom } = useAppSafeArea();

  const Container = scrollable ? ScrollView : View;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="dark" hidden={isStatusBarHidden} />
      <Container
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingTop: top,
          paddingBottom: bottom,
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {children}
      </Container>
    </KeyboardAvoidingView>
  );
}
