import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';
import { getUserById } from './lib/common-auth-queries';

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider !== 'credentials') return true;

            const existingUser = await getUserById(user?.id as string);
            if (!existingUser?.emailVerified) return false;

            return true;
        },
        async jwt({ token, trigger, session,account }) {
            if (trigger === 'update') {
                return { ...token, ...session.user };
            }
            if (account?.provider === 'credentials') {
                token.credentials = true;
            }
            return token;
        },

    },
} satisfies NextAuthConfig;




