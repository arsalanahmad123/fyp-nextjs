'use server';

import { ForgotPasswordFormValues } from '@/schemas/auth.schema';
import { getTransport } from '@/lib/nodemailer';
import { db } from '@/lib/db';
import { createVerificationToken } from './create-verification-token';

export async function requestPasswordReset(data: ForgotPasswordFormValues) {
    try {
        const {email} = data;


        const user = await db.user.findUnique({
            where: {
                email
            }
        })

        const account = await db.account.findFirst({
            where: {
                userId: user?.id
            }
        });

        if(account){
            return {
                success: false,
                message: 'Please signin with your google account!',
            };
        }
          
        
        if (!user) {
            return {
                success: false,
                message: 'User with this account does not exist',
            };
        }
        const token = await createVerificationToken(email)
        
        const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
        const transport = await getTransport();

        await transport.sendMail({
            from: 'Descripto <no-reply@descripto.com>',
            to: data.email,
            subject: 'Reset Your Password',
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111013; max-width: 700px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #000000; font-size: 24px; margin: 0;">Password Reset Request</h1>
            </div>
            <div style="padding: 20px; border-radius: 8px;">
                <p style="font-size: 16px; margin: 0 0 20px;">Hello,</p>
                <p style="font-size: 16px; margin: 0 0 20px;">We received a request to reset your password. Click the button below to create a new password:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${BASE_URL}/reset-password?token=${token.token}" 
                       style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #000000; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;">
                        Reset Password
                    </a>
                </div>
                <p style="font-size: 14px; color: #111013; margin: 20px 0 0;">If you didn't request a password reset, you can safely ignore this email.</p>
                <p style="font-size: 14px; color: #111013; margin: 20px 0 0;">This link will expire in 1 hour for security reasons.</p>
            </div>
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="font-size: 14px; color: #111013; margin: 0;">Best regards,<br>Your App Team</p>
            </div>
        </div>
      `,
        });

        return {
            success: true,
            message:
                'If this email is registered, you will receive a password reset link shortly.',
        };
    } catch (error) {
        console.error('Password reset request error:', error);
        return {
            success: false,
            message: 'Something went wrong. Please try again.',
        };
    }
}
