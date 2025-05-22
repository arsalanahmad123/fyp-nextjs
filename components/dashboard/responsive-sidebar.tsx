'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResponsiveSidebarLayoutProps {
    children: React.ReactNode;
}

export function ResponsiveSidebarLayout({
    children,
}: ResponsiveSidebarLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (sidebarOpen && window.innerWidth < 1024) {
                const sidebar = document.getElementById('dashboard-sidebar');
                const toggleButton = document.getElementById('sidebar-toggle');

                if (
                    sidebar &&
                    !sidebar.contains(e.target as Node) &&
                    toggleButton &&
                    !toggleButton.contains(e.target as Node)
                ) {
                    setSidebarOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [sidebarOpen]);

    // Close sidebar when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex h-screen relative">
            {/* Mobile sidebar toggle */}
            <Button
                id="sidebar-toggle"
                variant="outline"
                size="icon"
                className="fixed top-4 left-4 z-50 lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? (
                    <X className="h-5 w-5" />
                ) : (
                    <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">
                    {sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                </span>
            </Button>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                id="dashboard-sidebar"
                className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <DashboardSidebar />
            </div>

            {/* Main content */}
            <main
                className={`flex-1 overflow-y-auto lg:p-4 p-2 transition-all duration-300 ${
                    sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'
                } pt-16 lg:pt-4`}
            >
                <div className="lg:max-w-10/12 w-full mx-auto">{children}</div>
            </main>
        </div>
    );
}
