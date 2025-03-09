import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Home,
    Star,
    DollarSign,
    Phone,
    User,
    Settings,
    LogOut,
} from 'lucide-react';

export const MobileMenu = () => {
    return (
        <div className="flex items-center justify-center space-x-10 w-full text-white px-4 py-3">
            <Link
                href="/"
                className="flex flex-col items-center font-medium hover:text-theme  hover:bg-white p-1 rounded-md transition duration-100 ease-out"
            >
                <Home size={20} />
            </Link>
            <Link
                href="#"
                className="flex flex-col items-center text-xs font-medium hover:text-theme hover:bg-white p-1 rounded-md transition duration-100 ease-out"
            >
                <Star size={20} />
            </Link>
            <Link
                href="#"
                className="flex flex-col items-center text-xs font-medium hover:text-theme hover:bg-white p-1 rounded-md transition duration-100 ease-out"
            >
                <DollarSign size={20} />
            </Link>
            <Link
                href="#"
                className="flex flex-col items-center text-xs font-medium hover:text-theme hover:bg-white p-1 rounded-md transition duration-100 ease-out"
            >
                <Phone size={20} />
            </Link>

            {/* User Dropdown Menu */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                        <Link
                            href="/profile"
                            className="flex items-center gap-2"
                        >
                            <User className="w-4 h-4 text-gray-700" /> Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            href="/settings"
                            className="flex items-center gap-2"
                        >
                            <Settings className="w-4 h-4 text-gray-700" />{' '}
                            Settings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            href="/logout"
                            className="flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4 text-gray-700" /> Logout
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
