import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { BounceIn } from 'react-native-reanimated';

import { AppTabBottomTabParamList } from './AppTabNavigator';
import { mapScreenToProps } from './mapScreenToProps';

import { CustonIcons } from '~/components';
import { useAppSafeArea } from '~/hooks';
import { useShadowProps } from '~/utils';

export function AppTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { bottom } = useAppSafeArea();

  return (
    <View
      className="absolute bottom-8 mx-5 flex-row rounded-3xl bg-green-600 p-3"
      style={[useShadowProps()]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const animation = isFocused && BounceIn;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              params: route.params,
              merge: true,
            });
          }
        };

        const tabItem = mapScreenToProps[route.name as keyof AppTabBottomTabParamList];

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            className={
              isFocused
                ? 'flex-row items-center justify-center rounded-xl bg-green-900 py-3'
                : 'items-center justify-center py-3'
            }
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <CustonIcons
              color="white"
              icon={isFocused ? tabItem.icon.focused : tabItem.icon.unfocused}
              entering={animation || undefined}
              size={20}
            />

            {isFocused && (
              <Animated.Text
                className="ml-3 font-bold text-sm"
                style={{ color: 'white' }}
                entering={animation || undefined}>
                {tabItem.label}
              </Animated.Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
