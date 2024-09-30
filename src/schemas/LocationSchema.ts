import { z } from 'zod';

export const locationScheema = z.object({
  street: z.string().min(2, 'Nome da rua muito curto').max(50, 'Nome da rua muito longo'),
  neighborhood: z
    .string()
    .min(2, 'Nome do bairro muito curto')
    .max(50, 'Nome do bairro muito longo'),
  complement: z.string().length(2, 'Complemento muito curto').max(50, 'Complemento muito longo'),
  houseNumber: z
    .number()
    .positive('Número deve ser positivo')
    .int()
    .min(1, 'Número da casa deve ser maior que 0'),
  reference: z
    .string()
    .length(2, 'Referência muito curta')
    .max(50, 'Referência muito longa')
    .optional(),
});

export type LocationScheema = z.infer<typeof locationScheema>;
