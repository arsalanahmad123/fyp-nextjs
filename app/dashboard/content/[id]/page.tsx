import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getContentById } from '../../../../actions/dashboard-actions';
import { format } from 'date-fns';
import ContentEditorWrapper from '@/components/content/ContentEditorWrapper';
import ShareButton from './share-button';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const content = await getContentById(id);
    return {
        title: content?.inputMetadata.topic || 'Content Not Found',
    };
}

export default async function ContentDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const {id} = await params;
    const content = await getContentById(id);

    const contentToBePassed = JSON.parse(JSON.stringify(content));

    if (!content) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4">
                <h1 className="text-2xl font-bold">Content Not Found</h1>
                <p className="text-muted-foreground">
                    The content you&apos;re looking for doesn&apos;t exist or
                    may have been deleted.
                </p>
                <Link href="/dashboard/history">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to History
                    </Button>
                </Link>
            </div>
        );
    }

    const isEditableContentType =
        content.inputMetadata.contentType === 'blog-post' ||
        content.inputMetadata.contentType === 'linkedin-post';

    return (
        <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
            <div className="flex flex-col gap-6">
                {/* Header with back button */}
                <div className="flex items-center justify-between">
                    <Link href="/dashboard/history">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div className="flex gap-2">
                        <ShareButton />
                    </div>
                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Content title and metadata */}
                        <Card>
                            <CardHeader>
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <Badge variant="secondary">
                                        {content.inputMetadata.contentType ===
                                        'blog-post'
                                            ? 'Blog Post'
                                            : content.inputMetadata
                                                  .contentType ===
                                              'linkedin-post'
                                            ? 'LinkedIn Post'
                                            : 'Product Description'}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                        Created:{' '}
                                        {format(
                                            new Date(content.createdAt),
                                            'MMM d, yyyy'
                                        )}
                                    </span>
                                </div>
                                <CardTitle className="text-2xl sm:text-3xl">
                                    {content.inputMetadata.topic}
                                </CardTitle>
                            </CardHeader>
                        </Card>

                        <Card className="overflow-hidden">
                            <CardContent className="p-4 sm:p-6">
                                {isEditableContentType ? (
                                    <ContentEditorWrapper
                                        content={contentToBePassed}
                                        contentId={id}
                                    />
                                ) : (
                                    <div
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: content.generatedContent,
                                        }}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar with stats */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        Tone of Voice
                                    </h3>
                                    <p>{content.inputMetadata.tone_of_voice}</p>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        Target Audience
                                    </h3>
                                    <p>
                                        {content.inputMetadata.target_audience}
                                    </p>
                                </div>
                                {content.inputMetadata.contentGoal && (
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Content Goal
                                        </h3>
                                        <p>
                                            {content.inputMetadata.contentGoal}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {content.inputMetadata.contentType ===
                                        'blog-post'
                                            ? 'SEO Score'
                                            : content.inputMetadata
                                                  .contentType ===
                                              'linkedin-post'
                                            ? 'Engagement Score'
                                            : 'Conversion Score'}
                                    </span>
                                    <span
                                        className={
                                            (content.seoScore ?? 0) >= 90
                                                ? 'text-green-500 font-medium'
                                                : (content.seoScore ?? 0) >= 80
                                                ? 'text-amber-500 font-medium'
                                                : 'text-red-500 font-medium'
                                        }
                                    >
                                        {content.seoScore?.toString() ?? 'N/A'}%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Word Count
                                    </span>
                                    <span>{content.wordCount ?? 'N/A'}</span>
                                </div>
                                {content.readability && (
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Readability
                                        </span>
                                        <span>
                                            {Number(
                                                content.readability
                                            ).toFixed(3)}
                                        </span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {content.topKeywords &&
                            content.topKeywords.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Top Keywords</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {content.topKeywords.map(
                                                (keyword, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="outline"
                                                    >
                                                        {keyword.keyword} (
                                                        {keyword.count})
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
