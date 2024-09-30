import { useNavigation } from '@react-navigation/native';

export function useResetNavigation() {
  const { reset } = useNavigation();

  type ResetNavigation = {
    routeName: keyof ReactNavigation.RootParamList;
  };

  function resetNavigation({ routeName }: ResetNavigation) {
    reset({
      index: 0,
      routes: [
        {
          name: routeName,
        },
      ],
    });
  }

  return { reset: resetNavigation };
}
