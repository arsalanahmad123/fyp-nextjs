import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ContentItem {
    inputMetadata: {
        topic: string;
        contentType: string;
    };
    _id: string;
    createdAt: Date;
}

interface RecentGenerationsProps {
    data: ContentItem[];
}

export function RecentGenerations({ data }: RecentGenerationsProps) {
    return (
        <div className="space-y-4">
            {data?.map((content) => (
                <div key={content._id} className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                        <AvatarImage
                            src={`/placeholder.svg?height=36&width=36`}
                            alt={content.inputMetadata.topic}
                        />
                        <AvatarFallback>
                            {content.inputMetadata.topic
                                .slice(0, 2)
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {content.inputMetadata.topic}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {new Date(content.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <Badge variant="outline">
                        {content.inputMetadata.contentType}
                    </Badge>
                </div>
            ))}
        </div>
    );
}
