'use server';

import { db } from '@/lib/db';
import { SignupFormValues, signupSchema } from '@/schemas/auth.schema';
import { createVerificationToken } from './create-verification-token';
import bcrypt from "bcryptjs"
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
        const parsedValues = signupSchema.safeParse(values);

        if (!parsedValues.success) {
            return {
                success: false,
                status: 400,
                message: 'Invalid fields',
            };
        }

        const existingUser = await db.user.findFirst({
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

        const hashedPassword = await bcrypt.hash(values.password,10);

        const user = await db.user.create({
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
