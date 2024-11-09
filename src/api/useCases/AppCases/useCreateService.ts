import { useMutation } from '@tanstack/react-query';
import { api } from '~/api/apiConfig';
import { CreateServiceSchema } from '~/schemas';

async function createServiceFn(data: CreateServiceSchema) {
  const response = await api.post('/service', data);
  return response.data;
}

export function useCreateService() {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: createServiceFn,
    onSuccess: (data) => {
      console.log('Serviço criado:', data);
    },
    onError: (error: any) => {
      console.log('Erro ao criar serviço:', error.response?.data || error.message);
    },
  });

  return { createService: mutate, isSuccess, isPending };
}

// import { useMutation } from '@tanstack/react-query';

// import { createService } from '~/api/apiConfig';
// import { CreateServiceSchema } from '~/schemas';

// export function useCreateService(onSuccess?: () => void) {
//   const { mutate, isSuccess, isPending } = useMutation({
//     mutationFn: (data: CreateServiceSchema) => createService(data),
//     onSuccess,
//     onError: (error) => {
//       console.log('Erro:', error.message);
//     },
//   });

//   return { createService: mutate, isSuccess, isPending };
// }
