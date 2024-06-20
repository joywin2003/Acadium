import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email().regex(/^[^\s@]+@sjec\.ac\.in$/, "must use sjec email id"),
    password: z.string(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;