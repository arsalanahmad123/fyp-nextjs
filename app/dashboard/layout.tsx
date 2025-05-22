import type React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ResponsiveSidebarLayout } from '@/components/dashboard/responsive-sidebar';
import { SessionProvider } from 'next-auth/react';

interface Props {
    children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
    // Keep authentication as server-side logic
    const session = await auth();

    if (!session?.user) {
        return redirect('/');
    }

    return (
        <SessionProvider session={session}>
            <ResponsiveSidebarLayout>{children}</ResponsiveSidebarLayout>
        </SessionProvider>
    );
}
