import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';
import { getUserById } from './lib/common-auth-queries';
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from './schemas/auth.schema';
import { getUserByEmail } from './lib/common-auth-queries';
import bcrypt from "bcryptjs"

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
         Credentials({
                    credentials: {
                        email: {},
                        password: {},
                    },
                    async authorize(credentials) {
                        const { email, password } = await loginSchema.parseAsync(
                            credentials
                        );
                        const user = await getUserByEmail(email);
                        if (!user || !user.password) {
                            throw new Error('Invalid credentials.');
                        }
        
                        const passwordMatch = await bcrypt.compare(
                            password,
                            user.password
                        );
                        if (passwordMatch)
                            return {
                                id: user.id,
                                email: user.email,
                                name: user.username,
                                emailVerified: user.emailVerified,
                                image: user.image,
                            };
        
                        return null;
                    },
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




