import { useMutation } from '@tanstack/react-query';

import { deleteAccount } from '~/api/apiConfig';

export function useDeleteAccount(onSuccess?: () => void) {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (password: string) => deleteAccount(password),
    onSuccess,
    onError: (error) => console.log(error),
  });

  return { exclude: mutate, isSuccess, isPending };
}
