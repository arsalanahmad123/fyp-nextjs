import { ServiceCard } from './service-card';
import {
    ArrowRight,
    AwardIcon,
    BookIcon,
    BookmarkIcon,
    FileAudio2,
    LockIcon,
    PencilLineIcon,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

export const ServicesLayout = () => {
    return (
        <div className="w-full max-w-[95%] mx-auto bg-theme2 rounded-tl-[40px] rounded-tr-[40px] py-10 flex flex-col justify-center items-center">
            <h6 className="text-theme font-semibold text-[15px] mb-5 max-w-7xl text-center px-4">
                Descripto HELP YOU TO CREATE CONTENT FAST
            </h6>
            <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl max-w-4xl text-center drop-shadow-lg text-white leading-tight px-4">
                Experience the full power of an AI content generator
            </h2>

            {/* Service Cards Grid */}
            <div className="w-full max-w-7xl px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 pt-20 pb-6">
                    {/* Left Side - Service Cards */}
                    <div className="grid col-span-3 grid-cols-1 md:grid-cols-3 gap-7">
                        <ServiceCard
                            icon={<PencilLineIcon strokeWidth={3} />}
                            title="Article generation"
                            description="Write unique & plagiarism-free content for blogs"
                            bullets={[
                                'Blog Article Writer',
                                'Blog Ideas, Intros',
                            ]}
                        />
                        <ServiceCard
                            icon={<LockIcon strokeWidth={3} />}
                            title="Ecommerce copy"
                            description="Write unique & plagiarism-free content for blogs"
                            bullets={[
                                'Product Descriptions',
                                'Product Benefits',
                            ]}
                        />
                        <ServiceCard
                            icon={<BookIcon strokeWidth={3} />}
                            title="Sales copy"
                            description="Write unique & plagiarism-free content for blogs"
                            bullets={['AIDA', 'Pain-Agitate-Solution']}
                        />
                        <ServiceCard
                            icon={<BookmarkIcon strokeWidth={3} />}
                            title="Social media cont."
                            description="Write unique & plagiarism-free content for blogs"
                            bullets={['Inspiration Ideas', 'Youtube Titles']}
                        />
                        <ServiceCard
                            icon={<AwardIcon strokeWidth={3} />}
                            title="Ad copy"
                            description="Write unique & plagiarism-free content for blogs"
                            bullets={['Google Ad', 'Facebook Ad']}
                        />
                        <ServiceCard
                            icon={<FileAudio2 strokeWidth={3} />}
                            title="Startup tools"
                            description="Write unique & plagiarism-free content for blogs"
                            bullets={['Slogan Generator', 'Audience Refiner']}
                        />
                    </div>

                    {/* Right Side - Call to Action Card */}
                    <div className="text-white bg-theme rounded-md px-6 py-14 flex flex-col gap-4 items-center text-center lg:col-span-1 md:col-span-3 col-span-3">
                        <Image
                            src={'/service_img.svg'}
                            height={170}
                            width={170}
                            alt="Service Image"
                            className="mb-4"
                        />
                        <h6 className="text-2xl md:text-3xl font-bold">
                            Pick a plan & fall in love!
                        </h6>
                        <p className="text-[16px] mb-4">
                            Write unique & plagiarism-free content for blogs
                        </p>
                        <Button className="px-10 py-6 bg-theme2 hover:bg-theme cursor-pointer transition duration-300 ease-in font-semibold">
                            Sign up for free
                            <ArrowRight className="ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
