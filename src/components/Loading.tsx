import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface LoadingProps {
  isButton?: boolean;
  color?: string;
}

export function Loading({ isButton, color }: LoadingProps) {
  const dots = [useSharedValue(0), useSharedValue(0), useSharedValue(0)];

  useEffect(() => {
    const animateDots = () => {
      dots.forEach((dot, index) => {
        setTimeout(() => {
          dot.value = withTiming(1, { duration: 500, easing: Easing.ease }, () => {
            dot.value = withTiming(0, { duration: 500, easing: Easing.ease });
          });
        }, index * 250);
      });
    };

    const interval = setInterval(animateDots, 1500);

    return () => clearInterval(interval);
  }, [dots]);

  function AnimatedStyle(dot: SharedValue<number>) {
    return useAnimatedStyle(() => {
      return {
        transform: [{ translateY: dot.value * -10 }],
        opacity: dot.value === 0 ? 0.5 : 1,
      };
    });
  }

  return isButton ? (
    <View className="flex-1 flex-row items-center justify-center space-x-2">
      {dots.map((dot, index) => (
        <Animated.View key={index} style={AnimatedStyle(dot)}>
          <Text className={`text-3xl ${color}`}>•</Text>
        </Animated.View>
      ))}
    </View>
  ) : (
    <View className="flex-1 flex-row items-center justify-center space-x-2">
      {dots.map((dot, index) => (
        <Animated.View key={index} style={AnimatedStyle(dot)}>
          <Text className="text-7xl text-green-600">•</Text>
        </Animated.View>
      ))}
    </View>
  );
}
