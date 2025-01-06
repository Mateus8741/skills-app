import { z } from 'zod';

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    new_Password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve ter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve ter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'A senha deve ter pelo menos um número')
      .regex(/[^A-Za-z0-9]/, 'A senha deve ter pelo menos um caractere especial'),
    confirm_Password: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.new_Password === data.confirm_Password, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;
