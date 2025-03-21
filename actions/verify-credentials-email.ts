"use server";
import { getUserByEmail } from '@/lib/common-auth-queries';
import { db } from '@/lib/db';

type Res = {
    success: boolean;
};

export const verifyCredentialsEmail = async (token: string): Promise<Res> => {
    const foundToken = await db.verificationToken.findFirst({
        where: {
            token,
        },
    });

    if (!foundToken) {
        return {
            success: false,
        };
    }
    if (new Date() > new Date(foundToken.expires)) {
        return {
            success: false,
        };
    }

    const user = await getUserByEmail(foundToken.identifier);

    if (user?.id && !user.emailVerified) {
        await db.user.update({
            where: {
                email: foundToken.identifier,
            },
            data: {
                emailVerified: new Date(),
            },
        });

        await db.verificationToken.delete({
            where: {
                identifier_token: {
                    identifier: foundToken.identifier,
                    token: foundToken.token,
                },
            },
        });
        return {
            success: true,
        };
    }

    return { success: true };
};
