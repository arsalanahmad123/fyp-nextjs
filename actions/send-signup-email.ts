'use server';

import { transport } from '@/lib/nodemailer';

export const sendSignupUserEmail = async ({
    email,
    token,
}: {
    email: string;
    token: string;
}) => {
    console.log(`Sending email to ${email} with token ${token}`);

    const BASE_URL = process.env.BASE_URL;

    await transport.sendMail({
        from: 'Descripto <no-reply@descripto.com>',
        to: email,
        subject: 'Verify Your Email Address',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111013; max-width: 700px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #ff8565; font-size: 24px; margin: 0;">Welcome to Descripto!</h1>
                    <p style="color: #111013; font-size: 14px;">Your ultimate tool for generating SEO content</p>
                </div>
                <div style="padding: 20px; border-radius: 8px;">
                    <p style="font-size: 16px; margin: 0 0 20px;">Hi there,</p>
                    <p style="font-size: 16px; margin: 0 0 20px;">Thank you for signing up with Descripto. To get started, please verify your email address by clicking the button below:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href=${BASE_URL}/auth/signup/verify-email?token=${token} 
                           style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #ff8565; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;">
                            Verify My Email
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #111013; margin: 0;">If you did not sign up for a Descripto account, you can safely ignore this email.</p>
                </div>
                <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                    <p style="font-size: 14px; color: #111013; margin: 0;">Best regards,<br>The Descripto Team</p>
                </div>
            </div>
        `,
    });
};
