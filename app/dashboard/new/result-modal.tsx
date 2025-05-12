'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    Copy,
    Download,
    CheckCircle,
    X,
    ThumbsUp,
    ThumbsDown,
    FileText,
    BarChart2,
    AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface ResultModalProps {
    result: {
        generatedContent?: string;
        seoScore?: number;
        keywordDensity?: number;
        wordCount?: number;
        readability?: number;
        topKeywords?: { keyword: string; count: number }[];
    } | null;
    onClose: () => void;
    onAccept: () => void;
    onReject: () => void;
}

export function ResultModal({
    result,
    onClose,
    onAccept,
    onReject,
}: ResultModalProps) {
    const [activeTab, setActiveTab] = useState('content');
    const [copied, setCopied] = useState(false);

    if (!result) return null;

    const handleCopy = () => {
        if (result.generatedContent) {
            navigator.clipboard.writeText(result.generatedContent);
            setCopied(true);
            toast('Content copied');
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        if (result.generatedContent) {
            const element = document.createElement('a');
            const file = new Blob([result.generatedContent], {
                type: 'text/plain',
            });
            element.href = URL.createObjectURL(file);
            element.download = `content-${
                new Date().toISOString().split('T')[0]
            }.md`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    };

    // Function to get score color
    const getScoreColor = (score?: number) => {
        if (!score) return 'bg-gray-500';
        if (score >= 90) return 'bg-green-500';
        if (score >= 70) return 'bg-amber-500';
        return 'bg-red-500';
    };

    const getScoreTextColor = (score?: number) => {
        if (!score) return 'text-gray-500';
        if (score >= 90) return 'text-green-500';
        if (score >= 70) return 'text-amber-500';
        return 'text-red-500';
    };

    // Check if SEO data is available
    const hasSeoData =
        result.seoScore !== undefined ||
        result.keywordDensity !== undefined ||
        result.topKeywords !== undefined;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">
                                Generated Content
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                {result.seoScore !== undefined && (
                                    <Badge
                                        className={`${getScoreColor(
                                            result.seoScore
                                        )} text-white`}
                                    >
                                        SEO: {result.seoScore}%
                                    </Badge>
                                )}
                                {result.wordCount !== undefined && (
                                    <Badge variant="outline">
                                        {result.wordCount} words
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="rounded-full hover:bg-gray-200"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-auto">
                    <Tabs
                        defaultValue="content"
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <div className="border-b sticky top-0 bg-white z-10">
                            <TabsList className="w-full justify-start h-12 bg-transparent px-4">
                                <TabsTrigger
                                    value="content"
                                    className="data-[state=active]:bg-primary/10 gap-2"
                                >
                                    <FileText className="h-4 w-4" />
                                    Content
                                </TabsTrigger>
                                {hasSeoData && (
                                    <TabsTrigger
                                        value="seo"
                                        className="data-[state=active]:bg-primary/10 gap-2"
                                    >
                                        <BarChart2 className="h-4 w-4" />
                                        SEO Analysis
                                    </TabsTrigger>
                                )}
                            </TabsList>
                        </div>

                        <div className="p-4">
                            <TabsContent
                                value="content"
                                className="mt-0 space-y-4"
                            >
                                {result.generatedContent ? (
                                    <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        {result.generatedContent}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="text-center text-gray-500">
                                            <AlertCircle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                                            <p>
                                                No content was generated. Please
                                                try again.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>

                            {hasSeoData && (
                                <TabsContent
                                    value="seo"
                                    className="mt-0 space-y-6"
                                >
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {result.seoScore !== undefined && (
                                            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-xl border border-primary/20">
                                                <div className="text-xs text-muted-foreground">
                                                    SEO Score
                                                </div>
                                                <div
                                                    className={`text-2xl font-bold ${getScoreTextColor(
                                                        result.seoScore
                                                    )}`}
                                                >
                                                    {result.seoScore}%
                                                </div>
                                            </div>
                                        )}
                                        {result.wordCount !== undefined && (
                                            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/30">
                                                <div className="text-xs text-muted-foreground">
                                                    Word Count
                                                </div>
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {result.wordCount}
                                                </div>
                                            </div>
                                        )}
                                        {result.keywordDensity !==
                                            undefined && (
                                            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 rounded-xl border border-amber-200/30">
                                                <div className="text-xs text-muted-foreground">
                                                    Keyword Density
                                                </div>
                                                <div className="text-2xl font-bold text-amber-600">
                                                    {result.keywordDensity.toFixed(
                                                        2
                                                    )}
                                                    %
                                                </div>
                                            </div>
                                        )}
                                        {result.readability !== undefined && (
                                            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-xl border border-purple-200/30">
                                                <div className="text-xs text-muted-foreground">
                                                    Readability
                                                </div>
                                                <div className="text-2xl font-bold text-purple-600">
                                                    {result.readability >= 70
                                                        ? 'Easy'
                                                        : result.readability >=
                                                          50
                                                        ? 'Medium'
                                                        : 'Hard'}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {result.topKeywords &&
                                        result.topKeywords.length > 0 && (
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 rounded-xl border border-gray-200/30">
                                                <div className="text-sm font-medium mb-3">
                                                    Top Keywords
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {result.topKeywords.map(
                                                        (keyword, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="outline"
                                                                className="bg-white border-gray-200 px-3 py-1.5 text-sm"
                                                            >
                                                                {
                                                                    keyword.keyword
                                                                }{' '}
                                                                ({keyword.count}
                                                                )
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </TabsContent>
                            )}
                        </div>
                    </Tabs>
                </div>

                <div className="border-t p-4 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex items-center gap-2">
                        {result.generatedContent && (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCopy}
                                    className="gap-1 bg-white hover:bg-gray-50"
                                >
                                    {copied ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                    {copied ? 'Copied' : 'Copy'}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="gap-1 bg-white hover:bg-gray-50"
                                >
                                    <Download className="h-4 w-4" />
                                    Download
                                </Button>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={onReject}
                            className="gap-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        >
                            <ThumbsDown className="h-4 w-4" />
                            Reject
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            onClick={onAccept}
                            className="gap-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                        >
                            <ThumbsUp className="h-4 w-4" />
                            Accept
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
