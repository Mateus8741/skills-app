import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { api } from '~/api/apiConfig';
import { UserSchema } from '~/models';

export function useUpdateUser(onSuccess?: () => void) {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (data: Partial<UserSchema>) => api.put('/users/profile', data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Perfil atualizado com sucesso!',
      });
      onSuccess?.();
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar perfil',
        text2: 'Tente novamente mais tarde',
      });
    },
  });

  return { updateUser: mutate, isSuccess, isPending };
}
