import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';
import authConfig from './auth.config';


const adapter = PrismaAdapter(db);

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter,
    session: {
        strategy: 'jwt',
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/signin',
        error: '/error',
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
});
