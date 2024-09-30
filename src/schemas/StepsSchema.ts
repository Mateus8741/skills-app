import { z } from 'zod';

export const stepsScheema = z.object({
  firstName: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  lastName: z.string().min(3, 'O sobrenome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z
    .string()
    .min(6)
    .refine((val) => /[a-z]/.test(val), {
      message: 'A senha deve conter ao menos uma letra de a-z',
    })
    .refine((val) => /\d/.test(val), {
      message: 'A senha deve conter ao menos um número de 0-9',
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: 'A senha deve conter ao menos um caractere especial',
    }),
});

export type StepsScheema = z.infer<typeof stepsScheema>;

export const Step1Scheema = stepsScheema.pick({
  email: true,
});
