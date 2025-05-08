'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TopHeader = () => {
        const pathname = usePathname()
    
        if(pathname === '/signin' || pathname.startsWith('/signup') || pathname.startsWith('/dashboard')) return null;

    return (
        <div className="w-full text-center bg-black text-sm p-2">
            <span className="text-white">Checkout our new ai tools features:</span>
            <Link href={'#'} className="text-theme ml-1">Upgrade Now</Link>
        </div>
    );
}