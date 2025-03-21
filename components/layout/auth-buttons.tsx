import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { auth } from '@/auth';
import { signOut } from '@/auth';
import { LogOut } from 'lucide-react';

async function handleSignOut() {
    'use server';
    await signOut();
    window.location.href = "/"
}

export const AuthButtons = async () => {
    const session = await auth();
    const isLoggedIn = !!session?.user;

    if (isLoggedIn) {
        return (
            <form action={handleSignOut}>
                <button
                    type="submit"
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'font-semibold bg-red-500 text-[16px] cursor-pointer hover:bg-red-600 text-white transition duration-300 flex items-center gap-2 border-none hover:text-white'
                    )}
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </form>
        );
    }

    return (
        <div className="flex justify-between items-center space-x-4">
            <Link
                href="/signin"
                className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'font-semibold text-[16px] cursor-pointer hover:bg-accent-foreground hover:text-white transition duration-300'
                )}
            >
                Login
            </Link>
            <Link
                href="/signup"
                className={cn(
                    buttonVariants({ variant: 'default' }),
                    'font-semibold text-[16px] cursor-pointer hover:bg-theme hover:text-white transition duration-300'
                )}
            >
                Signup
            </Link>
        </div>
    );
};
