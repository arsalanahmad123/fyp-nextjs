import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
    return (
        <section
            id="hero__main"
            className="max-h-[120svh] flex flex-col items-center w-full pt-24 container px-3 m-auto"
        >
            <h6 className="text-theme font-semibold text-[15px] mb-5 max-w-7xl lg:text-center text-left">
                Create High-Impact Content in Seconds—Powered by AI, Perfected
                by You
            </h6>
            <div className="absolute -z-10 md:top-1/2 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                    src={'/heroBg.svg'}
                    height={900}
                    width={900}
                    alt="Hero image"
                    className="opacity-80"
                />
            </div>
            <h1 className="font-bold text-5xl md:text-6xl lg:text-8xl max-w-5xl md:text-center drop-shadow-lg text-theme2 ">
                Effortless SEO Content Generation
            </h1>
            <p className="text-theme2 font-medium text-[18px] mt-5 mb-7">
                Create high-quality content with ease. Join the #1 platform for
                smarter writing.
            </p>
            <Button className="p-6 cursor-pointer hover:bg-theme transition duration-300 ease-in">
                <Link href={'#'} className="font-semibold text-[15px]">
                    Sign up for free
                </Link>
                <ArrowRight strokeWidth={4} />
            </Button>
            <Image
                src={'/banner_img.svg'}
                height={1000}
                width={1000}
                alt="Banner image"
                className="mt-10"
            />
        </section>
    );
};
