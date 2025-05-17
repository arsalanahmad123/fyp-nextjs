'use client';

import Link from 'next/link';
import { AuthButtons } from '@/components/layout/auth-buttons';
import { MenuItems } from '@/components/layout/MenuItems';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { usePathname } from 'next/navigation';

export const Header = () => {

    const pathname = usePathname();
    
        if (
            pathname === '/signin' ||
            pathname.startsWith('/signup') ||
            pathname.startsWith('/dashboard')
            || pathname.startsWith('/forgot') || 
            pathname.startsWith('/reset')
        ) {
            return null;
        }

    return (
        <>
            <div className="w-full h-20 bg-white/90 drop-shadow-xs md:flex justify-between p-4 md:px-10 md:py-4 hidden">
                <h4 className="font-semibold text-2xl cursor-pointer">
                    <Link href={'/'}>Descripto</Link>
                </h4>
                <MenuItems />
                <AuthButtons />
            </div>
            <MobileMenu />
        </>
    );
};
