import React from 'react';

interface ProgressBarProps {
    isLoading: boolean;
    progress: number; // number from 0 to 100
    status?: string; // optional status text below bar
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    isLoading,
    progress,
    status,
}) => {
    if (!isLoading) return null;

    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="w-96 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-theme)] via-[var(--color-theme)]/80 to-[var(--color-theme)] transition-all duration-500 ease-out"
                    style={{ width: `${clampedProgress}%` }}
                />
            </div>
            {status && (
                <p className="text-center text-[var(--color-theme)] mt-3 text-sm font-medium select-none">
                    {status}
                </p>
            )}
        </div>
    );
};

