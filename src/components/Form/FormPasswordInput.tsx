import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import { PasswordInput } from '../PasswordInput';
import { TextInputProps } from '../TextInput';

export function FormPasswordInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...textInputProps
}: TextInputProps & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <PasswordInput
          value={field.value}
          onChangeText={field.onChange}
          errorMessage={fieldState.error?.message}
          {...textInputProps}
        />
      )}
    />
  );
}
