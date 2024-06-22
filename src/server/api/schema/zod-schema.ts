import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email().regex(/^[^\s@]+@sjec\.ac\.in$/, "must use sjec email id"),
    password: z.string(),
    role: z.enum(["student", "faculty", "admin"]),
});

export type TLoginSchema = z.infer<typeof loginSchema>;