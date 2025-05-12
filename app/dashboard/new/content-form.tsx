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
    InfoIcon,
    ShoppingCart,
    Search,
    GraduationCap,
    Sparkles,
    Volume2,
    Users,
    Clock,
    Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
}

export function ContentForm({ formData, handleChange }: ContentFormProps) {
    // Tone options - simplified
    const toneOptions = [
        { value: 'clear', label: 'Clear', icon: '🧠' },
        { value: 'casual', label: 'Casual', icon: '🗣️' },
        { value: 'friendly', label: 'Friendly', icon: '😊' },
        { value: 'inspiring', label: 'Inspiring', icon: '✨' },
    ];

    // Audience options - simplified
    const audienceOptions = [
        { value: 'creators', label: 'Creators', icon: '🎨' },
        { value: 'founders', label: 'Founders', icon: '🚀' },
        { value: 'shoppers', label: 'Shoppers', icon: '🛒' },
        { value: 'beginners', label: 'Beginners', icon: '🌱' },
    ];

    // Content goals
    const goals = [
        {
            value: 'inform',
            label: 'Inform',
            icon: InfoIcon,
            color: 'bg-blue-500',
        },
        {
            value: 'sell',
            label: 'Sell',
            icon: ShoppingCart,
            color: 'bg-green-500',
        },
        {
            value: 'rank-on-google',
            label: 'Rank on Google',
            icon: Search,
            color: 'bg-orange-500',
        },
        {
            value: 'educate',
            label: 'Educate',
            icon: GraduationCap,
            color: 'bg-purple-500',
        },
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
            <Card className="overflow-hidden border-none shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
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
                        className="min-h-[120px] text-base resize-none focus-visible:ring-primary border-none shadow-sm"
                    />
                </CardContent>
            </Card>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Content Type */}
                <Card className="overflow-hidden border-none shadow-lg">
                    <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-theme to-theme2 p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-white text-blue-600 p-2 rounded-lg">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">
                                    Content Type
                                </h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleChange('contentType', 'blog-post')
                                    }
                                    className={`relative overflow-hidden rounded-xl p-4 text-left transition-all ${
                                        formData.contentType === 'blog-post'
                                            ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                                            : 'bg-white border-2 border-gray-100 hover:border-blue-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 rounded-lg ${
                                                formData.contentType ===
                                                'blog-post'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-blue-100 text-blue-500'
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
                                        <div className="absolute top-0 right-0 p-1 bg-blue-500 text-white rounded-bl-lg">
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
                                    className={`relative overflow-hidden rounded-xl p-4 text-left transition-all ${
                                        formData.contentType === 'linkedin-post'
                                            ? 'bg-indigo-50 border-2 border-indigo-500 shadow-md'
                                            : 'bg-white border-2 border-gray-100 hover:border-indigo-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 rounded-lg ${
                                                formData.contentType ===
                                                'linkedin-post'
                                                    ? 'bg-indigo-500 text-white'
                                                    : 'bg-indigo-100 text-indigo-500'
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
                                    {formData.contentType ===
                                        'linkedin-post' && (
                                        <div className="absolute top-0 right-0 p-1 bg-indigo-500 text-white rounded-bl-lg">
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
                                    className={`relative overflow-hidden rounded-xl p-4 text-left transition-all ${
                                        formData.contentType ===
                                        'product-description'
                                            ? 'bg-green-50 border-2 border-green-500 shadow-md'
                                            : 'bg-white border-2 border-gray-100 hover:border-green-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 rounded-lg ${
                                                formData.contentType ===
                                                'product-description'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-green-100 text-green-500'
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
                                        <div className="absolute top-0 right-0 p-1 bg-green-500 text-white rounded-bl-lg">
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
                        </div>
                    </CardContent>
                </Card>

                {/* Word Count */}
                <Card className="overflow-hidden border-none shadow-lg">
                    <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-theme to-theme2 p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-white text-theme2 p-2 rounded-lg">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">
                                    Word Count
                                </h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-3 gap-3">
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
                                        className={`relative overflow-hidden rounded-xl p-3 text-center transition-all ${
                                            formData.wordLimit === option.value
                                                ? 'bg-purple-50 border-2 border-purple-500 shadow-md'
                                                : 'bg-white border-2 border-gray-100 hover:border-purple-200'
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
                                            <div className="absolute top-0 right-0 p-1 bg-purple-500 text-white rounded-bl-lg">
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
                        </div>
                    </CardContent>
                </Card>

                {/* Keywords - Only show if not LinkedIn post */}
                {!isKeywordsDisabled && (
                    <Card className="overflow-hidden border-none shadow-lg md:col-span-2">
                        <CardContent className="p-0">
                            <div className="bg-gradient-to-r from-theme to-theme2 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white text-amber-600 p-2 rounded-lg">
                                        <Tag className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Keywords
                                    </h3>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-theme2" />
                                        <Input
                                            value={keywordInput}
                                            onChange={(e) =>
                                                setKeywordInput(e.target.value)
                                            }
                                            onKeyDown={handleKeyDown}
                                            placeholder="Add keywords and press Enter"
                                            className="pl-9 h-12 border-theme2 focus-visible:ring-0"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={handleAddKeyword}
                                        className="px-4 h-12 text-white"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add
                                    </Button>
                                </div>

                                {/* Keywords Display */}
                                {formData.keywords.length > 0 ? (
                                    <div className="flex flex-wrap gap-2 mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                                        {formData.keywords.map(
                                            (keyword, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="secondary"
                                                    className="flex items-center gap-1 bg-white border border-theme2 text-theme hover:bg-amber-50 px-3 py-1.5"
                                                >
                                                    {keyword}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleRemoveKeyword(
                                                                keyword
                                                            )
                                                        }
                                                        className="ml-1 rounded-full hover:bg-theme2 p-0.5"
                                                    >
                                                        <X className="h-3 w-3" />
                                                        <span className="sr-only">
                                                            Remove
                                                        </span>
                                                    </button>
                                                </Badge>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100 text-center text-theme text-sm">
                                        Add keywords to improve SEO performance
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* LinkedIn post info message - Only show for LinkedIn posts */}
                {isKeywordsDisabled && (
                    <Card className="overflow-hidden border-none shadow-lg md:col-span-2">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                                <Linkedin className="h-5 w-5 text-indigo-500" />
                                <p className="text-indigo-700">
                                    LinkedIn posts don&apos;t require SEO keywords.
                                    Focus on creating engaging professional
                                    content instead.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Tone of Voice */}
                <Card className="overflow-hidden border-none shadow-lg">
                    <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-theme to-theme2 p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-white text-theme2 p-2 rounded-lg">
                                    <Volume2 className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">
                                    Tone of Voice
                                </h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-3">
                                {toneOptions.map((tone) => (
                                    <button
                                        key={tone.value}
                                        type="button"
                                        onClick={() =>
                                            handleChange(
                                                'toneOfVoice',
                                                tone.value
                                            )
                                        }
                                        className={`relative overflow-hidden rounded-xl p-3 text-left transition-all ${
                                            formData.toneOfVoice === tone.value
                                                ? 'bg-indigo-50 border-2 border-indigo-500 shadow-md'
                                                : 'bg-white border-2 border-gray-100 hover:border-indigo-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="text-xl">
                                                {tone.icon}
                                            </div>
                                            <div className="font-medium">
                                                {tone.label}
                                            </div>
                                        </div>
                                        {formData.toneOfVoice ===
                                            tone.value && (
                                            <div className="absolute top-0 right-0 p-1 bg-indigo-500 text-white rounded-bl-lg">
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
                        </div>
                    </CardContent>
                </Card>

                {/* Target Audience */}
                <Card className="overflow-hidden border-none shadow-lg">
                    <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-theme to-theme2 p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-white text-theme2 p-2 rounded-lg">
                                    <Users className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">
                                    Target Audience
                                </h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-3">
                                {audienceOptions.map((audience) => (
                                    <button
                                        key={audience.value}
                                        type="button"
                                        onClick={() =>
                                            handleChange(
                                                'targetAudience',
                                                audience.value
                                            )
                                        }
                                        className={`relative overflow-hidden rounded-xl p-3 text-left transition-all ${
                                            formData.targetAudience ===
                                            audience.value
                                                ? 'bg-pink-50 border-2 border-pink-500 shadow-md'
                                                : 'bg-white border-2 border-gray-100 hover:border-pink-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="text-xl">
                                                {audience.icon}
                                            </div>
                                            <div className="font-medium">
                                                {audience.label}
                                            </div>
                                        </div>
                                        {formData.targetAudience ===
                                            audience.value && (
                                            <div className="absolute top-0 right-0 p-1 bg-pink-500 text-white rounded-bl-lg">
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
                        </div>
                    </CardContent>
                </Card>

                {/* Conditional cards for Product Description */}
                {formData.contentType === 'product-description' && (
                    <>
                        {/* Content Goal Card - Only for Product Description */}
                        <Card className="overflow-hidden border-none shadow-lg md:col-span-2">
                            <CardContent className="p-0">
                                <div className="bg-gradient-to-r from-theme to-theme2 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white text-theme2 p-2 rounded-lg">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">
                                            Content Goal
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {goals.map((goal) => (
                                            <button
                                                key={goal.value}
                                                type="button"
                                                onClick={() =>
                                                    handleChange(
                                                        'contentGoal',
                                                        goal.value
                                                    )
                                                }
                                                className={`relative overflow-hidden rounded-xl p-3 text-center transition-all ${
                                                    formData.contentGoal ===
                                                    goal.value
                                                        ? `bg-${
                                                              goal.color.split(
                                                                  '-'
                                                              )[1]
                                                          }-50 border-2 border-${
                                                              goal.color.split(
                                                                  '-'
                                                              )[1]
                                                          }-500 shadow-md`
                                                        : 'bg-white border-2 border-gray-100 hover:border-teal-200'
                                                }`}
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <div
                                                        className={`p-2 rounded-full ${
                                                            formData.contentGoal ===
                                                            goal.value
                                                                ? goal.color +
                                                                  ' text-white'
                                                                : 'bg-gray-100 text-gray-500'
                                                        }`}
                                                    >
                                                        <goal.icon className="h-5 w-5" />
                                                    </div>
                                                    <div className="font-medium">
                                                        {goal.label}
                                                    </div>
                                                </div>
                                                {formData.contentGoal ===
                                                    goal.value && (
                                                    <div className="absolute top-0 right-0 p-1 bg-teal-500 text-white rounded-bl-lg">
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
                                </div>
                            </CardContent>
                        </Card>

                    </>
                )}
            </div>
        </div>
    );
}
