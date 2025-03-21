import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';
import authConfig from './auth.config';
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from './schemas/auth.schema';
import { getUserByEmail } from './lib/common-auth-queries';
import argon2 from "argon2";


const adapter = PrismaAdapter(db);

const {providers: authProviders, ...remainingConfig} = authConfig;
export const { auth, handlers, signIn, signOut } = NextAuth({
    ...remainingConfig,
    adapter,
    session: {
        strategy: 'jwt',
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/signin',
    },
    providers: [
        ...authProviders,
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

                const passwordMatch = await argon2.verify(
                    user.password,
                    password
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
});
