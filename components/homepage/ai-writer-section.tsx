'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export const AIWriterSection = () => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); 
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5, 
            }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            const targetValue = 100; 
            const duration = 3000; 
            const startTime = performance.now();

            const easeOutQuad = (t: number) => {
                return t * (2 - t);
            };

            const updateCount = (currentTime: number) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = easeOutQuad(progress); 
                const currentCount = Math.floor(easedProgress * targetValue);

                setCount(currentCount);

                if (progress < 1) {
                    requestAnimationFrame(updateCount); 
                } else {
                    setCount(targetValue); 
                }
            };

            requestAnimationFrame(updateCount);
        }
    }, [isVisible]);

    return (
        <section className="w-full py-12 md:py-24 lg:py-20 bg-white">
            <div className="container px-4 md:px-6 m-auto">
                <div className="text-center mb-10">
                    <p className="text-sm font-medium uppercase tracking-wider text-theme">
                        WORKING PROCESS
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 text-theme2">
                        How Ai writer works
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5  items-center">
                    <Image
                        src="/ai-writer.svg"
                        alt="AI Writer Interface"
                        width={600}
                        height={600}
                        className="rounded-lg"
                    />

                    {/* Right side - Accordion */}
                    <div className="space-y-6">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            defaultValue="item-1"
                        >
                            <AccordionItem
                                value="item-1"
                                className="border-b border-muted mb-2"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-theme2 text-white font-medium cursor-pointer">
                                        1
                                    </div>
                                    <div className="flex-1">
                                        <AccordionTrigger className="text-left font-semibold text-lg py-2 cursor-pointer">
                                            Choose the sort of content copy you
                                            wish to create.
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="pt-2 pb-4">
                                                <p className="text-muted-foreground">
                                                    Get your thoughts to paper
                                                    faster with our step-by-step
                                                    AI copywriter.
                                                </p>
                                                <Button
                                                    variant="link"
                                                    className="p-0 h-auto mt-2 text-theme2 font-medium cursor-pointer"
                                                >
                                                    Get Started <span>→</span>
                                                </Button>
                                            </div>
                                        </AccordionContent>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem
                                value="item-2"
                                className="border-b border-muted mb-2"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-theme2 text-white font-medium cursor-pointer">
                                        2
                                    </div>
                                    <div className="flex-1">
                                        <AccordionTrigger className="text-left font-semibold text-lg py-2 cursor-pointer">
                                            Enter the specifics of your product
                                            or business.
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="pt-2 pb-4">
                                                <p className="text-muted-foreground">
                                                    Provide details about your
                                                    product or business to
                                                    generate tailored content
                                                    that matches your brand
                                                    voice and goals.
                                                </p>
                                            </div>
                                        </AccordionContent>
                                    </div>
                                </div>
                            </AccordionItem>

                            <AccordionItem
                                value="item-3"
                                className="border-b border-muted"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-theme2 text-white font-medium cursor-pointer">
                                        3
                                    </div>
                                    <div className="flex-1">
                                        <AccordionTrigger className="text-left font-semibold text-lg py-2 cursor-pointer">
                                            See how AI is used to generate
                                            creative content clones.
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="pt-2 pb-4">
                                                <p className="text-muted-foreground">
                                                    Our AI analyzes your inputs
                                                    and generates multiple
                                                    creative content variations
                                                    that you can choose from and
                                                    refine.
                                                </p>
                                            </div>
                                        </AccordionContent>
                                    </div>
                                </div>
                            </AccordionItem>
                        </Accordion>

                        <Button className="flex items-center gap-2 px-5 py-6 cursor-pointer hover:bg-theme transition-colors duration-200 ease-in font-semibold">
                            <span>How it Works</span>
                            <PlayCircle className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Counter section */}
                <div
                    ref={counterRef}
                    className="mt-20 flex flex-col md:flex-row md:items-center md:justify-center gap-6"
                >
                    <div className="md:text-center text-left">
                        <h3 className="text-6xl md:text-7xl lg:text-8xl font-bold">
                            {count}+
                        </h3>
                        <p className="text-lg md:text-xl font-medium mt-2">
                            Professional & Teams Choose Descripto
                        </p>
                    </div>
                    <div className="w-24 h-24 md:w-40 md:h-40">
                        <Image
                            src="/ai-writer-rocket.svg"
                            alt="Rocket icon"
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
