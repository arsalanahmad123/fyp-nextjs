'use client';

import { Button } from '@/components/ui/button';

interface ContentTypeSelectorProps {
    selected: string;
    onSelect: (value: string) => void;
}

export function ContentTypeSelector({
    selected,
    onSelect,
}: ContentTypeSelectorProps) {
    const contentTypes = [
        { value: 'blog-post', label: 'Blog Post' },
        { value: 'product-description', label: 'Product Description' },
        { value: 'landing-page', label: 'Landing Page' },
        { value: 'social-post', label: 'Social Post' },
        { value: 'email', label: 'Email' },
        { value: 'meta-description', label: 'Meta Description' },
        { value: 'ad-copy', label: 'Ad Copy' },
    ];

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Content Type</h3>
                <span className="text-xs text-muted-foreground">
                    Select the type of content
                </span>
            </div>
            <div className="flex flex-wrap gap-2">
                {contentTypes.map((type) => (
                    <Button
                        key={type.value}
                        variant={
                            selected === type.value ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => onSelect(type.value)}
                        className="rounded-full px-3 py-1 h-8 text-xs"
                    >
                        {type.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}
