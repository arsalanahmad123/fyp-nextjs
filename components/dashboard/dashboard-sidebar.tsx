'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import {
    LayoutDashboard,
    History,
    PlusCircle,
    User,
    LogOut,
} from 'lucide-react';

export function DashboardSidebar() {
    
    const pathname = usePathname();

    const handleSignOut = async() =>{
        await signOut();
        window.location.href="/";
    }
    

    const menuItems = [
        {
            title: 'Dashboard',
            icon: LayoutDashboard,
            href: '/dashboard',
        },
        {
            title: 'New Content',
            icon: PlusCircle,
            href: '/dashboard/new',
        },
        {
            title: 'History',
            icon: History,
            href: '/dashboard/history',
        },
        // {
        //     title: 'Content Library',
        //     icon: FileText,
        //     href: '/dashboard/library',
        // },
        // {
        //     title: 'Settings',
        //     icon: Settings,
        //     href: '/dashboard/settings',
        // },
    ];

    return (
        <div className="w-64 h-full flex flex-col bg-[var(--sidebar)] text-[var(--sidebar-foreground)] shadow-md">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-[var(--sidebar-border)]">
                <Link href={'/'}>
                    <span className="text-xl font-bold font-dm-sans">
                        Descripto 
                    </span>
                </Link>
            </div>

            {/* Menu Items */}
            <div className="flex-1 py-4 overflow-y-auto">
                <ul className="space-y-1 px-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center px-3 py-2.5 text-sm rounded-md transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-[var(--sidebar-primary)] text-[var(--sidebar-primary-foreground)] border-l-4 border-[var(--color-theme)]'
                                            : 'text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]'
                                    }`}
                                >
                                    <item.icon
                                        className={`h-5 w-5 mr-3 ${
                                            isActive
                                                ? 'text-[var(--sidebar-primary-foreground)]'
                                                : 'text-[var(--color-theme)]'
                                        }`}
                                    />
                                    <span className="font-dm-sans">
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[var(--sidebar-border)]">
                <ul className="space-y-1 px-2">
                    <li>
                        <Link
                            href="/dashboard/profile"
                            className="flex items-center px-3 py-2.5 text-sm rounded-md text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] transition-colors duration-200"
                        >
                            <User className="h-5 w-5 mr-3 text-[var(--color-theme)]" />
                            <span className="font-dm-sans">Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Button
                            onClick={handleSignOut}
                            variant={'destructive'}
                            className="flex items-center px-3 py-2.5"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            <span className="font-dm-sans">Logout</span>
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
