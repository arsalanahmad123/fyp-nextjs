import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const recentContent = [
    {
        id: '1',
        title: '10 SEO Tips for E-commerce',
        platform: 'Blog',
        date: '2 hours ago',
        status: 'Published',
        score: 92,
    },
    {
        id: '2',
        title: 'How to Optimize Product Pages',
        platform: 'Website',
        date: '5 hours ago',
        status: 'Draft',
        score: 85,
    },
    {
        id: '3',
        title: 'Social Media Marketing Guide',
        platform: 'Social',
        date: 'Yesterday',
        status: 'Published',
        score: 88,
    },
    {
        id: '4',
        title: 'Email Marketing Best Practices',
        platform: 'Email',
        date: '2 days ago',
        status: 'Published',
        score: 90,
    },
];

export function RecentGenerations() {
    return (
        <div className="space-y-4">
            {recentContent.map((content) => (
                <div key={content.id} className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                        <AvatarImage
                            src={`/placeholder.svg?height=36&width=36`}
                            alt={content.title}
                        />
                        <AvatarFallback>
                            {content.title.substring(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {content.title}
                        </p>
                        <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">
                                {content.platform}
                            </p>
                            <p className="text-xs text-muted-foreground">•</p>
                            <p className="text-xs text-muted-foreground">
                                {content.date}
                            </p>
                        </div>
                    </div>
                    <Badge
                        variant={
                            content.status === 'Published'
                                ? 'default'
                                : 'outline'
                        }
                    >
                        {content.status}
                    </Badge>
                </div>
            ))}
        </div>
    );
}
