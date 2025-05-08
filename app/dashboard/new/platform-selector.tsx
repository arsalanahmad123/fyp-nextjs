'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PlatformSelectorProps {
    selected: string;
    onSelect: (value: string) => void;
}

export function PlatformSelector({
    selected,
    onSelect,
}: PlatformSelectorProps) {
    const platforms = [
        { value: 'website', label: 'Website' },
        { value: 'wordpress', label: 'WordPress' },
        { value: 'shopify', label: 'Shopify' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'instagram', label: 'Instagram' },
    ];

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Platform</h3>
                <span className="text-xs text-muted-foreground">
                    Where will this content be published?
                </span>
            </div>
            <RadioGroup
                value={selected}
                onValueChange={onSelect}
                className="flex flex-wrap gap-2"
            >
                {platforms.map((platform) => (
                    <div key={platform.value} className="flex items-center">
                        <RadioGroupItem
                            value={platform.value}
                            id={platform.value}
                            className="peer sr-only"
                        />
                        <Label
                            htmlFor={platform.value}
                            className="flex cursor-pointer items-center rounded-full border border-muted bg-transparent px-3 py-1 text-xs font-normal hover:bg-muted/50 peer-data-[state=checked]:border-[var(--color-theme)] peer-data-[state=checked]:bg-[var(--color-theme)]/10 peer-data-[state=checked]:text-[var(--color-theme)]"
                        >
                            {platform.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}
