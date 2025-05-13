'use client';

import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface GenerateButtonProps {
    loading: boolean;
    onClick: () => void;
    contentType?: string;
}

export function GenerateButton({
    loading,
    onClick,
    contentType = 'SEO Content',
}: GenerateButtonProps) {
    return (
        <Button
            className="w-full py-6 text-lg font-semibold bg-[var(--color-theme)] hover:bg-[var(--color-theme)]/90 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={onClick}
            disabled={loading}
        >
            {loading ? (
                <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Generating Content...
                </>
            ) : (
                <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate{' '}
                    {contentType === 'linkedin-post'
                        ? 'LinkedIn Post'
                        : 'SEO Content'}
                </>
            )}
        </Button>
    );
}
