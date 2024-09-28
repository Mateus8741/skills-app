import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';

import { TextInput, TextInputProps } from '../components/TextInput';

export type PasswordInputProps = Omit<TextInputProps, 'rightComponent'>;

export function PasswordInput({ ...textInputProps }: PasswordInputProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  function toggleSecureTextEntry() {
    setIsSecureTextEntry((prev) => !prev);
  }

  return (
    <TextInput
      secureTextEntry={isSecureTextEntry}
      {...textInputProps}
      rightComponent={
        <MaterialCommunityIcons
          name={isSecureTextEntry ? 'eye' : 'eye-off'}
          onPress={toggleSecureTextEntry}
          color="#6B7280"
          size={24}
        />
      }
    />
  );
}
