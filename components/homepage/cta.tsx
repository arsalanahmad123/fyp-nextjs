import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function CTASection() {
    return (
        <div className="px-4 sm:px-6 md:px-8 mx-auto -mt-20 mb-12 md:-mt-32 relative z-10 max-w-7xl">
            <div className="bg-black rounded-xl p-6 sm:p-8 md:px-16 lg:px-20 md:py-12 flex flex-col md:flex-row items-center gap-6 md:gap-12 relative overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.01] duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900 opacity-80"></div>

                {/* Chart Image */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex-shrink-0 z-10 transform transition-transform hover:rotate-3 duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-theme via-purple-500 to-theme2 opacity-20 rounded-full blur-xl"></div>
                    <Image
                        src="/cta_thumb.svg"
                        alt="Analytics chart"
                        width={180}
                        height={180}
                        className="object-contain drop-shadow-lg"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left z-10">
                    <p className="text-theme text-sm font-semibold uppercase tracking-wider mb-1 animate-pulse">
                        UNLOCK THE POWER
                    </p>
                    <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                        Stop wasting time &<br className="hidden md:block" />{' '}
                        money on content
                    </h3>

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 md:gap-8 mb-8 md:mb-6">
                        <div className="flex items-center gap-2 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-theme opacity-20 rounded-full blur-sm group-hover:opacity-30 transition-opacity"></div>
                                <Check
                                    className="h-5 w-5 text-theme relative z-10"
                                    strokeWidth={3}
                                />
                            </div>
                            <span className="text-white text-sm font-medium">
                                No credit card required
                            </span>
                        </div>
                        <div className="flex items-center gap-2 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-theme opacity-20 rounded-full blur-sm group-hover:opacity-30 transition-opacity"></div>
                                <Check
                                    className="h-5 w-5 text-theme relative z-10"
                                    strokeWidth={3}
                                />
                            </div>
                            <span className="text-white text-sm font-medium">
                                2,000 free words per month
                            </span>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div className="z-10 w-full md:w-auto md:absolute md:right-16 lg:right-20 md:top-1/2 md:-translate-y-1/2">
                    <Button className="w-full md:w-auto bg-white text-black transition-all duration-300 ease-in-out px-8 sm:px-10 py-6 cursor-pointer font-semibold text-[16px] hover:bg-theme hover:text-white hover:shadow-lg hover:shadow-theme/20 group">
                        Sign up for free
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-theme/10 rounded-full blur-xl"></div>
                <div className="absolute -top-20 right-20 w-40 h-40 bg-theme2/10 rounded-full blur-xl"></div>
            </div>
        </div>
    );
}
