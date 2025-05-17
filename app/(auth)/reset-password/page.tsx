'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    resetPasswordSchema,
    type ResetPasswordFormValues,
} from '@/schemas/auth.schema';
import { resetPassword } from '@/actions/reset-password';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { validateResetToken } from '@/actions/validate-reset-token';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValidatingToken, setIsValidatingToken] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [userEmail,setUserEmail] = useState<string | undefined>('')
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsTokenValid(false);
                setIsValidatingToken(false);
                return;
            }
            const response = await validateResetToken(token);
            if(response.success){
            setUserEmail(response.email);
            setIsTokenValid(true); 
            setIsValidatingToken(false);
            }else{
                setIsTokenValid(false);
                setIsValidatingToken(false);
            }
        };

        validateToken();
    }, [token]);

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: ResetPasswordFormValues) => {
        try {
            const response = await resetPassword(userEmail,data);

            if (response.success) {
                form.reset();
                toast.success(response.message);
                setTimeout(() => {
                    window.location.href = '/signin';
                }, 2000);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(error);
        }
    };

    if (isValidatingToken) {
        return (
            <div className="min-h-[80svh] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-lg text-gray-600">
                        Validating reset token...
                    </p>
                </div>
            </div>
        );
    }

    if (!isTokenValid) {
        return (
            <div className="min-h-[80svh] flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Invalid Reset Link
                    </h2>
                    <p className="text-gray-600 mb-6">
                        This password reset link is invalid or has expired.
                        Please request a new password reset link.
                    </p>
                    <Link href="/forgot-password">
                        <Button className="bg-black hover:bg-primary text-white">
                            Request New Reset Link
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80svh] flex items-start justify-center lg:pt-20 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-8">
                <div className="text-center">
                    <p className="text-lg font-medium text-primary">
                        RESET YOUR PASSWORD
                    </p>
                    <h2 className="mt-2 text-3xl md:text-[48px] font-extrabold text-gray-900">
                        Create new password
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-md mx-auto">
                        Please enter your new password below. Make sure it&apos;s at
                        least 6 characters long.
                    </p>
                </div>

                <div className="mt-8 bg-secondary/20 p-8 rounded-lg shadow-sm max-w-lg m-auto">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm text-gray-400">
                                            New Password (required)
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
                                                    placeholder="Enter new password"
                                                    className="py-7 bg-white focus-visible:ring-0 border-0 text-[17px]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5 text-gray-500" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-500" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm text-gray-400">
                                            Confirm Password (required)
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    type={
                                                        showConfirmPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    placeholder="Confirm new password"
                                                    className="py-7 bg-white focus-visible:ring-0 border-0 text-[17px]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword
                                                        )
                                                    }
                                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="h-5 w-5 text-gray-500" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-500" />
                                                    )}
                                                </button>
                                            </div>
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
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
