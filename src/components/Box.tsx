import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { useAppSafeArea } from '~/hooks';

interface Props {
  children: React.ReactNode;
  scrollable?: boolean;
  isStatusBarHidden?: boolean;
  notpt?: boolean;
}

export function Box({
  children,
  scrollable = false,
  isStatusBarHidden = false,
  notpt = false,
}: Props) {
  const { top, bottom } = useAppSafeArea();

  const Container = scrollable ? ScrollView : View;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-25}>
      <StatusBar style="dark" hidden={isStatusBarHidden} />
      <Container
        style={{
          flex: 1,
          // backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingTop: notpt ? 0 : top,
          paddingBottom: bottom,
        }}
        className="bg-white dark:bg-gray-900"
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {children}
      </Container>
    </KeyboardAvoidingView>
  );
}
