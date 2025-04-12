import Link from 'next/link';
import { Home, Star, DollarSign, Menu } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { AuthButtons } from './auth-buttons';

export const MobileMenu = () => {
    return (
        <div className="flex items-center justify-between space-x-10 w-full text-white px-4 py-3 md:hidden bg-theme">
            <Link href="/" className="font-extrabold">
                Descripto
            </Link>

            <div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="bg-theme hover:bg-white hover:text-theme2 cursor-pointer">
                            <Menu strokeWidth={3} size={25} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="p-3">
                        <SheetHeader>
                            <SheetTitle className="text-2xl font-semibold">
                                Menu
                            </SheetTitle>
                            <SheetDescription className="text-sm">
                                Navigate through pages
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col w-full gap-6 pl-3">
                            <Link
                                href="#"
                                className="flex flex-row gap-2.5 items-center transition-all duration-300 ease-out hover:pl-4 text-xl"
                            >
                                <Home size={20} />
                                Home
                            </Link>
                            <Link
                                href="#"
                                className="flex flex-row gap-2.5 items-center transition-all duration-300 ease-out hover:pl-4 text-xl"
                            >
                                <Star size={20} />
                                About
                            </Link>
                            <Link
                                href="#"
                                className="flex flex-row gap-2.5 items-center transition-all duration-300 ease-out hover:pl-4 text-xl"
                            >
                                <DollarSign size={20} />
                                Pricing
                            </Link>
                            <div className="flex flex-row gap-2.5 items-center text-xl">
                                <AuthButtons />
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};
