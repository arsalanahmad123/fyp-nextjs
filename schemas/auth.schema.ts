import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, 'Email or username is required'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().default(false),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    username: z.string().min(1, 'Email or username is required'),
    password: z.string().min(1, 'Password is required'),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
    }),
});

export type SignupFormValues = z.infer<typeof signupSchema>;