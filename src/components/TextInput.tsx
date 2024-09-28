import React, { ReactElement, useRef } from 'react';
import {
  Platform,
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  View,
} from 'react-native';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  rightComponent?: ReactElement;
  leftComponent?: ReactElement;
  errorMessage?: string;
  moreClassName?: string;
}

export function TextInput({
  label,
  rightComponent,
  leftComponent,
  errorMessage,
  moreClassName,
  ...rnTextInputProps
}: TextInputProps) {
  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  const $HEIGHT = Platform.OS === 'ios' ? 'py-2' : '';

  return (
    <>
      {label && <Text className="mb-2 font-heading text-lg text-black">{label}</Text>}

      <View className={`rounded-xl border border-gray-300 ${moreClassName}`}>
        <Pressable onPress={focusInput}>
          <View className="w-full flex-row items-center py-2">
            {leftComponent && <View className="mx-2 justify-center">{leftComponent}</View>}
            <RNTextInput
              className={`px-5 ${$HEIGHT} text-white`}
              placeholderTextColor="gray"
              autoCapitalize="none"
              cursorColor="white"
              ref={inputRef}
              style={$TextInputStyle}
              {...rnTextInputProps}
            />
            {rightComponent && <View className="mx-4 justify-center">{rightComponent}</View>}
          </View>
        </Pressable>
      </View>

      {errorMessage && (
        <Text className="font-semiBold text-md mt-1 text-left font-bold text-red-500">
          {errorMessage}
        </Text>
      )}
    </>
  );
}

const $TextInputStyle = {
  flexGrow: 1,
  flexShrink: 1,
  padding: 0,
};
