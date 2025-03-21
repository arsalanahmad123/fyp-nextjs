'use server';
import { db } from '@/lib/db';

type Res = {
    token: string;
    identifier: string;
    expires: Date 
} | null;

export const findVerificationTokenByToken = async (
    token: string
): Promise<Res> => {
    const foundToken = await db.verificationToken.findFirst({
        where: {
            token,
        },
    });

    if (!foundToken) {
        return null;
    }

    return foundToken;

};
