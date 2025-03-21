import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm transition-opacity duration-300">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <Loader2 className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform text-primary animate-spin sm:h-10 sm:w-10" />
                </div>
                <p className="mt-4 text-base font-medium text-primary sm:text-lg">
                    Loading
                    <span className="inline-flex animate-pulse">
                        <span className="mx-[1px]">.</span>
                        <span className="mx-[1px] animate-delay-200">.</span>
                        <span className="mx-[1px] animate-delay-400">.</span>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;
