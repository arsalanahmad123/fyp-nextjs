'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    forgotPasswordSchema,
    type ForgotPasswordFormValues,
} from '@/schemas/auth.schema';
import { requestPasswordReset } from '@/actions/forgot-password';
import { toast } from 'sonner';
import { useState } from 'react';

const ForgotPassword = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        try {
            const response = await requestPasswordReset(data);

            if (response.success) {
                form.reset();
                setIsSubmitted(true);
                toast.success(response.message);
        } else {
                toast.success(
                    'If this email is registered, you will receive a password reset link shortly.'
                );
                setIsSubmitted(true);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="min-h-[80svh] flex items-start justify-center lg:pt-20 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-8">
                <div className="text-center">
                    <p className="text-lg font-medium text-theme">
                        FORGOT YOUR PASSWORD?
                    </p>
                    <h2 className="mt-2 text-3xl md:text-[48px] font-extrabold text-gray-900">
                        Reset your password
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-md mx-auto">
                        Enter the email address associated with your account,
                        and we&apos;ll send you a link to reset your password.
                    </p>
                </div>

                <div className="mt-8 bg-secondary/20 p-8 rounded-lg shadow-sm max-w-lg m-auto">
                    {!isSubmitted ? (
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
                                                Email address (required)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your email"
                                                    className="py-7 bg-white focus-visible:ring-0 border-0 text-[17px]"
                                                    type="email"
                                                    autoComplete="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    className="w-full bg-black hover:bg-primary text-white py-6 text-[17px] cursor-pointer transition-colors duration-200 ease-in"
                                    disabled={form.formState.isSubmitting}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Reset Password{' '}
                                        {!form.formState.isSubmitting && (
                                            <ArrowRight
                                                size={18}
                                                strokeWidth={3}
                                            />
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
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Check your email
                            </h3>
                            <p className="text-gray-600 mb-6">
                                If the email address exists in our system, we&apos;ve
                                sent instructions to reset your password.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setIsSubmitted(false)}
                                className="mr-2"
                            >
                                Try another email
                            </Button>
                        </div>
                    )}

                    <div className="text-center mt-4">
                        <p className="text-[16px] text-gray-600">
                            Remember your password?{' '}
                            <Link
                                href="/signin"
                                className="text-gray-800 font-medium hover:text-gray-900"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
