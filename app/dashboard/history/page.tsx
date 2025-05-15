import { Button, buttonVariants } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, ArrowUpDown ,Eye} from 'lucide-react';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

import { getAllGeneratedContent } from '@/actions/dashboard-actions';
import Link from 'next/link';

interface ContentFormData {
    topic: string;
    contentType: 'linkedin-post' | 'blog-post' | 'product-description';
    keywords?: string[];
    platform?: string;
    tone_of_voice: string;
    target_audience: string;
    contentGoal?: string;
}

interface UserGeneratedContent {
    _id: string;
    userId: string;
    inputMetadata: ContentFormData;
    generatedContent: string;
    createdAt: Date;
    updatedAt: Date;
    seoScore?: number;
    keywordDensity?: number;
    wordCount?: number;
    readability?: number;
    topKeywords?: { keyword: string; count: number }[];
}

export default async function HistoryPage() {
    const response = await getAllGeneratedContent();

    // Handle potential errors from the server action
    if (!response?.success) {
        return (
            <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-7xl mx-auto">
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error loading content</AlertTitle>
                    <AlertDescription>
                        {response?.message ||
                            'Failed to load your generated content. Please try again later.'}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const contents = (response.data as UserGeneratedContent[]) || [];

    const getContentTypeLabel = (type: string) => {
        switch (type) {
            case 'linkedin-post':
                return 'LinkedIn Post';
            case 'blog-post':
                return 'Blog Post';
            case 'product-description':
                return 'Product Description';
            default:
                return type;
        }
    };

    // Component for empty state
    const EmptyState = ({
        contentType = 'content',
    }: {
        contentType?: string;
    }) => (
        <div className="flex flex-col py-12 gap-4">
            <div className="">
                <h3 className="text-lg font-medium">No {contentType} found</h3>
                <p className="text-muted-foreground mt-1">
                    You haven&apos;t generated any {contentType} yet.
                </p>
            </div>
        </div>
    );

    // Helper component to render content cards
    const ContentCards = ({
        contents,
    }: {
        contents: UserGeneratedContent[];
    }) => (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contents.map((content) => (
                <Card
                    key={content._id.toString()}
                    className="h-full flex flex-col hover:shadow-md transition-shadow"
                >
                    <CardHeader className="pb-3 flex-1">
                        <div className="flex justify-between items-start gap-2">
                            <Badge variant="secondary">
                                {getContentTypeLabel(
                                    content.inputMetadata.contentType
                                )}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                                {format(
                                    new Date(content.createdAt),
                                    'MMM d, yyyy'
                                )}
                            </span>
                        </div>
                        <CardTitle className="line-clamp-1 text-lg mt-2">
                            {content.inputMetadata.topic}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 mt-1">
                            {content.generatedContent.substring(0, 100)}...
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                            <div className="flex items-center gap-1">
                                <span className="font-medium">
                                    {content.inputMetadata.contentType ===
                                    'blog-post'
                                        ? 'SEO'
                                        : content.inputMetadata.contentType ===
                                          'linkedin-post'
                                        ? 'Engagement'
                                        : 'Conversion'}
                                    :
                                </span>
                                <span
                                    className={
                                        (content.seoScore ?? 0) >= 90
                                            ? 'text-green-500'
                                            : (content.seoScore ?? 0) >= 80
                                            ? 'text-amber-500'
                                            : 'text-red-500'
                                    }
                                >
                                    {content.seoScore?.toString() ?? 'N/A'}%
                                </span>
                            </div>
                            <span className="text-muted-foreground">
                                {content.wordCount || 'N/A'} words
                            </span>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                        <Link
                            href={`/dashboard/content/${content._id}`}
                            className={`${buttonVariants({
                                variant: 'default',
                                size: 'sm',
                            })} w-full sm:w-auto`}
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 w-full mx-auto">
            {/* Responsive Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Content History
                    </h1>
                    <p className="text-muted-foreground">
                        View and manage your generated content
                    </p>
                </div>
                <Link
                    href={'/dashboard/new'}
                    className={`${buttonVariants({
                        variant: 'default',
                    })} w-full md:w-auto`}
                >
                    Generate New Content
                </Link>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 w-full sm:flex-row sm:items-center">
                    <div className="relative w-full sm:w-[300px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search content..."
                            className="w-full pl-8"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 sm:flex-none"
                        >
                            <Filter className="mr-2 h-4 w-4" />
                            <span className="sr-only sm:not-sr-only">
                                Filter
                            </span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 sm:flex-none"
                        >
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            <span className="sr-only sm:not-sr-only">Sort</span>
                        </Button>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList className="w-full md:w-fit overflow-x-auto py-1">
                    <div className="flex space-x-2 p-2">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="blog-post">Blog</TabsTrigger>
                        <TabsTrigger value="linkedin-post">
                            LinkedIn
                        </TabsTrigger>
                        <TabsTrigger value="product-description">
                            Products
                        </TabsTrigger>
                    </div>
                </TabsList>

                {/* All Content Tab */}
                <TabsContent value="all" className="space-y-4">
                    {contents.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <ContentCards contents={contents} />
                    )}
                </TabsContent>

                {/* Blog Posts Tab */}
                <TabsContent value="blog-post" className="space-y-4">
                    {contents.filter(
                        (c) => c.inputMetadata.contentType === 'blog-post'
                    ).length === 0 ? (
                        <EmptyState contentType="blog posts" />
                    ) : (
                        <ContentCards
                            contents={contents.filter(
                                (c) =>
                                    c.inputMetadata.contentType === 'blog-post'
                            )}
                        />
                    )}
                </TabsContent>

                {/* LinkedIn Posts Tab */}
                <TabsContent value="linkedin-post" className="space-y-4">
                    {contents.filter(
                        (c) => c.inputMetadata.contentType === 'linkedin-post'
                    ).length === 0 ? (
                        <EmptyState contentType="LinkedIn posts" />
                    ) : (
                        <ContentCards
                            contents={contents.filter(
                                (c) =>
                                    c.inputMetadata.contentType ===
                                    'linkedin-post'
                            )}
                        />
                    )}
                </TabsContent>

                {/* Product Descriptions Tab */}
                <TabsContent value="product-description" className="space-y-4">
                    {contents.filter(
                        (c) =>
                            c.inputMetadata.contentType ===
                            'product-description'
                    ).length === 0 ? (
                        <EmptyState contentType="product descriptions" />
                    ) : (
                        <ContentCards
                            contents={contents.filter(
                                (c) =>
                                    c.inputMetadata.contentType ===
                                    'product-description'
                            )}
                        />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
