'use client';

import type React from 'react';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    X,
    Plus,
    Tag,
    FileText,
    ShoppingBag,
    Sparkles,
    Volume2,
    Users,
    Clock,
    Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentGoalSelector } from './content-goal-selector';

interface ContentFormProps {
    formData: {
        topic: string;
        contentType: 'blog-post' | 'product-description' | 'linkedin-post';
        keywords: string[];
        toneOfVoice: string;
        targetAudience: string;
        wordLimit: number | null;
        contentGoal: 'inform' | 'sell' | 'rank-on-google' | 'educate';
    };
    handleChange: (
        field: string,
        value: string | number | string[] | null
    ) => void;
    isSubmitting?: boolean;
}

export function ContentForm({
    formData,
    handleChange,
    isSubmitting = false,
}: ContentFormProps) {
    // Tone options - simplified
    const toneOptions = [
        { value: 'professional', label: 'Professional', icon: '💼' },
        { value: 'friendly', label: 'Friendly', icon: '😊' },
        { value: 'casual', label: 'Casual', icon: '🗣️' },
        { value: 'persuasive', label: 'Persuasive', icon: '🧲' },
        { value: 'witty', label: 'Witty', icon: '😏' },
        { value: 'inspiring', label: 'Inspiring', icon: '✨' },
        { value: 'informative', label: 'Informative', icon: '📘' },
        { value: 'confident', label: 'Confident', icon: '💪' },
        { value: 'enthusiastic', label: 'Enthusiastic', icon: '🔥' },
        { value: 'empathetic', label: 'Empathetic', icon: '💖' },
        { value: 'bold', label: 'Bold', icon: '🦁' },
    ];

    // Handle keyword input
    const [keywordInput, setKeywordInput] = useState('');

    const handleAddKeyword = () => {
        if (keywordInput.trim()) {
            const newKeyword = keywordInput.trim();
            if (!formData.keywords.includes(newKeyword)) {
                handleChange('keywords', [...formData.keywords, newKeyword]);
            }
            setKeywordInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddKeyword();
        }
    };

    const handleRemoveKeyword = (keyword: string) => {
        handleChange(
            'keywords',
            formData.keywords.filter((k) => k !== keyword)
        );
    };

    // Word count options
    const wordCountOptions = [
        { value: 300, label: 'Short', desc: '~300 words', icon: Clock },
        { value: 800, label: 'Medium', desc: '~800 words', icon: Clock },
        { value: 1500, label: 'Long', desc: '~1500 words', icon: Clock },
    ];

    // Check if keywords should be disabled (for LinkedIn posts)
    const isKeywordsDisabled = formData.contentType === 'linkedin-post';

    return (
        <div className="space-y-6">
            {/* Topic Input - Full Width */}
            <Card className="overflow-hidden border border-[var(--color-theme)]/20 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[var(--color-theme)] text-white p-2 rounded-lg">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <Label
                            htmlFor="topic"
                            className="text-xl font-semibold"
                        >
                            What would you like to create?
                        </Label>
                    </div>
                    <Textarea
                        id="topic"
                        value={formData.topic}
                        onChange={(e) => handleChange('topic', e.target.value)}
                        placeholder="E.g., Write a blog post about the benefits of content marketing..."
                        className="min-h-[120px] text-base resize-none focus-visible:ring-[var(--color-theme)] border-[var(--color-theme)]/20 shadow-sm"
                        disabled={isSubmitting}
                    />
                </CardContent>
            </Card>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Content Type */}
                <Card className="overflow-hidden border border-[var(--color-theme)]/20 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-[var(--color-theme)] text-white p-2 rounded-lg">
                                <FileText className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-semibold">
                                Content Type
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    handleChange('contentType', 'blog-post')
                                }
                                disabled={isSubmitting}
                                className={`relative overflow-hidden rounded-xl p-3 sm:p-4 text-left transition-all ${
                                    formData.contentType === 'blog-post'
                                        ? 'bg-[var(--color-theme)]/10 border-2 border-[var(--color-theme)] shadow-md'
                                        : 'bg-white border-2 border-gray-100 hover:border-[var(--color-theme)]/50'
                                } ${
                                    isSubmitting
                                        ? 'opacity-70 cursor-not-allowed'
                                        : ''
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`p-2 rounded-lg ${
                                            formData.contentType === 'blog-post'
                                                ? 'bg-[var(--color-theme)] text-white'
                                                : 'bg-[var(--color-theme)]/10 text-[var(--color-theme)]'
                                        }`}
                                    >
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            Blog Post
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Long-form content
                                        </div>
                                    </div>
                                </div>
                                {formData.contentType === 'blog-post' && (
                                    <div className="absolute top-0 right-0 p-1 bg-[var(--color-theme)] text-white rounded-bl-lg">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M20 6L9 17L4 12"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    handleChange(
                                        'contentType',
                                        'linkedin-post'
                                    );
                                    // Clear keywords when switching to LinkedIn post
                                    if (formData.keywords.length > 0) {
                                        handleChange('keywords', []);
                                    }
                                }}
                                disabled={isSubmitting}
                                className={`relative overflow-hidden rounded-xl p-3 sm:p-4 text-left transition-all ${
                                    formData.contentType === 'linkedin-post'
                                        ? 'bg-[var(--color-theme)]/10 border-2 border-[var(--color-theme)] shadow-md'
                                        : 'bg-white border-2 border-gray-100 hover:border-[var(--color-theme)]/50'
                                } ${
                                    isSubmitting
                                        ? 'opacity-70 cursor-not-allowed'
                                        : ''
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`p-2 rounded-lg ${
                                            formData.contentType ===
                                            'linkedin-post'
                                                ? 'bg-[var(--color-theme)] text-white'
                                                : 'bg-[var(--color-theme)]/10 text-[var(--color-theme)]'
                                        }`}
                                    >
                                        <Linkedin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            LinkedIn
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Professional post
                                        </div>
                                    </div>
                                </div>
                                {formData.contentType === 'linkedin-post' && (
                                    <div className="absolute top-0 right-0 p-1 bg-[var(--color-theme)] text-white rounded-bl-lg">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M20 6L9 17L4 12"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    handleChange(
                                        'contentType',
                                        'product-description'
                                    )
                                }
                                disabled={isSubmitting}
                                className={`relative overflow-hidden rounded-xl p-3 sm:p-4 text-left transition-all ${
                                    formData.contentType ===
                                    'product-description'
                                        ? 'bg-[var(--color-theme)]/10 border-2 border-[var(--color-theme)] shadow-md'
                                        : 'bg-white border-2 border-gray-100 hover:border-[var(--color-theme)]/50'
                                } ${
                                    isSubmitting
                                        ? 'opacity-70 cursor-not-allowed'
                                        : ''
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`p-2 rounded-lg ${
                                            formData.contentType ===
                                            'product-description'
                                                ? 'bg-[var(--color-theme)] text-white'
                                                : 'bg-[var(--color-theme)]/10 text-[var(--color-theme)]'
                                        }`}
                                    >
                                        <ShoppingBag className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            Product
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Short description
                                        </div>
                                    </div>
                                </div>
                                {formData.contentType ===
                                    'product-description' && (
                                    <div className="absolute top-0 right-0 p-1 bg-[var(--color-theme)] text-white rounded-bl-lg">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M20 6L9 17L4 12"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Word Count - Only show for Blog Post */}
                {formData.contentType === 'blog-post' && (
                    <Card className="overflow-hidden border border-[var(--color-theme)]/20 shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-[var(--color-theme)] text-white p-2 rounded-lg">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-semibold">
                                    Word Count
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                                {wordCountOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() =>
                                            handleChange(
                                                'wordLimit',
                                                option.value
                                            )
                                        }
                                        disabled={isSubmitting}
                                        className={`relative overflow-hidden rounded-xl p-3 text-center transition-all ${
                                            formData.wordLimit === option.value
                                                ? 'bg-[var(--color-theme)]/10 border-2 border-[var(--color-theme)] shadow-md'
                                                : 'bg-white border-2 border-gray-100 hover:border-[var(--color-theme)]/50'
                                        } ${
                                            isSubmitting
                                                ? 'opacity-70 cursor-not-allowed'
                                                : ''
                                        }`}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="font-medium">
                                                {option.label}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {option.desc}
                                            </div>
                                        </div>
                                        {formData.wordLimit ===
                                            option.value && (
                                            <div className="absolute top-0 right-0 p-1 bg-[var(--color-theme)] text-white rounded-bl-lg">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M20 6L9 17L4 12"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Content Goal - For all content types */}
                <Card
                    className={`overflow-hidden border border-[var(--color-theme)]/20 shadow-sm ${
                        formData.contentType === 'blog-post'
                            ? ''
                            : 'md:col-span-2'
                    }`}
                >
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-[var(--color-theme)] text-white p-2 rounded-lg">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-semibold">
                                Content Goal
                            </h3>
                        </div>
                        <ContentGoalSelector
                            selected={formData.contentGoal}
                            onSelect={(value) =>
                                handleChange('contentGoal', value)
                            }
                            disabled={isSubmitting}
                        />
                    </CardContent>
                </Card>

                {/* Keywords - Only show if not LinkedIn post */}
                {!isKeywordsDisabled && (
                    <Card className="overflow-hidden border border-[var(--color-theme)]/20 shadow-sm md:col-span-2">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-[var(--color-theme)] text-white p-2 rounded-lg">
                                    <Tag className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-semibold">
                                    Keywords
                                </h3>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="relative flex-1">
                                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-theme)]" />
                                    <Input
                                        value={keywordInput}
                                        onChange={(e) =>
                                            setKeywordInput(e.target.value)
                                        }
                                        onKeyDown={handleKeyDown}
                                        placeholder="Add keywords and press Enter"
                                        className="pl-9 h-12 border-[var(--color-theme)]/20 focus-visible:ring-[var(--color-theme)]"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleAddKeyword}
                                    className="px-4 h-12 bg-[var(--color-theme)] text-white hover:bg-[var(--color-theme)]/90"
                                    disabled={
                                        isSubmitting || !keywordInput.trim()
                                    }
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add
                                </Button>
                            </div>

                            {/* Keywords Display */}
                            {formData.keywords.length > 0 ? (
                                <div className="flex flex-wrap gap-2 mt-3 p-3 bg-[var(--color-theme)]/5 rounded-lg border border-[var(--color-theme)]/10">
                                    {formData.keywords.map((keyword, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="flex items-center gap-1 bg-white border border-[var(--color-theme)]/20 text-[var(--color-theme)] hover:bg-[var(--color-theme)]/5 px-3 py-1.5"
                                        >
                                            {keyword}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveKeyword(keyword)
                                                }
                                                disabled={isSubmitting}
                                                className="ml-1 rounded-full hover:bg-[var(--color-theme)]/20 p-0.5"
                                            >
                                                <X className="h-3 w-3" />
                                                <span className="sr-only">
                                                    Remove
                                                </span>
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-3 p-3 bg-[var(--color-theme)]/5 rounded-lg border border-[var(--color-theme)]/10 text-center text-[var(--color-theme)] text-sm">
                                    Add keywords to improve SEO performance
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* LinkedIn post info message - Only show for LinkedIn posts */}
                {isKeywordsDisabled && (
                    <Card className="overflow-hidden border border-[var(--color-theme)]/20 shadow-sm md:col-span-2">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 p-3 bg-[var(--color-theme)]/5 rounded-lg border border-[var(--color-theme)]/10">
                                <Linkedin className="h-5 w-5 text-[var(--color-theme)]" />
                                <p className="text-[var(--color-theme2)]">
                                    LinkedIn posts don&apos;t require SEO
                                    keywords. Focus on creating engaging
                                    professional content instead.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Tone of Voice */}
                <Card className="overflow-hidden border border-[var(--color-theme)]/20 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-[var(--color-theme)] text-white p-2 rounded-lg">
                                <Volume2 className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-semibold">
                                Tone of Voice
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
                            {toneOptions.map((tone) => (
                                <button
                                    key={tone.value}
                                    type="button"
                                    onClick={() =>
                                        handleChange('toneOfVoice', tone.value)
                                    }
                                    disabled={isSubmitting}
                                    className={`relative overflow-hidden rounded-xl p-3 text-left transition-all ${
                                        formData.toneOfVoice === tone.value
                                            ? 'bg-[var(--color-theme)]/10 border-2 border-[var(--color-theme)] shadow-md'
                                            : 'bg-white border-2 border-gray-100 hover:border-[var(--color-theme)]/50'
                                    } ${
                                        isSubmitting
                                            ? 'opacity-70 cursor-not-allowed'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="">{tone.icon}</div>
                                        <div className="font-semibold">
                                            {tone.label}
                                        </div>
                                    </div>
                                    {formData.toneOfVoice === tone.value && (
                                        <div className="absolute top-0 right-0 p-1 bg-[var(--color-theme)] text-white rounded-bl-lg">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M20 6L9 17L4 12"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Target Audience - Changed to input field */}
                <Card className="overflow-hidden border border-[var(--color-theme)]/20 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-[var(--color-theme)] text-white p-2 rounded-lg">
                                <Users className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-semibold">
                                Target Audience
                            </h3>
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="targetAudience"
                                className="text-sm font-medium"
                            >
                                Who is your content for?
                            </Label>
                            <Input
                                id="targetAudience"
                                value={formData.targetAudience}
                                onChange={(e) =>
                                    handleChange(
                                        'targetAudience',
                                        e.target.value
                                    )
                                }
                                placeholder="E.g., marketing professionals, small business owners, tech enthusiasts..."
                                className="h-12 border-[var(--color-theme)]/20 focus-visible:ring-[var(--color-theme)]"
                                disabled={isSubmitting}
                            />
                            <p className="text-xs text-muted-foreground">
                                Be specific about your audience to generate more
                                targeted content
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
