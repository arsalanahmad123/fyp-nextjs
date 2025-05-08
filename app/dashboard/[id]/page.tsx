import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Copy, Download, Edit, Share2 } from 'lucide-react';
import Link from 'next/link';

export default async function ContentDetailPage({ params }: { params: Promise<{ id: string }> ;}) {


    const { id } = await params;
    // This would normally fetch the content based on the ID
    const content = {
        id,
        title: '10 SEO Tips for E-commerce',
        platform: 'Blog',
        date: 'July 15, 2023',
        status: 'Published',
        score: 92,
        wordCount: 1250,
        excerpt:
            "Learn the top 10 SEO tips to boost your e-commerce website's visibility and drive more organic traffic...",
        content: `
      <h1>10 SEO Tips for E-commerce</h1>
      
      <p>Search Engine Optimization (SEO) is crucial for e-commerce websites to increase visibility, drive organic traffic, and boost sales. Here are 10 effective SEO tips specifically for e-commerce websites:</p>
      
      <h2>1. Optimize Product Pages</h2>
      <p>Each product page should have unique, detailed descriptions that include relevant keywords. Avoid using manufacturer descriptions as they create duplicate content issues. Include product specifications, benefits, and use cases.</p>
      
      <h2>2. Implement a Clear Site Structure</h2>
      <p>Organize your products into logical categories and subcategories. This helps search engines understand your site and improves user navigation. Implement breadcrumbs to show users their location within your site hierarchy.</p>
      
      <h2>3. Use Schema Markup</h2>
      <p>Implement product schema markup to provide search engines with detailed information about your products, including prices, availability, and reviews. This can lead to rich snippets in search results, increasing click-through rates.</p>
      
      <h2>4. Optimize Site Speed</h2>
      <p>Site speed is a critical ranking factor and affects user experience. Compress images, leverage browser caching, minimize code, and consider using a Content Delivery Network (CDN) to improve loading times.</p>
      
      <h2>5. Create a Mobile-Friendly Experience</h2>
      <p>With mobile commerce growing rapidly, ensure your e-commerce site is responsive and provides an excellent mobile shopping experience. Google prioritizes mobile-friendly websites in its rankings.</p>
      
      <h2>6. Implement User-Generated Content</h2>
      <p>Encourage customer reviews and questions. User-generated content adds fresh, unique content to your pages and includes natural keyword variations that might be missed in your product descriptions.</p>
      
      <h2>7. Optimize URLs</h2>
      <p>Create clean, descriptive URLs that include relevant keywords. Avoid parameter-heavy URLs that are difficult for users and search engines to understand.</p>
      
      <h2>8. Address Duplicate Content</h2>
      <p>E-commerce sites often struggle with duplicate content due to similar products, filtering options, and pagination. Use canonical tags to indicate the preferred version of a page to search engines.</p>
      
      <h2>9. Create Valuable Content</h2>
      <p>Develop a content strategy that includes blog posts, buying guides, and how-to articles related to your products. This helps target informational queries and establishes your site as an authority in your niche.</p>
      
      <h2>10. Build Quality Backlinks</h2>
      <p>Earn backlinks from reputable sites in your industry through content marketing, outreach, and partnerships. Quality backlinks signal to search engines that your site is trustworthy and authoritative.</p>
      
      <p>Implementing these SEO strategies will help improve your e-commerce website's visibility in search results, drive more qualified traffic, and ultimately increase conversions and sales.</p>
    `,
        keywords: [
            'e-commerce SEO',
            'product page optimization',
            'site structure',
            'schema markup',
            'site speed',
            'mobile-friendly',
            'user-generated content',
            'URL optimization',
            'duplicate content',
            'content marketing',
            'backlinks',
        ],
        seoAnalysis: {
            title: 'Good title length and keyword usage',
            description: 'Meta description could be more compelling',
            headings: 'Good H1, H2 structure with keywords',
            content: 'Good keyword density and readability',
            images: 'All images have descriptive alt text',
            links: 'Internal linking could be improved',
            overall: 'Strong content with minor improvements needed',
        },
    };

    return (
        <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/history">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {content.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{content.platform}</span>
                        <span>•</span>
                        <span>{content.date}</span>
                        <span>•</span>
                        <span>{content.wordCount} words</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <Badge
                    variant={
                        content.status === 'Published' ? 'default' : 'outline'
                    }
                    className="px-3 py-1 text-sm"
                >
                    {content.status}
                </Badge>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <Button variant="outline" size="sm">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                    <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                </div>
            </div>

            <Separator />

            <Tabs defaultValue="content" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="seo">SEO Analysis</TabsTrigger>
                    <TabsTrigger value="keywords">Keywords</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div
                                className="prose max-w-none dark:prose-invert"
                                dangerouslySetInnerHTML={{
                                    __html: content.content,
                                }}
                            />
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
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium">
                                            Overall SEO Score
                                        </h3>
                                        <Badge
                                            variant="outline"
                                            className="text-green-500"
                                        >
                                            {content.score}%
                                        </Badge>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted">
                                        <div
                                            className="h-2 rounded-full bg-green-500"
                                            style={{
                                                width: `${content.score}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                {Object.entries(content.seoAnalysis).map(
                                    ([key, value]) => (
                                        <div
                                            key={key}
                                            className="grid grid-cols-3 gap-4"
                                        >
                                            <div className="font-medium capitalize">
                                                {key}
                                            </div>
                                            <div className="col-span-2 text-muted-foreground">
                                                {value}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="keywords" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Keywords</CardTitle>
                            <CardDescription>
                                Target keywords and their usage in your content
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {content.keywords.map((keyword) => (
                                    <Badge key={keyword} variant="secondary">
                                        {keyword}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
