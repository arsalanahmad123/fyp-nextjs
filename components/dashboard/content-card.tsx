import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Star } from 'lucide-react';
import Link from 'next/link';

interface ContentCardProps {
    id: number;
    title: string;
    excerpt: string;
    seoScore: number;
    wordCount: number;
    readability: number;
}

export default function ContentCard({
    id,
    title,
    excerpt,
    seoScore,
    wordCount,
    readability,
}: ContentCardProps) {
    return (
        <Link href={`/content/${id}`} className="block h-full">
            <Card className="h-full overflow-hidden bg-theme group hover:bg-theme2 border-none hover:border-gray-100 transition-colors duration-300 ease-in">
                <CardHeader className="pb-2 relative">
                    <div className="w-12 h-1 bg-theme2 group-hover:bg-theme mb-2 rounded-full" />
                    <CardTitle className="text-xl line-clamp-2 text-white transition-colors">
                        {title}
                    </CardTitle>
                </CardHeader>

                <CardContent className="relative">
                    <p className="text-white/90 line-clamp-3 mb-6 text-sm ">
                        {excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        <Badge
                            variant="secondary"
                            className="flex items-center gap-1 bg-slate-100  group-hover:bg-white transition-colors duration-500 ease-in"
                        >
                            <Star className="h-3 w-3 text-primary" />
                            <span>SEO: {seoScore}</span>
                        </Badge>
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1 text-white"
                        >
                            <FileText className="h-3 w-3" />
                            <span>{wordCount} words</span>
                        </Badge>
                    </div>
                </CardContent>

                <CardFooter className="pt-2 text-xs text-muted-foreground border-t mt-auto relative">
                    <div className="flex justify-between items-center w-full font-semibold">
                        <span className="text-theme2 group-hover:text-theme">
                            Readability score: {readability}
                        </span>
                        <span className="text-theme2 group-hover:text-theme group-hover:translate-x-1 transition-all">
                            Read more →
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}