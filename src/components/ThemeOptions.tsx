import { Moon, Smartphone, Sun } from 'lucide-react-native';

import { ThemeType } from '~/stores';

export const themeOptions: {
  icon: (color: string) => JSX.Element;
  title: string;
  value: ThemeType;
}[] = [
  {
    icon: (color) => <Sun size={24} color={color} />,
    title: 'Tema claro',
    value: 'light',
  },
  {
    icon: (color) => <Moon size={24} color={color} />,
    title: 'Tema escuro',
    value: 'dark',
  },
  {
    icon: (color) => <Smartphone size={24} color={color} />,
    title: 'Tema do sistema',
    value: 'system',
  },
];
