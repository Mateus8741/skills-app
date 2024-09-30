import { z } from 'zod';

export const loginScheema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string(),
});

export type LoginScheema = z.infer<typeof loginScheema>;
