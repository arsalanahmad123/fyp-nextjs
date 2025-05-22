import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, {
        message: 'email is required'
    }),
    password: z.string().min(1, {
    message: 'Password is required',
}),
});



export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
    }),
});

export type SignupFormValues = z.infer<typeof signupSchema>;


export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
});
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;  


export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters' }),
        confirmPassword: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });
  
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
