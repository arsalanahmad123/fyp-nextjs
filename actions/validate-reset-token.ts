"use server";
import { db } from '@/lib/db';

type Res = {
    email?: string;
    success: boolean;
};

export const validateResetToken = async (token: string): Promise<Res> => {
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


        await db.verificationToken.delete({
            where: {
                identifier_token: {
                    identifier: foundToken.identifier,
                    token: foundToken.token,
                },
            },
        });
        return {
            email: foundToken.identifier,
            success: true,
        };

};
