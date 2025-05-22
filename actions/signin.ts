'use server';

import { signIn } from "@/auth";
import { LoginFormValues, loginSchema } from "@/schemas/auth.schema";
import { AuthError } from "next-auth";

type Response = {
    success: boolean;
    status: number;
    message: string;
};


export async function signinUser(values: LoginFormValues): Promise<Response> {
    try {
        
        const parsedValues = loginSchema.safeParse(values);

        if(!parsedValues.success){
            return {
                success: false,
                status: 400,
                message: 'Invalid fields'
            };
        }

        console.log(values)

        await signIn('credentials', {
            ...values,
            redirect: false, 
        });

        return {
        success: true,
        status: 200,
        message: 'Logged in success'
        }
        


    } catch(error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                case 'CallbackRouteError':
                    return {
                        success: false,
                        message: 'Invalid credentials',
                        status: 400,
                    };

                case 'AccessDenied':
                    return {
                        success: false,
                        message: 'Please verify your email or sign up again to receive a verification email',
                        status: 400,
                    };
                case 'OAuthAccountAlreadyLinkedError' as AuthError['type']:
                    return {
                        success: false,
                        message: 'Login with your Google or Github account',
                        status: 400,
                    };
            }
        }

        return {
            success: false,
            message: 'Internal Server Error',
            status: 500,
        };
    }
}