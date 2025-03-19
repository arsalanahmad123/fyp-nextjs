'use server';

import { prisma } from '@/lib/db';
import { SignupFormValues, signupSchema } from '@/schemas/auth.schema';
import { createVerificationToken } from './create-verification-token';
import argon2 from 'argon2';
import { sendSignupUserEmail } from './send-signup-email';

type Response = {
    success: boolean;
    status: number;
    message: string;
};

export const signupUser = async (
    values: SignupFormValues
): Promise<Response> => {
    try {
        const parsedValues = signupSchema.parse(values);

        if (!parsedValues) {
            return {
                success: false,
                status: 400,
                message: 'Invalid fields',
            };
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                email: values.email,
            },
        });

        if (existingUser) {
            return {
                success: false,
                status: 409,
                message: 'User already exists',
            };
        }

        const hashedPassword = await argon2.hash(values.password);

        const user = await prisma.user.create({
            data: {
                email: values.email,
                username: values.username,
                password: hashedPassword,
            },
        });

        const token = await createVerificationToken(values.email);

        await sendSignupUserEmail({
            email: user.email,
            token: token.token, 
        });

        return {
            success: true,
            status: 200,
            message:
                'User created successfully. Please check your email to verify your account.',
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            status: 500,
            message:
                'An error occurred while signing up. Please try again later.',
        };
    }
};
