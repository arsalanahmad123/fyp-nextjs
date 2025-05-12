'use server';

import { openai } from '@/lib/openai';

// === INTERFACES ===
interface ContentFormData {
    topic: string;
    contentType: 'linkedin-post' | 'blog-post' | 'product-description';
    keywords: string;
    tone_of_voice: string;
    target_audience: string;
}

interface ContentGenerationResult {
    success: boolean;
    generatedContent?: string;
    seoScore?: number;
    keywordDensity?: number;
    wordCount?: number;
    readability?: number;
    topKeywords?: { keyword: string; count: number }[];
    error?: string;
}

// === LENGTH BY CONTENT TYPE ===
function getContentLength(contentType: string): {
    words: number;
    description: string;
} {
    switch (contentType) {
        case 'blog-post':
            return { words: 1000, description: 'long' };
        case 'product-description':
            return { words: 400, description: 'medium' };
        case 'linkedin-post':
            return { words: 250, description: 'short and punchy' };
        default:
            return { words: 500, description: 'medium' };
    }
}

// === SYSTEM PROMPT ===
function createSystemPrompt(data: ContentFormData): string {
    const { contentType, tone_of_voice, keywords, target_audience } = data;

    const keywordList = keywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean)
        .join(', ');

    let styleInstructions = '';

    switch (contentType) {
        case 'linkedin-post':
            styleInstructions = `
Write in a ${tone_of_voice} tone for a LinkedIn audience of ${target_audience}.

Instructions:
- Start with a line which attracts users, like it can be funny, dramatic, or anything.
- Use short, simple sentences.
- Use line breaks for better readability.
- Write in clear and simple format.
- End with a question for better engagement.
- Don't use emojis.
            `.trim();
            break;

        case 'blog-post':
            styleInstructions = `
Write a blog post in a ${tone_of_voice} tone for ${target_audience}.

Instructions:
- Use approx. 1000+ words.
- Optimize for SEO using these keywords: ${keywordList}
- Use H2, H3 headings and bullet points.
- Use simple, easy English and human language.
            `.trim();
            break;

        case 'product-description':
            styleInstructions = `
Write a product description in a ${tone_of_voice} tone for ${target_audience}.

Instructions:
- Use 300-400 words.
- Clearly highlight features and benefits.
- Include a CTA.
- Use these keywords: ${keywordList}
            `.trim();
            break;

        default:
            styleInstructions = `Write in a helpful, SEO-optimized tone using simple language.`;
    }

    return `
You are a highly skilled SEO content writer.

${styleInstructions}
    `.trim();
}

// === CONTENT ANALYSIS ===
function analyzeContent(
    content: string,
    topic: string,
    keywordsString: string
) {
    const words = content.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    const keywords = keywordsString
        .split(',')
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean);

    if (!keywords.includes(topic.toLowerCase()))
        keywords.unshift(topic.toLowerCase());

    const contentLower = content.toLowerCase();
    const keywordCounts: Record<string, number> = {};

    keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = contentLower.match(regex);
        keywordCounts[keyword] = matches ? matches.length : 0;
    });

    const primaryKeywordCount = keywordCounts[topic.toLowerCase()] || 0;
    const keywordDensity = (primaryKeywordCount / wordCount) * 100;

    const sentences = content.split(/[.!?]+/).filter((s) => s.trim());
    const avgWordsPerSentence = wordCount / sentences.length;
    const readability = 206.835 - 1.015 * avgWordsPerSentence;

    const topKeywords = Object.entries(keywordCounts)
        .map(([keyword, count]) => ({ keyword, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    return {
        wordCount,
        keywordDensity,
        readability,
        topKeywords,
    };
}

// === SEO SCORING ===
function calculateSeoScore(
    content: string,
    topic: string,
    keywords: string,
    contentType: string
): number {
    const { wordCount, keywordDensity, readability } = analyzeContent(
        content,
        topic,
        keywords
    );

    let score = 100;
    const expectedMinWords: Record<string, number> = {
        'blog-post': 800,
        'product-description': 300,
        'linkedin-post': 150,
    };

    const minWords = expectedMinWords[contentType] || 500;

    if (wordCount < minWords * 0.5) score -= 20;
    else if (wordCount < minWords) score -= 10;

    if (keywordDensity < 0.5) score -= 15;
    else if (keywordDensity < 1) score -= 10;
    else if (keywordDensity > 3) score -= 10;

    if (readability < 50) score -= 15;

    const firstPara = content.split('\n\n')[0].toLowerCase();
    if (!firstPara.includes(topic.toLowerCase())) score -= 10;

    return Math.max(0, Math.min(100, score));
}

// === MAIN GENERATOR FUNCTION ===
export async function generateContent(
    formData: ContentFormData
): Promise<ContentGenerationResult> {
    try {
        if (!formData.topic || !formData.contentType) {
            return { success: false, error: 'Missing required fields.' };
        }

        const systemPrompt = createSystemPrompt(formData);
        const { words } = getContentLength(formData.contentType);
        const targetTokens = words * 1.5;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt,
                },
                {
                    role: 'user',
                    content: formData.topic,
                },
            ],
            max_tokens: Math.min(4000, targetTokens),
            temperature: 0.7,
        });

        const generatedContent =
            response.choices[0].message.content?.trim() || '';

        const analysis = analyzeContent(
            generatedContent,
            formData.topic,
            formData.keywords
        );
        const seoScore = calculateSeoScore(
            generatedContent,
            formData.topic,
            formData.keywords,
            formData.contentType
        );

        return {
            success: true,
            generatedContent,
            seoScore,
            keywordDensity: analysis.keywordDensity,
            wordCount: analysis.wordCount,
            readability: analysis.readability,
            topKeywords: analysis.topKeywords,
        };
    } catch (error) {
        console.error('Content generation error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}
