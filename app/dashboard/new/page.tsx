'use client';

import { useState } from 'react';
import { ContentForm } from './content-form';
import { ResultModal } from './result-modal';
import { generateContent } from '../../../actions/generate-content';
import { toast } from 'sonner';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createContent } from '@/actions/create-content';

// Define the form data structure
interface ContentFormData {
    topic: string;
    contentType: 'blog-post' | 'product-description' | 'linkedin-post';
    keywords: string[];
    toneOfVoice: string;
    targetAudience: string;
    wordLimit: number | null;
    contentGoal: 'inform' | 'sell' | 'rank-on-google' | 'educate';
}

export default function NewContentPage() {




    const [formData, setFormData] = useState<ContentFormData>({
        topic: '',
        contentType: 'blog-post',
        keywords: [],
        toneOfVoice: 'professional',
        targetAudience: '',
        wordLimit: 800,
        contentGoal: 'inform',
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

    // Handle form field changes
    const handleChange = (
        field: string,
        value: string | number | string[] | null
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Handle content generation
    const handleGenerate = async () => {
        // Validate form
        if (!formData.topic) {
            toast('Topic is required');
            return;
        }

        if (!formData.targetAudience) {
            toast('Target audience is required');
            return;
        }

        setLoading(true);
        try {
            // Convert formData to the format expected by the server action
            const adaptedFormData = {
                topic: formData.topic,
                contentType: formData.contentType,
                // Only include keywords if not LinkedIn post
                keywords:
                    formData.contentType === 'linkedin-post'
                        ? ''
                        : formData.keywords.join(', '),
                tone_of_voice: formData.toneOfVoice,
                target_audience: formData.targetAudience,
            };

            const response = await generateContent(adaptedFormData);

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

    // Handle accepting the generated content
    const handleAccept = async () => {
        setLoading(true)
         if (!result?.generatedContent) {
             toast('Generated content is missing');
             setLoading(false);
             return;
         }
        const {
            topic,
            contentType,
            keywords,
            toneOfVoice,
            targetAudience,
            contentGoal,
        } = formData;

        const dataToSend = {
            inputMetadata: {
                topic,
                contentType,
                keywords,
                tone_of_voice: toneOfVoice,
                target_audience: targetAudience,
                contentGoal,
            },
            generatedContent: result?.generatedContent,
            seoScore: result?.seoScore,
            keywordDensity: result?.keywordDensity,
            wordCount: result?.wordCount,
            readability: result?.readability,
            topKeywords: result?.topKeywords,
        };

        const response = await createContent(dataToSend);
        if(response.success) toast('Content accepted');
        setResult(null);
        setLoading(false)
    };


    // Handle rejecting the generated content
    const handleReject = () => {
        setLoading(true)
        toast('Content rejected');
        setResult(null);
        setLoading(false);
    };

    return (
        <div className="h-screen pt-10 ">
            <div className="w-full mx-auto pb-20">
                <div className="mb-6 sm:mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-[var(--color-theme)]">
                        Create SEO-Optimized Content
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto px-4">
                        Generate high-quality, SEO-friendly content tailored to
                        your specific needs
                    </p>
                </div>

                <ContentForm
                    formData={formData}
                    handleChange={handleChange}
                    isSubmitting={loading}
                />

                <div className="mt-6 sm:mt-8 w-full px-4">
                    <Button
                        className="w-full sm:w-auto px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium bg-[var(--color-theme)] hover:bg-[var(--color-theme)]/90 shadow-lg rounded-xl"
                        onClick={handleGenerate}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Generating Content...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-5 w-5" />
                                Generate{' '}
                                {formData.contentType === 'linkedin-post'
                                    ? 'LinkedIn Post'
                                    : 'SEO Content'}
                            </>
                        )}
                    </Button>
                </div>

                
            </div>

            {/* Result Modal */}
            {result && (
                <ResultModal 
                    loading={loading}
                    result={result}
                    onClose={() => setResult(null)}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            )}
        </div>
    );
}
