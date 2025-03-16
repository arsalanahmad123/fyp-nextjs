import { ArrowRight, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingSection() {
    return (
        <section className="w-full py-12 md:py-24">
            <div className="max-w-7xl px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-start space-y-4">
                    <div className="space-y-2 w-full text-center mb-10">
                        <p className="text-sm font-medium uppercase tracking-wider text-orange-500">
                            PRICING
                        </p>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                            Fast copywriting by Ai
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
                        {/* Free Plan */}
                        <div className="flex flex-col rounded-lg bg-gray-50 p-6 lg:min-h-[500px] mx-auto w-full group hover:bg-theme2 hover:text-white transition-colors duration-500 ease-in">
                            <div className="space-y-4 text-left">
                                <h3 className="text-2xl lg:text-3xl font-bold">
                                    Free Plan
                                </h3>
                                <p className="text-sm lg:text-[16px] text-muted-foreground group-hover:text-white/80">
                                    Perfect for testing
                                </p>

                                <Button
                                    className="group-hover:bg-theme justify-start py-6 font-semibold text-[16px] mt-3 cursor-pointer hover:bg-theme"
                                    variant="default"
                                >
                                    Sign up for free
                                    <ArrowRight
                                        className="ml-2 h-4 w-4"
                                        size={18}
                                    />
                                </Button>

                                <div className="mt-4 border-b-2 pb-4 group-hover:border-accent-foreground">
                                    <div className="flex items-baseline">
                                        <span className="text-2xl font-bold">
                                            Free
                                        </span>
                                        <span className="ml-2 text-sm text-muted-foreground group-hover:text-white/80">
                                            ~7 days trial
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground group-hover:text-white/80">
                                        No Credit Card Required
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-5">
                                {[
                                    '10 credits per month',
                                    '100 bonus credits for the first month',
                                    '20+ languages',
                                    '80+ copywriting tools',
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-2"
                                    >
                                        <CheckIcon className="h-5 w-5 text-orange-500 shrink-0 group-hover:text-white" />
                                        <span className="text-sm lg:text-[16px] font-semibold">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div className="flex flex-col rounded-lg bg-gray-50 p-6 lg:min-h-[500px] mx-auto w-full group hover:bg-theme2 hover:text-white transition-colors duration-500 ease-in">
                            <div className="space-y-4 text-left">
                                <h3 className="text-2xl lg:text-3xl font-bold">
                                    Pro
                                </h3>
                                <p className="text-sm lg:text-[16px] text-muted-foreground group-hover:text-white/80">
                                    Ideal for professionals
                                </p>

                                <Button
                                    className="group-hover:bg-theme justify-start py-6 font-semibold text-[16px] mt-3 cursor-pointer hover:bg-theme"
                                    variant="default"
                                >
                                    Sign up for free
                                    <ArrowRight
                                        className="ml-2 h-4 w-4"
                                        size={18}
                                    />
                                </Button>

                                <div className="mt-4 border-b-2 pb-4 group-hover:border-accent-foreground">
                                    <div className="flex items-baseline">
                                        <span className="text-2xl font-bold">
                                            $19
                                        </span>
                                        <span className="ml-2 text-sm text-muted-foreground group-hover:text-white/80">
                                            ~7 days trial
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground group-hover:text-white/80">
                                        No Credit Card Required
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-5">
                                {[
                                    '50 credits per month',
                                    '200 bonus credits for the first month',
                                    '40+ languages',
                                    '100+ copywriting tools',
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-2"
                                    >
                                        <CheckIcon className="h-5 w-5 text-orange-500 shrink-0 group-hover:text-white" />
                                        <span className="text-sm lg:text-[16px] font-semibold">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Team Plan */}
                        <div className="flex flex-col rounded-lg bg-gray-50 p-6 lg:min-h-[500px] mx-auto w-full group hover:bg-theme2 hover:text-white transition-colors duration-500 ease-in md:col-span-3 lg:col-span-1">
                            <div className="space-y-4 text-left">
                                <h3 className="text-2xl lg:text-3xl font-bold">
                                    Team
                                </h3>
                                <p className="text-sm lg:text-[16px] text-muted-foreground group-hover:text-white/80">
                                    Best for teams and agencies
                                </p>

                                <Button
                                    className="group-hover:bg-theme justify-start py-6 font-semibold text-[16px] mt-3 cursor-pointer hover:bg-theme"
                                    variant="default"
                                >
                                    Sign up for free
                                    <ArrowRight
                                        className="ml-2 h-4 w-4"
                                        size={18}
                                    />
                                </Button>

                                <div className="mt-4 border-b-2 pb-4 group-hover:border-accent-foreground">
                                    <div className="flex items-baseline">
                                        <span className="text-2xl font-bold">
                                            $29
                                        </span>
                                        <span className="ml-2 text-sm text-muted-foreground group-hover:text-white/80">
                                            ~7 days trial
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground group-hover:text-white/80">
                                        No Credit Card Required
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-5">
                                {[
                                    'Unlimited credits per month',
                                    '500 bonus credits for the first month',
                                    '60+ languages',
                                    '150+ copywriting tools',
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-2"
                                    >
                                        <CheckIcon className="h-5 w-5 text-orange-500 shrink-0 group-hover:text-white" />
                                        <span className="text-sm lg:text-[16px] font-semibold">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
