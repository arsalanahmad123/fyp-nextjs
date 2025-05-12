import { auth } from "@/auth"
import { redirect } from "next/navigation";
interface Props {
    children: React.ReactNode
}
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';


export default async function DashboardLayout({children}: Props){


    const session = await auth();

    if(!session?.user) return redirect('/');

    return (
        <div className="flex h-screen bg-[var(--color-theme3)]">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto bg-background">
                {children}
            </main>
        </div>
    );
}
