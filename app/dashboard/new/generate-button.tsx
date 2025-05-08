'use client';

import { Button } from '@/components/ui/button';

interface GenerateButtonProps {
    loading: boolean;
    onClick: () => void;
}

export function GenerateButton({ loading, onClick }: GenerateButtonProps) {
    return (
        <Button
            className="w-full py-5 text-base font-semibold bg-[var(--color-theme)] hover:bg-[var(--color-theme)]/90 mt-5"
            onClick={onClick}
            disabled={loading}
        >
            {loading ? (
                <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Generating Content...
                </>
            ) : (
                'Generate SEO Content'
            )}
        </Button>
    );
}
