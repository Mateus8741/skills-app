import { AppTabBottomTabParamList } from './AppTabNavigator';

interface IconProps {
  label: string;
  icon: {
    focused: string;
    unfocused: string;
  };
  color: string;
}

export const mapScreenToProps: Record<
  keyof AppTabBottomTabParamList,
  {
    label: string;
    icon: {
      focused: IconProps['color'];
      unfocused: IconProps['color'];
    };
  }
> = {
  HomeScreen: {
    label: 'Início',
    icon: {
      focused: 'home',
      unfocused: 'home',
    },
  },
  ProfileScreen: {
    label: 'Perfil',
    icon: {
      focused: 'person',
      unfocused: 'person',
    },
  },
};
