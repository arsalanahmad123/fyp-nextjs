import { ServiceCard } from "./service-card";
import { ArrowRight, AwardIcon, BookIcon, BookmarkIcon, FileAudio2, LockIcon, PencilLineIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export const ServicesLayout = () => {
    return (
        <div className="max-w-[95%] mx-auto bg-theme2 rounded-tl-[40px] rounded-tr-[40px] py-10 flex flex-col justify-center items-center">
            <h6 className="text-theme font-semibold text-[15px] mb-5 max-w-7xl lg:text-center text-left">
                Descripto HELP YOU TO CREATE CONTENT FAST
            </h6>
            <h2 className="font-bold text-5xl md:text-6xl lg:text-6xl max-w-4xl md:text-center drop-shadow-lg text-white leading-20">
                Experience the full power of an AI content generator
            </h2>
            <div className="grid grid-cols-4 md:mx-52 pt-20 pb-6 gap-7">
                <div className="grid col-span-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
                    <ServiceCard
                        icon={<PencilLineIcon strokeWidth={3} />}
                        title="Article generation"
                        description="Write unique & plagiarism- free content for blogs"
                        bullets={['Blog Article Writer', 'Blog Ideas, Intros']}
                    />
                    <ServiceCard
                        icon={<LockIcon strokeWidth={3} />}
                        title="Ecommerce copy"
                        description="Write unique & plagiarism- free content for blogs"
                        bullets={['Product Descriptions', 'Product Benefits']}
                    />
                    <ServiceCard
                        icon={<BookIcon strokeWidth={3} />}
                        title="Sales copy"
                        description="Write unique & plagiarism- free content for blogs"
                        bullets={['AIDA', 'Pain-Agitate-Solution']}
                    />
                    <ServiceCard
                        icon={<BookmarkIcon strokeWidth={3} />}
                        title="Social media cont."
                        description="Write unique & plagiarism- free content for blogs"
                        bullets={['Inspiration Ideas', 'Youtube Titles']}
                    />
                    <ServiceCard
                        icon={<AwardIcon strokeWidth={3} />}
                        title="Ad copy"
                        description="Write unique & plagiarism- free content for blogs"
                        bullets={['Google Ad', 'Facebook Ad']}
                    />
                    <ServiceCard
                        icon={<FileAudio2 strokeWidth={3} />}
                        title="Startup tools"
                        description="Write unique & plagiarism- free content for blogs"
                        bullets={['Slogan Generator', 'Audience Refiner']}
                    />
                </div>
                <div className="text-white bg-theme rounded-md px-6 py-14 flex flex-col gap-2">
                    <Image
                        src={'/service_img.svg'}
                        height={170}
                        width={170}
                        alt="Service Image"
                    />
                    <h6 className="md:text-3xl text-2xl font-bold mb-2">
                        Pick a plan & fall in love!
                    </h6>
                    <p className="text-[16px] mb-2">
                        Write unique & plagiarism- free content for blogs
                    </p>
                    <Button className="px-10 py-6 bg-theme2 hover:bg-theme cursor-pointer transition duration-300 ease-in font-semibold">Sign up for free
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    );
};
