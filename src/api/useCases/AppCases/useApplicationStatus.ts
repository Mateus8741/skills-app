import { useMutation } from "@tanstack/react-query";
import { applicationStatus } from "~/api/apiConfig";

export function useApplicationStatus() {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'ACCEPTED' | 'REJECTED' }) => 
      applicationStatus(id, status),
    onSuccess: () => {
      console.log('Status da aplicação alterado com sucesso');
    },
    onError: (error) => {
      console.log('Erro:', error.message);
    },
  });

  return { applicationStatus: mutate, isSuccess, isPending };
}
