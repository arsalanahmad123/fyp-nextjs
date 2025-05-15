'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { LogOut, User } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '../ui/separator';
import { useState, useEffect } from 'react';
import Image from 'next/image';

async function handleSignOut() {
    await signOut();
    window.location.href = '/';
}

export const AuthButtons = () => {
    const { data: session } = useSession();
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration errors by only rendering after component is mounted
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isLoggedIn = !!session?.user;

    // Don't render anything until client-side
    if (!isMounted) {
        return null;
    }

    if (isLoggedIn) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full overflow-hidden p-0"
                        aria-label="Profile menu"
                    >
                        {session?.user?.image ? (
                            <Image
                                src={session.user.image || '/placeholder.svg'}
                                alt={session.user.name || 'User'}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <User className="h-5 w-5 text-muted-foreground" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <div className="flex flex-col space-y-1 p-2">
                        <p className="text-sm font-medium">
                            {session?.user?.name || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {session?.user?.email || ''}
                        </p>
                    </div>
                    <Separator />
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem
                        onClick={handleSignOut}
                        className="text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
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
