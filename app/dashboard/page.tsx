import ContentCard from '@/components/dashboard/content-card';
import DemoSection from '@/components/dashboard/demo-section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock API response - in a real app, you would fetch this data
const mockApiResponse = {
    generatedContent:
        "### Best Laptops for Students: Top Picks for Every Budget\n\nHey there! If you're a student on the hunt for a new laptop, you know how overwhelming the choices can be. Whether you're writing essays, crunching numbers, or maybe even editing videos, having the right laptop can make all the difference. So, let's dive into some of the best laptops for students, keeping both functionality and budget in mind.\n\n#### 1. **Best Overall: MacBook Air**\n",
    seoScore: 90,
    keywordDensity: '2.04',
    wordCount: 392,
    readability: 68.5,
};

// Function to extract title from markdown content
function extractTitle(content: string) {
    const titleMatch = content.match(/###\s+(.*)/);
    return titleMatch ? titleMatch[1] : 'Untitled Content';
}

// Function to extract a brief excerpt from content
function extractExcerpt(content: string, maxLength = 100) {
    // Remove markdown headers and formatting
    const plainText = content
        .replace(/#{1,6}\s+/g, '')
        .replace(/\*\*/g, '')
        .replace(/\n\n/g, ' ')
        .split('\n')[0]; // Get first paragraph

    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
}

// Create multiple content items for demonstration
const contentItems = Array(6)
    .fill(null)
    .map((_, index) => ({
        id: index + 1,
        ...mockApiResponse,
        title: extractTitle(mockApiResponse.generatedContent),
        excerpt: extractExcerpt(mockApiResponse.generatedContent),
    }));

export default function Home() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-7xl">
            <section className="mb-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold ">Generated Content</h2>
                    <Link href="/all-content" className="cursor-pointer">
                        <Button className="p-4 h-auto flex items-center gap-2 cursor-pointer font-semibold text-[16px] ">
                            View All
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contentItems.slice(0, 3).map((item) => (
                        <ContentCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            excerpt={item.excerpt}
                            seoScore={item.seoScore}
                            wordCount={item.wordCount}
                            readability={item.readability}
                        />
                    ))}
                </div>
            </section>

            <DemoSection />

            <section className="mt-16">
                <h2 className="text-3xl font-bold mb-8 ">More Content</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contentItems.slice(3, 6).map((item) => (
                        <ContentCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            excerpt={item.excerpt}
                            seoScore={item.seoScore}
                            wordCount={item.wordCount}
                            readability={item.readability}
                        />
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <Link href="/all-content">
                        <Card className="overflow-hidden ">
                            <Button
                                variant="ghost"
                                className="px-8 py-6 h-auto flex items-center gap-2 "
                            >
                                Explore All Content
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Card>
                    </Link>
                </div>
            </section>
        </main>
    );
}
