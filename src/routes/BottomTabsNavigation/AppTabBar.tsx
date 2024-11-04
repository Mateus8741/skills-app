import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';

import { AppTabBottomTabParamList } from './AppTabNavigator';
import { mapScreenToProps } from './mapScreenToProps';

import { CustomIcons } from '~/components';
import { useAppSafeArea } from '~/hooks';
import { useShadowProps } from '~/utils';

export function AppTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { bottom } = useAppSafeArea();

  return (
    <View
      className="flex-row border-t-[0.2px] border-gray-300 bg-white p-2 px-5"
      style={[useShadowProps(), { paddingBottom: bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
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
            className={`flex-1 items-center justify-center py-1 ${
              isFocused ? 'rounded-xl bg-green-100' : ''
            }`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Animated.View entering={isFocused ? BounceIn : FadeIn}>
              <CustomIcons
                color={isFocused ? '#16a34a' : '#6b7280'}
                icon={isFocused ? tabItem.icon.focused : tabItem.icon.unfocused}
                size={24}
              />
            </Animated.View>

            {isFocused && (
              <Animated.Text className="mt-1 font-bold text-xs text-green-600" entering={BounceIn}>
                {tabItem.label}
              </Animated.Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
