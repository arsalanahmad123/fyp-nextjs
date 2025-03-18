import React from 'react';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
    isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
    return (
        <div
            className={cn(
                'fixed inset-0 z-50 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-opacity duration-500',
                isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
        >
            <div className="flex flex-col items-center">
                <div className="relative">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-indigo-200 dark:border-indigo-800 border-opacity-60 animate-pulse"></div>
                    <Loader className="w-8 h-8 md:w-12 md:h-12 text-indigo-600 dark:text-indigo-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
                </div>
                <p className="mt-6 text-indigo-600 dark:text-indigo-400 font-medium animate-fade-in text-lg">
                    Loading<span className="animate-pulse">...</span>
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;