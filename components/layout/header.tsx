'use client';

import { AuthButtons } from './auth-buttons';
import { MenuItems } from './MenuItems';
import { MobileMenu } from './mobile-menu';
import { usePathname } from 'next/navigation';

export const Header = () => {

    const pathname = usePathname()

    if(pathname === '/signin' || pathname === '/signup') return null;

    return (
        <>
            <div className="w-full h-20 bg-transparent md:flex justify-between p-4 md:px-10 md:py-4 hidden">
                <h4 className="font-semibold text-2xl">Descripto</h4>
                <MenuItems />
                <AuthButtons />
            </div>
            <MobileMenu />
        </>
    );
};
