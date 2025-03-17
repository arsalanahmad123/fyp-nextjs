import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        
    }
} satisfies NextAuthConfig;




