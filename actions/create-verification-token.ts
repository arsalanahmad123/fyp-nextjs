'use server';

import { prisma } from '@/lib/db';

type VerificationToken = {
    identifier: string;
    token: string;
    expires: Date;
};

export const createVerificationToken = async (
    identifier: string
): Promise<VerificationToken> => {
    const expires = new Date(Date.now() + 15 * 60 * 1000); 
    const token = Math.floor(1000 + Math.random() * 9000).toString();

    try {
        const newVerificationToken = await prisma.verificationToken.create({
            data: {
                identifier,
                expires,
                token,
            },
        });

        return newVerificationToken;
    } catch (error) {
        console.error('Failed to create verification token:', error);
        throw new Error('Failed to create verification token');
    }
};
