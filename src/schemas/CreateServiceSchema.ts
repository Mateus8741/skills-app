import { z } from 'zod';

export const Category = z
  .enum(['ELECTRICIAN', 'PAINTER', 'BRICKLAYER', 'BABYSITTER', 'GARDENER', 'PLUMBER', 'OTHERS'])
  .default('OTHERS');

export const createServiceSchema = z.object({
  name: z.string().min(2, 'Nome muito curto').max(50, 'Nome muito longo'),
  description: z.string().min(2, 'Descrição muito curta').max(200, 'Descrição muito longa'),
  category: Category,
  price: z.string().min(1, 'Preço muito curto').max(50, 'Preço muito longo'),
  location: z.object({
    city: z.string().min(2, 'Nome da cidade muito curto').max(50, 'Nome da cidade muito longo'),
    state: z.string().length(2, 'Estado deve ter 2 caracteres'),
    street: z.string().min(2, 'Nome da rua muito curto').max(50, 'Nome da rua muito longo'),
    neighborhood: z
      .string()
      .min(2, 'Nome do bairro muito curto')
      .max(50, 'Nome do bairro muito longo'),
    complement: z.string().optional().default(''),
    reference: z.string().optional().default(''),
    number: z.string().optional().default(''),
    latitude: z.number().default(0),
    longitude: z.number().default(0),
  }),
});

export type CreateServiceSchema = z.infer<typeof createServiceSchema>;
