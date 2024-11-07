import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import { Select, SelectOption } from '../Select';

interface FormSelectProps<FormType extends FieldValues> extends UseControllerProps<FormType> {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
}

export function FormSelect<FormType extends FieldValues>({
  control,
  name,
  rules,
  label,
  placeholder,
  options,
}: FormSelectProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <Select
          label={label}
          placeholder={placeholder}
          options={options}
          value={field.value}
          onValueChange={field.onChange}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
}
