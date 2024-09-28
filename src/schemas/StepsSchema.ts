import { z } from 'zod';

export const stepsScheema = z.object({
  firstName: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  lastName: z.string().min(3, 'O sobrenome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type StepsScheema = z.infer<typeof stepsScheema>;

export const Step1Scheema = stepsScheema.pick({
  email: true,
});
