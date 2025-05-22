'use client';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareButton() {
    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard
            .writeText(url)
            .then(() => {
                toast.success('Link copied!');
            })
            .catch((err) => {
                alert('Failed to copy link.');
                console.error(err);
            });
    };

    return (
        <Button variant="outline" size="sm" className='cursor-pointer' onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
        </Button>
    );
}
