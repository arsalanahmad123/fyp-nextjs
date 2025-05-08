'use client';

import { Textarea } from '@/components/ui/textarea';
import { ContentTypeSelector } from './content-type-selector';
import { PlatformSelector } from './platform-selector';
import { AdvancedOptions } from './advanced-options';
import { Input } from '@/components/ui/input';

interface ContentFormProps {
    formData: {
        topic: string;
        contentType: string;
        keywords: string;
        platform: string;
        tone_of_voice: string;
        target_audience: string;
    };
    handleChange: (field: string, value: string | number) => void;
}

export function ContentForm({ formData, handleChange }: ContentFormProps) {
    return (
        <div className="space-y-8 mb-6">
            {/* Topic Input Field */}
            <div className="mb-10 border rounded-lg p-4 bg-card">
                <div className="mb-2">
                    <h2 className="text-lg font-semibold">
                        What would you like to create?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Enter a topic or detailed description
                    </p>
                </div>
                <Textarea
                    value={formData.topic}
                    onChange={(e) => handleChange('topic', e.target.value)}
                    placeholder="E.g., Write a blog post about the benefits of content marketing for small businesses..."
                    className="min-h-[150px] text-lg border-2 focus:border-[var(--color-theme)] transition-colors"
                />
            </div>

            {/* Keywords Input */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Keywords</h3>
                    <span className="text-xs text-muted-foreground">
                        Add relevant keywords (comma separated)
                    </span>
                </div>
                <Input
                    value={formData.keywords}
                    onChange={(e) => handleChange('keywords', e.target.value)}
                    placeholder="content marketing, small business, digital strategy, ROI"
                    className="h-10"
                />
            </div>

            {/* Content Type Selection */}
            <ContentTypeSelector
                selected={formData.contentType}
                onSelect={(value) => handleChange('contentType', value)}
            />

            {/* Platform Selection */}
            <PlatformSelector
                selected={formData.platform}
                onSelect={(value) => handleChange('platform', value)}
            />

            {/* Advanced Options */}
            <AdvancedOptions
                tone={formData.tone_of_voice}
                audience={formData.target_audience}
                onToneChange={(value) => handleChange('tone_of_voice', value)}
                onAudienceChange={(value) =>
                    handleChange('target_audience', value)
                }
            />
        </div>
    );
}
