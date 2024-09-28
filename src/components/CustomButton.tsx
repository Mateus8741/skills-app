import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isDisabled?: boolean;
}

export function CustomButton({ title, isDisabled, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className="h-16 w-full items-center justify-center rounded-xl bg-white"
      disabled={isDisabled}
      {...rest}>
      {isDisabled ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text className="text-center text-lg font-semibold text-green-600">{title}</Text>
      )}
    </TouchableOpacity>
  );
}
