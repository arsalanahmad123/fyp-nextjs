'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface AdvancedOptionsProps {
    tone: string;
    audience: string;
    onToneChange: (value: string) => void;
    onAudienceChange: (value: string) => void;
}

export function AdvancedOptions({
    tone,
    audience,
    onToneChange,
    onAudienceChange,
}: AdvancedOptionsProps) {
    const [isHidden, setIsHidden] = useState(false);

    const toneOptions = [
        { value: 'professional', label: 'Professional' },
        { value: 'casual', label: 'Casual' },
        { value: 'friendly', label: 'Friendly' },
        { value: 'authoritative', label: 'Authoritative' },
        { value: 'persuasive', label: 'Persuasive' },
    ];

    const audienceOptions = [
        { value: 'general', label: 'General' },
        { value: 'beginners', label: 'Beginners' },
        { value: 'experts', label: 'Experts' },
        { value: 'business', label: 'Business Owners' },
        { value: 'technical', label: 'Technical Audience' },
    ];

    return (
        <div className="space-y-3 pt-2 border-t">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Advanced Options</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2"
                    onClick={() => setIsHidden(!isHidden)}
                >
                    {isHidden ? 'Show' : 'Hide'}
                </Button>
            </div>

            {!isHidden && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="tone" className="text-xs">
                                Tone of Voice
                            </Label>
                            <Select value={tone} onValueChange={onToneChange}>
                                <SelectTrigger
                                    id="tone"
                                    className="h-8 text-xs"
                                >
                                    <SelectValue placeholder="Select tone" />
                                </SelectTrigger>
                                <SelectContent>
                                    {toneOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label
                                htmlFor="target-audience"
                                className="text-xs"
                            >
                                Target Audience
                            </Label>
                            <Select
                                value={audience}
                                onValueChange={onAudienceChange}
                            >
                                <SelectTrigger
                                    id="target-audience"
                                    className="h-8 text-xs"
                                >
                                    <SelectValue placeholder="Select audience" />
                                </SelectTrigger>
                                <SelectContent>
                                    {audienceOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
