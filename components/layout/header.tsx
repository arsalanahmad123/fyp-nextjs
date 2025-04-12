import Link from 'next/link';
import { AuthButtons } from './auth-buttons';
import { MenuItems } from './MenuItems';
import { MobileMenu } from './mobile-menu';

export const Header = async () => {
    return (
        <>
            <div className="w-full h-20 bg-white/90 drop-shadow-xs  md:flex justify-between p-4 md:px-10 md:py-4 hidden">
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
