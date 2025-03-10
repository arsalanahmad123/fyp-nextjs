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
    return (
        <section className="w-full py-12 md:py-24 lg:py-20 bg-white">
            <div className="container px-4 md:px-6 m-auto">
                <div className="text-center mb-10">
                    <p className="text-sm font-medium uppercase tracking-wider text-theme">
                        WORKING PROCESS
                    </p>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-2 text-theme2">
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
                            {/* Item 1 */}
                            <AccordionItem
                                value="item-1"
                                className="border-b border-muted cursor-pointer mb-2"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-theme text-white font-medium">
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
                                                    className="p-0 h-auto mt-2 text-theme font-medium"
                                                >
                                                    Get Started{' '}
                                                    <span className="ml-1">
                                                        →
                                                    </span>
                                                </Button>
                                            </div>
                                        </AccordionContent>
                                    </div>
                                </div>
                            </AccordionItem>

                            {/* Item 2 */}
                            <AccordionItem
                                value="item-2"
                                className="border-b border-muted mb-2"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-900 text-white font-medium">
                                        2
                                    </div>
                                    <div className="flex-1">
                                        <AccordionTrigger className="text-left font-semibold text-lg py-2">
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

                            {/* Item 3 */}
                            <AccordionItem
                                value="item-3"
                                className="border-b border-muted"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-900 text-white font-medium">
                                        3
                                    </div>
                                    <div className="flex-1">
                                        <AccordionTrigger className="text-left font-semibold text-lg py-2">
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

                        {/* Button */}
                        <Button
                            className="cursor-pointer px-8 py-6 hover:bg-theme transition-colors duration-200 ease-in font-semibold"
                        >
                            <span>How it Works</span>
                            <PlayCircle className='h-6 w-6' strokeWidth={3} />
                        </Button>
                    </div>
                </div>

                {/* Counter section */}
                <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="text-center ">
                        <h3 className="text-6xl md:text-7xl lg:text-8xl font-bold">
                            0+
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
}
