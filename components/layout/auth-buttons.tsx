import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

export const AuthButtons = () => {
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
