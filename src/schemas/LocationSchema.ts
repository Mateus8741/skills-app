import { z } from 'zod';

export const locationScheema = z.object({
  street: z.string().min(2, 'Nome da rua muito curto').max(50, 'Nome da rua muito longo'),
  neighborhood: z
    .string()
    .min(2, 'Nome do bairro muito curto')
    .max(50, 'Nome do bairro muito longo'),
  complement: z.string().optional(),
  reference: z.string().optional(),
  houseNumber: z
    .string()
    .min(1, 'Número da casa deve ser maior que 0')
    .transform((value) => Number(value))
    .refine((value) => value > 0, { message: 'Número da casa deve ser maior que 0' }),
});

export type LocationScheema = z.infer<typeof locationScheema>;
