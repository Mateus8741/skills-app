import { z } from 'zod';

export const forgotScheema = z.object({
  email: z.string().email('E-mail inválido'),
});

export type ForgotScheema = z.infer<typeof forgotScheema>;
