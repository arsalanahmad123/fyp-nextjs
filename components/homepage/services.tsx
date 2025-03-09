import Image from 'next/image';
import { ServicesLayout } from './services-layout';

export const Services = () => {
    return (
        <section
            id="services__main"
            className="min-h-[100svh] bg-gradient-to-r from-[#DBF1C3] to-[#DCE7E3] rounded-tl-[40px] rounded-tr-[40px] flex flex-col justify-center items-center px-5 pt-16"
        >
            <h6 className="text-[20px] font-bold mb-8 text-theme2 text-center">
                Trusted by <span className="text-theme">Content Creators</span>{' '}
                & SEO Experts
            </h6>

            {/* Brand Logos Section */}
            <div className="overflow-hidden relative w-full max-w-6xl mx-auto mb-10">
                <div className="flex animate-scroll whitespace-nowrap">
                    {/* First set of images */}
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((brand) => (
                            <Image
                                key={brand}
                                src={`/brand-${brand}.svg`}
                                width={200}
                                height={200}
                                alt={`Brand ${brand}`}
                                className="mx-4 brand-image w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
                            />
                        ))}
                    </div>
                    {/* Duplicate set of images */}
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((brand) => (
                            <Image
                                key={brand}
                                src={`/brand-${brand}.svg`}
                                width={200}
                                height={200}
                                alt={`Brand ${brand}`}
                                className="mx-4 brand-image w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Services Layout */}
            <ServicesLayout />
        </section>
    );
};
