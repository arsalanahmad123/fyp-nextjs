import Image from 'next/image';
import { ServicesLayout } from './services-layout';

export const Services = () => {
    return (
        <section
            id="services__main"
            className="min-h-[100svh] bg-gradient-to-r from-[#DBF1C3] to-[#DCE7E3] rounded-tl-[40px] rounded-tr-[40px] flex flex-col justify-center items-center px-5 pt-16"
        >
            <h6 className="text-[20px] font-bold mb-8 text-theme2">
                Trusted by <span className="text-theme">Content Creators</span>{' '}
                & SEO Experts
            </h6>

            <div className="overflow-hidden relative max-w-6xl m-auto mb-10">
                <div className="flex animate-scroll whitespace-nowrap">
                    {/* First set of images */}
                    <div className="flex">
                        <Image
                            src={'/brand-1.svg'}
                            width={200}
                            height={200}
                            alt="Brand 1"
                            className="mx-4"
                        />
                        <Image
                            src={'/brand-2.svg'}
                            width={200}
                            height={200}
                            alt="Brand 2"
                            className="mx-4"
                        />
                        <Image
                            src={'/brand-3.svg'}
                            width={200}
                            height={200}
                            alt="Brand 3"
                            className="mx-4"
                        />
                        <Image
                            src={'/brand-4.svg'}
                            width={200}
                            height={200}
                            alt="Brand 4"
                            className="mx-4"
                        />
                        <Image
                            src={'/brand-5.svg'}
                            width={200}
                            height={200}
                            alt="Brand 5"
                            className="mx-4"
                        />
                    </div>
                    {/* Duplicate set of images */}
                    <div className="flex">
                        <Image
                            src={'/brand-1.svg'}
                            width={200}
                            height={200}
                            alt="Brand 1"
                            className="mx-4"
                        />
                        <Image
                            src={'/brand-2.svg'}
                            width={200}
                            height={200}
                            alt="Brand 2"
                            className="mx-4"
                        />
                        <Image
                            src={'/brand-3.svg'}
                            width={200}
                            height={200}
                            alt="Brand 3"
                            className="mx-4"
                        />
                        <Image
                            src={'/brand-4.svg'}
                            width={200}
                            height={200}
                            alt="Brand 4"
                            className="mx-4"
                        />
                        <Image
                            src={'/brand-5.svg'}
                            width={200}
                            height={200}
                            alt="Brand 5"
                            className="mx-4"
                        />
                    </div>
                </div>
            </div>
            <ServicesLayout />
        </section>
    );
};
