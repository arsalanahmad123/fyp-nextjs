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
import { Input } from '@/components/ui/input';
import { Search, Filter, ArrowUpDown, Eye, Edit, Trash2 } from 'lucide-react';

const contentHistory = [
    {
        id: '1',
        title: '10 SEO Tips for E-commerce',
        platform: 'Blog',
        date: 'July 15, 2023',
        status: 'Published',
        score: 92,
        wordCount: 1250,
        excerpt:
            "Learn the top 10 SEO tips to boost your e-commerce website's visibility and drive more organic traffic...",
    },
    {
        id: '2',
        title: 'How to Optimize Product Pages',
        platform: 'Website',
        date: 'July 14, 2023',
        status: 'Draft',
        score: 85,
        wordCount: 980,
        excerpt:
            'Discover the best practices for optimizing your product pages to improve conversion rates and search rankings...',
    },
    {
        id: '3',
        title: 'Social Media Marketing Guide',
        platform: 'Social',
        date: 'July 12, 2023',
        status: 'Published',
        score: 88,
        wordCount: 1540,
        excerpt:
            'A comprehensive guide to social media marketing strategies that will help you grow your audience and engagement...',
    },
    {
        id: '4',
        title: 'Email Marketing Best Practices',
        platform: 'Email',
        date: 'July 10, 2023',
        status: 'Published',
        score: 90,
        wordCount: 1120,
        excerpt:
            'Learn the best practices for email marketing campaigns that drive opens, clicks, and conversions...',
    },
    {
        id: '5',
        title: 'Local SEO Guide for Small Businesses',
        platform: 'Blog',
        date: 'July 8, 2023',
        status: 'Published',
        score: 94,
        wordCount: 1680,
        excerpt:
            'A complete guide to local SEO strategies that will help small businesses improve their visibility in local search results...',
    },
    {
        id: '6',
        title: 'Content Marketing Strategy Template',
        platform: 'Website',
        date: 'July 5, 2023',
        status: 'Draft',
        score: 82,
        wordCount: 2100,
        excerpt:
            'A template for creating an effective content marketing strategy that aligns with your business goals...',
    },
];

export default function HistoryPage() {
    return (
        <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Content History
                </h1>
                <p className="text-muted-foreground">
                    View and manage your generated content
                </p>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search content..."
                            className="w-[300px] pl-8"
                        />
                    </div>
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        Sort
                    </Button>
                </div>
                <Button>Generate New Content</Button>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Content</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {contentHistory.map((content) => (
                            <Card key={content.id} className="overflow-hidden">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between">
                                        <Badge
                                            variant={
                                                content.status === 'Published'
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                        >
                                            {content.status}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <span>{content.platform}</span>
                                            <span>•</span>
                                            <span>{content.date}</span>
                                        </div>
                                    </div>
                                    <CardTitle className="line-clamp-1 text-lg">
                                        {content.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {content.excerpt}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium">
                                                    SEO Score:
                                                </span>
                                                <span
                                                    className={
                                                        content.score >= 90
                                                            ? 'text-green-500'
                                                            : content.score >=
                                                              80
                                                            ? 'text-amber-500'
                                                            : 'text-red-500'
                                                    }
                                                >
                                                    {content.score}%
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">
                                                {content.wordCount} words
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between pt-2">
                                    <Button variant="outline" size="sm">
                                        <Eye className="mr-2 h-4 w-4" />
                                        View
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">
                                                Delete
                                            </span>
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="published" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {contentHistory
                            .filter((content) => content.status === 'Published')
                            .map((content) => (
                                <Card
                                    key={content.id}
                                    className="overflow-hidden"
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between">
                                            <Badge>Published</Badge>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <span>{content.platform}</span>
                                                <span>•</span>
                                                <span>{content.date}</span>
                                            </div>
                                        </div>
                                        <CardTitle className="line-clamp-1 text-lg">
                                            {content.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {content.excerpt}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <span className="font-medium">
                                                        SEO Score:
                                                    </span>
                                                    <span
                                                        className={
                                                            content.score >= 90
                                                                ? 'text-green-500'
                                                                : content.score >=
                                                                  80
                                                                ? 'text-amber-500'
                                                                : 'text-red-500'
                                                        }
                                                    >
                                                        {content.score}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">
                                                    {content.wordCount} words
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between pt-2">
                                        <Button variant="outline" size="sm">
                                            <Eye className="mr-2 h-4 w-4" />
                                            View
                                        </Button>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Delete
                                                </span>
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                    </div>
                </TabsContent>
                <TabsContent value="drafts" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {contentHistory
                            .filter((content) => content.status === 'Draft')
                            .map((content) => (
                                <Card
                                    key={content.id}
                                    className="overflow-hidden"
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between">
                                            <Badge variant="outline">
                                                Draft
                                            </Badge>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <span>{content.platform}</span>
                                                <span>•</span>
                                                <span>{content.date}</span>
                                            </div>
                                        </div>
                                        <CardTitle className="line-clamp-1 text-lg">
                                            {content.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {content.excerpt}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <span className="font-medium">
                                                        SEO Score:
                                                    </span>
                                                    <span
                                                        className={
                                                            content.score >= 90
                                                                ? 'text-green-500'
                                                                : content.score >=
                                                                  80
                                                                ? 'text-amber-500'
                                                                : 'text-red-500'
                                                        }
                                                    >
                                                        {content.score}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">
                                                    {content.wordCount} words
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between pt-2">
                                        <Button variant="outline" size="sm">
                                            <Eye className="mr-2 h-4 w-4" />
                                            View
                                        </Button>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Delete
                                                </span>
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
