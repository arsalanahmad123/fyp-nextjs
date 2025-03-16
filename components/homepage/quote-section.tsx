export default function QuoteSection() {
    return (
        <div className="bg-theme2 min-h-[50svh] lg:min-h-[90svh] text-white py-32 flex flex-col justify-center items-center rounded-tl-[40px] rounded-tr-[40px] w-full relative overflow-hidden mt-24 -mx-5 md:mx-0">
            {/* Shadow div with a cool gradient */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-1/3 -right-2/4 z-0 transform-gpu overflow-hidden blur-3xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(66% 12%, 91% 33%, 82% 56%, 71% 78%, 50% 100%, 30% 80%, 10% 60%, 20% 40%, 33% 20%, 50% 0%, 70% 10%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[50rem] -translate-x-1/2 bg-gradient-to-tl from-theme to-theme opacity-80 sm:left-[calc(50%-30rem)] sm:w-[80rem]"
                ></div>
            </div>

            {/* Content */}
            <h2 className="text-3xl lg:text-6xl font-bold mb-10 text-center relative z-10 drop-shadow-xl">
                What Our Clients Say
            </h2>
            <p className="text-xl lg:text-3xl italic font-serif lg:max-w-4xl max-w-96 mx-auto text-center relative z-10 tracking-wide leading-relaxed">
                &quot;Descripto transformed the way we create content! The
                AI-generated articles are not just SEO-friendly but also
                <strong className="font-semibold">
                    {' '}
                    engaging and human-like
                </strong>
                . Our organic traffic has skyrocketed!&quot;
                <br />—{' '}
                <span className="font-bold leading-tight">
                    Sarah Thompson, Digital Marketer
                </span>
            </p>
        </div>
    );
}
