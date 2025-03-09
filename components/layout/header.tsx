import { AuthButtons } from './auth-buttons';
import { MenuItems } from './MenuItems';
import { MobileMenu } from './mobile-menu';

export const Header = () => {
    return (
        <>
            <div className="w-full h-20 bg-transparent md:flex justify-between p-4 md:px-10 md:py-4 hidden">
                <h4 className="font-semibold text-2xl hover:animate-bounce">Descripto</h4>
                <MenuItems />
                <AuthButtons />
            </div>
            <div className="min-w-fit bg-black  fixed bottom-7 left-1/2 -translate-x-1/2  rounded-3xl shadow-md md:hidden">
                <MobileMenu />
            </div>
        </>
    );
};
