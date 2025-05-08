'use client';

import { useState } from 'react';
import { ContentForm } from './content-form';
import { GenerateButton } from './generate-button';
import { LoadingPreview } from './loading-preview';
import { ContentResult } from './content-result';
import { generateContent } from '../../../actions/generate-content';
import { toast } from 'sonner';

export default function NewContentPage() {
    const [formData, setFormData] = useState({
        topic: '',
        contentType: 'blog-post',
        keywords: '',
        platform: 'website',
        tone_of_voice: 'professional',
        target_audience: 'general',
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        generatedContent?: string;
        seoScore?: number;
        keywordDensity?: number;
        wordCount?: number;
        readability?: number;
        topKeywords?: { keyword: string; count: number }[];
    } | null>(null);

    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleGenerate = async () => {
        // Validate form
        if (!formData.topic) {
            toast('Topic is required');
            return;
        }

        setLoading(true);
        try {
            const response = await generateContent(formData);

            if (response.success) {
                setResult({
                    generatedContent: response.generatedContent,
                    seoScore: response.seoScore,
                    keywordDensity: response.keywordDensity,
                    wordCount: response.wordCount,
                    readability: response.readability,
                    topKeywords: response.topKeywords,
                });
            } else {
                toast('Error generating content');
            }
        } catch (error) {
            console.error('Error generating content:', error);
            toast('Error generating content');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-10">
            <div className="w-full max-w-4xl mx-auto">
                <div className="text-left mb-6">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Generate SEO Content
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Create optimized content for your platform with AI
                    </p>
                </div>

                {!result ? (
                    <>
                        <ContentForm
                            formData={formData}
                            handleChange={handleChange}
                        />
                        <GenerateButton
                            loading={loading}
                            onClick={handleGenerate}
                        />
                        {loading && <LoadingPreview />}
                    </>
                ) : (
                    <ContentResult
                        result={result}
                        onBack={() => setResult(null)}
                        contentType={formData.contentType}
                    />
                )}
            </div>
        </div>
    );
}
