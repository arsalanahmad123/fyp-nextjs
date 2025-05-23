'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, EyeClosed,Loader2 } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema';
import { useState } from 'react';
import { signinUser } from '@/actions/signin';
import { toast } from 'sonner';
import { signInWithGoogle } from '@/actions/signin-with-google';
const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await signinUser(data);
            if(response.success){
                form.reset();
                toast.success("Logged in success")
                window.location.href="/dashboard";
            }
            else{
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Something went wrong...")
            console.log(error);
        }
    };

    const signinWithGoogle = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            toast.error('Something went wrong...');
        }
    };



    return (
        <div className="min-h-[80svh] flex items-start justify-center lg:pt-20 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-8">
                <div className="text-center">
                    <p className="text-lg font-medium text-theme">
                        WELCOME BACK!
                    </p>
                    <h2 className="mt-2 text-3xl md:text-[63px] font-extrabold text-gray-900">
                        Login to continue
                    </h2>
                </div>

                <div className="mt-8 bg-theme3 p-8 rounded-lg shadow-sm max-w-lg m-auto">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm text-gray-400">
                                            Email or Username (required)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter Email"
                                                className="py-7 bg-white focus-visible:ring-0 border-0 text-[17px]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm text-gray-400">
                                            Password (required)
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    placeholder="Enter Password"
                                                    className="py-7 bg-white focus-visible:ring-0 border-0 text-[17px]"
                                                />
                                                {!showPassword ? (
                                                    <EyeClosed
                                                        className="absolute top-4 right-3 cursor-pointer"
                                                        onClick={
                                                            togglePasswordVisibility
                                                        }
                                                    />
                                                ) : (
                                                    <Eye
                                                        className="absolute top-4 right-3 cursor-pointer"
                                                        onClick={
                                                            togglePasswordVisibility
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="text-sm text-right">
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-gray-800 hover:text-gray-900 hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                className="w-full bg-black hover:bg-theme text-white py-6 text-[17px] cursor-pointer transition-colors duration-200 ease-in"
                                disabled={form.formState.isSubmitting}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Sign in with Descripto{' '}
                                    {!form.formState.isSubmitting && (
                                        <ArrowRight size={18} strokeWidth={3} />
                                    )}
                                    {form.formState.isSubmitting && (
                                        <Loader2
                                            size={18}
                                            strokeWidth={3}
                                            className="animate-spin"
                                        />
                                    )}
                                </span>
                            </Button>
                        </form>
                    </Form>


                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-800 font-semibold">
                            OR
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full py-6 flex items-center justify-center gap-2 mt-4 hover:bg-theme transition-colors duration-200 ease-in text-[17px] hover:text-white cursor-pointer"
                        disabled={form.formState.isSubmitting}
                        onClick={() => signinWithGoogle()}
                    >
                        Sign in with Google
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                            <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                    </Button>

                    <div className="text-center mt-4">
                        <p className="text-[16px] text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/signup"
                                className="text-gray-800 font-medium hover:text-gray-900"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
