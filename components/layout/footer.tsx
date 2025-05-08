'use client';
import Link from 'next/link';
import { Facebook, Twitter, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    if (
        pathname === '/signin' ||
        pathname.startsWith('/signup') ||
        pathname.startsWith('/dashboard')
    )
        return null;

    return (
        <footer className="bg-white py-12 ">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                    {/* Logo and Social */}
                    <div className="lg:col-span-3">
                        <Link
                            href="/"
                            className="text-xl md:text-2xl font-bold mb-6 inline-block"
                        >
                            Descripto
                        </Link>

                        <div className="flex space-x-4 mt-4 mb-6">
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-theme transition-colors"
                            >
                                <Facebook size={20} />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-theme transition-colors"
                            >
                                <Twitter size={20} />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-theme transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-pinterest"
                                >
                                    <line x1="12" x2="12" y1="8" y2="16"></line>
                                    <line x1="8" x2="16" y1="12" y2="12"></line>
                                    <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                                <span className="sr-only">Pinterest</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-theme transition-colors"
                            >
                                <Github size={20} />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>

                    {/* Use Case */}
                    <div className="lg:col-span-2">
                        <h3 className="font-semibold text-lg uppercase tracking-wider mb-4">
                            USE CASE
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    Emails
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    Social Media Ads
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    Text Editing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    Copy Writing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    Creative Writing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div className="lg:col-span-2">
                        <h3 className="font-semibold text-lg uppercase tracking-wider mb-4">
                            SOLUTIONS
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    Ecommerce
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    Blogger/Vlogger
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    Small Business
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    All Solutions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="lg:col-span-2">
                        <h3 className="font-semibold text-lg uppercase tracking-wider mb-4">
                            RESOURCES
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    Knowledge Base
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    What&apos;s New
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    Roadmap
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-theme text-[16px] transition-all duration-300 ease-in"
                                >
                                    Affiliate Program
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Join Community */}
                    <div className="lg:col-span-3">
                        <h3 className="font-semibold text-lg uppercase tracking-wider mb-4">
                            JOIN COMMUNITY
                        </h3>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Input
                                    type="email"
                                    placeholder="you@domain.com"
                                    className="bg-gray-100 border-gray-200 focus:outline-0 focus:ring-0 focus:border-0 focus-visible:ring-0"
                                />
                                <Button className="whitespace-nowrap cursor-pointer">
                                    Sign up
                                </Button>
                            </div>
                            <div className="flex items-start space-x-2">
                                <Checkbox id="terms" className="mt-1" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm md:text-[15px] text-gray-500 leading-tight mt-1"
                                >
                                    I&apos;m okay with getting emails and having
                                    that activity tracked to improve my
                                    experience.
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4 md:mb-0">
                        © 2023 Contis. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        <Link
                            href="#"
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Sitemap
                        </Link>
                        <Link
                            href="#"
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Security
                        </Link>
                        <Link
                            href="#"
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Terms Of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
