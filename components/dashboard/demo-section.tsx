import type React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Laptop, Smartphone, Tablet } from 'lucide-react';
import Link from 'next/link';

export default function DemoSection() {
    return (
        <section className="py-12 border-y border-primary/10 ">
            <div className="mb-12">
                <h2 className="text-3xl font-bold mb-3 ">Demo Works</h2>
                <p className="text-muted-foreground max-w-2xl">
                    Check out examples of our content generation capabilities
                    across different topics and formats.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <DemoCard
                    icon={<Laptop className="h-10 w-10 text-primary" />}
                    title="Tech Reviews"
                    description="Detailed product reviews with technical specifications and user experience insights."
                    content="Our AI generates comprehensive tech reviews that help users make informed purchasing decisions."
                    link="/demos/tech"
                />

                <DemoCard
                    icon={<Tablet className="h-10 w-10 text-primary" />}
                    title="Educational Content"
                    description="Learning materials and educational resources for students and educators."
                    content="Create engaging educational content that simplifies complex topics for better understanding."
                    link="/demos/education"
                />

                <DemoCard
                    icon={<Smartphone className="h-10 w-10 text-primary" />}
                    title="Marketing Copy"
                    description="Persuasive marketing content optimized for conversions and engagement."
                    content="Generate SEO-friendly marketing copy that resonates with your target audience."
                    link="/demos/marketing"
                />
            </div>
        </section>
    );
}

interface DemoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    content: string;
    link: string;
}

function DemoCard({ icon, title, description, content, link }: DemoCardProps) {
    return (
        <Card className="overflow-hidden flex flex-col h-full border-primary/20 hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="pb-2">
                <div className="mb-2">{icon}</div>
                <CardTitle className="group-hover:text-primary transition-colors">
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{content}</p>
            </CardContent>

            <CardFooter className="pt-4 mt-auto border-t">
                <Link href={link} className="w-full cursor-pointer">
                    <Button
                        variant="outline"
                        className="w-full py-5 h-auto flex items-center justify-center gap-2 group-hover/button:bg-primary/5 cursor-pointer"
                    >
                        View Examples
                        <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
