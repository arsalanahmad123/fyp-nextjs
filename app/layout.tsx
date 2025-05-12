import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { TopHeader } from '@/components/layout/top-header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const dmSans = DM_Sans({
    variable: '--font-dm-sans',
    subsets: ['latin'],
});
const InterFont = Inter({
    variable: '--font-inter',
    subsets: ['cyrillic'],
});

export const metadata: Metadata = {
    title: 'SEO CONTENT GENERATION',
    description: 'Generate fast and optimized SEO content',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang="en">
            <body
                className={`${dmSans.variable} ${InterFont.variable}`}
                data-new-gr-c-s-check-loaded="8.929.0"
                data-gr-ext-installed=""
                cz-shortcut-listen="true"
            >
                <SessionProvider session={session}>
                    <TopHeader />
                    <Header />
                    <main>
                        <Toaster richColors />
                        <SessionProvider>{children}</SessionProvider>
                    </main>
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    );
}
