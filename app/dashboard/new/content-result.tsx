'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Copy, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface ContentResultProps {
    result: {
        generatedContent?: string;
        seoScore?: number;
        keywordDensity?: number;
        wordCount?: number;
        readability?: number;
        topKeywords?: { keyword: string; count: number }[];
    };
    onBack: () => void;
    contentType: string;
}

export function ContentResult({
    result,
    onBack,
    contentType,
}: ContentResultProps) {
    const [activeTab, setActiveTab] = useState('content');

    const handleCopy = () => {
        if (result.generatedContent) {
            navigator.clipboard.writeText(result.generatedContent);
            toast('Content copied');
        }
    };

    const handleDownload = () => {
        if (result.generatedContent) {
            const element = document.createElement('a');
            const file = new Blob([result.generatedContent], {
                type: 'text/plain',
            });
            element.href = URL.createObjectURL(file);
            element.download = `seo-content-${
                new Date().toISOString().split('T')[0]
            }.md`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    };

    // Function to get score color
    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-500';
        if (score >= 70) return 'text-amber-500';
        return 'text-red-500';
    };

    // Function to get readability description
    const getReadabilityDescription = (score: number) => {
        if (score >= 80) return 'Very Easy to Read';
        if (score >= 70) return 'Easy to Read';
        if (score >= 60) return 'Standard';
        if (score >= 50) return 'Fairly Difficult';
        return 'Difficult';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <div>
                    <h2 className="text-2xl font-bold">Generated Content</h2>
                    <p className="text-sm text-muted-foreground">
                        Your {contentType} has been generated with SEO
                        optimization
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Badge className={getScoreColor(result.seoScore || 0)}>
                        SEO Score: {result.seoScore}%
                    </Badge>
                    <Badge variant="outline">{result.wordCount} words</Badge>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                    <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                </div>
            </div>

            <Tabs
                defaultValue="content"
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
            >
                <TabsList>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="seo">SEO Analysis</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="prose max-w-none dark:prose-invert whitespace-pre-wrap">
                                {result.generatedContent}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="seo" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Analysis</CardTitle>
                            <CardDescription>
                                Analysis of your content&apos;s SEO performance
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">
                                        Overall SEO Score
                                    </h3>
                                    <Badge
                                        variant="outline"
                                        className={getScoreColor(
                                            result.seoScore || 0
                                        )}
                                    >
                                        {result.seoScore}%
                                    </Badge>
                                </div>
                                <div className="h-2 w-full rounded-full bg-muted">
                                    <div
                                        className={`h-2 rounded-full ${
                                            result.seoScore &&
                                            result.seoScore >= 90
                                                ? 'bg-green-500'
                                                : result.seoScore &&
                                                  result.seoScore >= 70
                                                ? 'bg-amber-500'
                                                : 'bg-red-500'
                                        }`}
                                        style={{ width: `${result.seoScore}%` }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium mb-2">
                                            Content Statistics
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm">
                                                    Word Count
                                                </span>
                                                <Badge variant="outline">
                                                    {result.wordCount}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm">
                                                    Keyword Density
                                                </span>
                                                <Badge variant="outline">
                                                    {result.keywordDensity?.toFixed(
                                                        2
                                                    )}
                                                    %
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm">
                                                    Readability
                                                </span>
                                                <Badge variant="outline">
                                                    {getReadabilityDescription(
                                                        result.readability || 0
                                                    )}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium mb-2">
                                            Top Keywords
                                        </h3>
                                        <div className="space-y-2">
                                            {result.topKeywords?.map(
                                                (keyword, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex justify-between items-center"
                                                    >
                                                        <span className="text-sm">
                                                            {keyword.keyword}
                                                        </span>
                                                        <Badge variant="outline">
                                                            {keyword.count}{' '}
                                                            occurrences
                                                        </Badge>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-2">
                            <h3 className="font-medium">Recommendations</h3>
                            <ul className="text-sm space-y-1 list-disc pl-5">
                                {result.keywordDensity &&
                                    result.keywordDensity < 1 && (
                                        <li>
                                            Increase primary keyword density to
                                            at least 1%
                                        </li>
                                    )}
                                {result.keywordDensity &&
                                    result.keywordDensity > 3 && (
                                        <li>
                                            Reduce keyword density to avoid
                                            keyword stuffing
                                        </li>
                                    )}
                                {result.readability &&
                                    result.readability < 60 && (
                                        <li>
                                            Simplify language to improve
                                            readability
                                        </li>
                                    )}
                                {result.wordCount && result.wordCount < 300 && (
                                    <li>
                                        Add more content to improve
                                        comprehensiveness
                                    </li>
                                )}
                            </ul>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
