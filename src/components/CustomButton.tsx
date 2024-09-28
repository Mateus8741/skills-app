import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { tv } from 'tailwind-variants';

import { Loading } from './Loading';

const buttonStyles = tv({
  slots: {
    base: 'h-16 w-full items-center justify-center rounded-xl',
    label: 'text-center text-xl font-bold',
    loading: 'text-white',
  },
  variants: {
    variant: {
      primary: {
        base: 'bg-white',
        label: 'text-green-600',
        loading: 'text-green-600',
      },
      secondary: {
        base: 'bg-green-600',
        label: 'text-white',
      },
      disabled: {
        base: 'bg-green-800/30',
        label: 'text-white',
      },
      ghost: {
        base: 'bg-transparent border border-white',
        label: 'text-white',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'disabled' | 'ghost';
  isLoading?: boolean;
}

export function CustomButton({
  title,
  variant = 'primary',
  isLoading = false,
  ...rest
}: ButtonProps) {
  const { base, label, loading } = buttonStyles({ variant });

  return (
    <TouchableOpacity
      className={base()}
      disabled={variant === 'disabled' || isLoading}
      {...rest}
      activeOpacity={0.7}>
      {isLoading ? (
        <Loading isButton color={loading()} />
      ) : (
        <Text className={label()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
