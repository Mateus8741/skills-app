import { z } from 'zod';

export const changePasswordScheema = z.object({
  old_password: z.string().min(6),
  new_password: z.string().min(6),
});

export type ChangePasswordScheema = z.infer<typeof changePasswordScheema>;
