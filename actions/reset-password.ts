'use server';

import { ResetPasswordFormValues } from '@/schemas/auth.schema';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function resetPassword(
    email: string | undefined, 
    data: ResetPasswordFormValues
) {
    try {


        const hashedPassword = await bcrypt.hash(data.password,10)

        await db.user.update({
            where: {
                email
            },
            data: {
                password: hashedPassword
            }
        });

        return {
            success: true,
            message:
                'Password reset successful. You can now login with your new password.',
        };
    } catch (error) {
        console.error('Password reset error:', error);
        return {
            success: false,
            message: 'Something went wrong. Please try again.',
        };
    }
}
