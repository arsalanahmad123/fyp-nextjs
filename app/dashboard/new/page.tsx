'use client';

import { useState } from 'react';
import { ContentForm } from './content-form';
import { ResultModal } from './result-modal';
import { generateContent } from '../../../actions/generate-content';
import { toast } from 'sonner';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        targetAudience: 'general',
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

        setLoading(true);
        try {
            // Convert formData to the format expected by the server action
            const adaptedFormData = {
                topic: formData.topic,
                contentType: formData.contentType,
                keywords: formData.keywords.join(', '), // Convert array to comma-separated string
                platform: 'website', // Default to website since we removed the selector
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
    const handleAccept = () => {
        toast('Content accepted');
        setResult(null);
    };

    // Handle rejecting the generated content
    const handleReject = () => {
        toast('Content rejected');
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="w-full max-w-6xl mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                        Create SEO-Optimized Content
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Generate high-quality, SEO-friendly content tailored to
                        your specific needs
                    </p>
                </div>

                <ContentForm formData={formData} handleChange={handleChange} />

                <div className="mt-8 flex justify-center">
                    <Button
                        className="px-8 py-6 text-lg font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg rounded-xl"
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
                                Generate SEO Content
                            </>
                        )}
                    </Button>
                </div>

                {loading && (
                    <div className="mt-8 p-6 border rounded-xl bg-white text-center max-w-md mx-auto shadow-lg">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        <p className="mt-4 text-lg font-medium">
                            Creating SEO-optimized content...
                        </p>
                        <p className="text-muted-foreground">
                            This may take a minute or two
                        </p>
                    </div>
                )}
            </div>

            {/* Result Modal */}
            {result && (
                <ResultModal
                    result={result}
                    onClose={() => setResult(null)}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            )}
        </div>
    );
}
