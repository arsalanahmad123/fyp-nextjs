'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { Separator } from '../ui/separator';

async function handleSignOut() {
    signOut();
    window.location.href = '/';
}

export const AuthButtons = () => {
    const { data: session } = useSession();

    const isLoggedIn = !!session?.user;

    if (isLoggedIn) {
        return (
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger className="cursor-pointer">
                        Profile
                    </MenubarTrigger>
                    <MenubarContent align="end">
                        <MenubarItem className="cursor-pointer">
                            <Link
                                className="font-semibold w-full bg-transparent text-theme2  group cursor-pointer text-center"
                                href={'/dashboard'}
                            >
                                Dashboard 
                            </Link>
                        </MenubarItem>
                        <Separator className='my-2' />
                        <MenubarItem className="cursor-pointer">
                            <Button
                                className="font-semibold w-full bg-transparent text-theme2 hover:bg-red-500 hover:text-white group cursor-pointer"
                                onClick={handleSignOut}
                            >
                                <LogOut className="h-4 w-4 group-hover:text-white" />
                                Logout
                            </Button>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
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
