'use server';

import { connectToDatabase } from '@/lib/mongodb';
import Content from '@/models/Content';
import {auth} from "@/auth"

interface TopKeyword {
    keyword: string;
    count: number;
}

interface InputMetadata {
    topic: string;
    contentType: 'linkedin-post' | 'blog-post' | 'product-description';
    keywords?: string[]; 
    platform?: string;
    tone_of_voice: string;
    target_audience: string;
    contentGoal?: string;
}

interface CreateContentInput {
    inputMetadata: InputMetadata;
    generatedContent: string;
    seoScore?: number;
    keywordDensity?: number;
    wordCount?: number;
    readability?: number;
    topKeywords?: TopKeyword[];
}

export async function createContent(input: CreateContentInput) {

    const session = await auth();

    if (!session?.user?.id) throw new Error('User not authenticated');
    await connectToDatabase();
    const userId = session.user.id;
    const {
        inputMetadata,
        generatedContent,
        seoScore,
        keywordDensity,
        wordCount,
        readability,
        topKeywords = [],
    } = input;

    if (!userId) throw new Error('User ID is required');
    if (!inputMetadata.topic) throw new Error('Topic is required');
    if (!inputMetadata.contentType) throw new Error('Content type is required');
    if (!inputMetadata.keywords) throw new Error('Keywords are required');
    if (!inputMetadata.tone_of_voice)
        throw new Error('Tone of voice is required');
    if (!inputMetadata.target_audience)
        throw new Error('Target audience is required');
    if (!generatedContent) throw new Error('Generated content is required');

    const newContent = new Content({
        userId,
        inputMetadata: {
            topic: inputMetadata.topic,
            contentType: inputMetadata.contentType,
            keywords: inputMetadata.keywords,
            platform: inputMetadata.platform || '',
            tone_of_voice: inputMetadata.tone_of_voice,
            target_audience: inputMetadata.target_audience,
            contentGoal: inputMetadata.contentGoal || '',
        },
        generatedContent,
        seoScore,
        keywordDensity,
        wordCount,
        readability,
        topKeywords,
    });

    await newContent.save();

    return {success: true}
}
