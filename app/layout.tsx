import type { Metadata } from 'next';
import { DM_Sans,Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { TopHeader } from '@/components/layout/top-header';

const dmSans = DM_Sans({
    variable: '--font-dm-sans',
    subsets: ['latin'],
});
const InterFont = Inter({
    variable: '--font-inter',
    subsets: ['cyrillic']
});

export const metadata: Metadata = {
    title: 'SEO CONTENT GENERATION',
    description: 'Generate fast and optimized SEO content',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${dmSans.variable} ${InterFont.variable}`}>
                <TopHeader />
                <Header />
                <main>{children}</main>
            </body>
        </html>
    );
}
