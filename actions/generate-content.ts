'use server';

import { openai } from '@/lib/openai';

// Update the ContentFormData interface to remove contentLength
interface ContentFormData {
    topic: string;
    contentType: string;
    keywords: string;
    platform: string;
    tone_of_voice: string;
    target_audience: string;
}

// Define the return type with all the data we'll send back
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

// Add a new function to determine content length based on content type
function getContentLengthByType(contentType: string): {
    words: number;
    description: string;
} {
    switch (contentType) {
        case 'blog-post':
            return { words: 1200, description: 'long' };
        case 'product-description':
            return { words: 400, description: 'brief' };
        case 'landing-page':
            return { words: 800, description: 'medium' };
        case 'social-post':
            return { words: 200, description: 'short' };
        case 'email':
            return { words: 500, description: 'medium' };
        case 'meta-description':
            return { words: 160, description: 'very short' };
        case 'ad-copy':
            return { words: 150, description: 'very short' };
        default:
            return { words: 800, description: 'medium' };
    }
}


function createAdvancedPrompt(formData: ContentFormData): string {
    const {
        topic,
        contentType,
        keywords,
        platform,
        tone_of_voice,
        target_audience,
    } = formData;

    const length = getContentLengthByType(contentType);

    const keywordsArray = keywords
        .split(',')
        .map((k) => k.trim())
        .filter((k) => k);

    return `
You are an expert SEO content writer. Create a ${length.description} (${
        length.words
    } words) ${contentType} on the topic "${topic}" for the ${platform} platform.

**Audience**: ${target_audience}
**Tone**: ${tone_of_voice}

**SEO Guidelines**:
- **Primary Keyword**: "${topic}" (Include in the title, first paragraph, and at least one subheading)
- **Secondary Keywords**: ${keywordsArray.join(
        ', '
    )} (Integrate naturally throughout the content)
- **Keyword Density**: Aim for 1-2% for the primary keyword
- **Semantic Variations**: Use related terms and synonyms to enhance context
- **Meta Description**: Craft a compelling meta description incorporating the primary keyword

**Formatting Instructions**:
- Use appropriate headings (H1 for title, H2/H3 for subheadings)
- Write in short paragraphs (2-4 sentences each)
- Utilize bullet points or numbered lists where applicable
- Incorporate real-life examples or scenarios to illustrate points
- Include a clear call-to-action at the end

**Content Requirements**:
- Ensure the content is original, engaging, and provides value to the reader
- Avoid keyword stuffing; maintain a natural flow
- Enhance readability by using simple language and active voice
- The content should be ready for publication without further editing

Generate the content accordingly.
`;
}


// Analyze content for SEO metrics
function analyzeContent(
    content: string,
    topic: string,
    keywordsString: string
): {
    wordCount: number;
    keywordDensity: number;
    readability: number;
    topKeywords: { keyword: string; count: number }[];
} {
    // Split content into words
    const words = content.split(/\s+/).filter((word) => word.length > 0);
    const wordCount = words.length;

    // Convert keywords string to array
    const keywords = keywordsString
        .split(',')
        .map((k) => k.trim().toLowerCase())
        .filter((k) => k);

    // Add the topic as a primary keyword if not already included
    if (!keywords.includes(topic.toLowerCase())) {
        keywords.unshift(topic.toLowerCase());
    }

    // Count keyword occurrences
    const keywordCounts: Record<string, number> = {};

    // Process each word in the content
    const contentLower = content.toLowerCase();
    keywords.forEach((keyword) => {
        // Count exact matches
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = contentLower.match(regex);
        const count = matches ? matches.length : 0;

        // Store the count
        keywordCounts[keyword] = count;
    });

    // Calculate keyword density for primary keyword (topic)
    const primaryKeywordCount = keywordCounts[topic.toLowerCase()] || 0;
    const keywordDensity = (primaryKeywordCount / wordCount) * 100;

    // Calculate readability (simplified Flesch-Kincaid)
    // This is a simplified version - a real implementation would be more complex
    const sentences = content
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 0);
    const sentenceCount = sentences.length;
    const avgWordsPerSentence = wordCount / sentenceCount;

    // Simplified readability score (higher is easier to read)
    // Real Flesch-Kincaid would include syllable counting
    const readability = 206.835 - 1.015 * avgWordsPerSentence;

    // Get top keywords by count
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

// Calculate SEO score based on content analysis
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

    // Start with a perfect score
    let score = 100;

    // Penalize based on word count (different expectations for different content types)
    const minWordCounts: Record<string, number> = {
        'blog-post': 800,
        'product-description': 300,
        'landing-page': 500,
        'social-post': 100,
        email: 200,
        'meta-description': 150,
        'ad-copy': 100,
    };

    const expectedMinWords = minWordCounts[contentType] || 500;

    if (wordCount < expectedMinWords * 0.5) score -= 25;
    else if (wordCount < expectedMinWords * 0.8) score -= 15;
    else if (wordCount < expectedMinWords) score -= 5;

    // Penalize for keyword density issues
    if (keywordDensity < 0.5) score -= 20;
    else if (keywordDensity < 1) score -= 10;
    else if (keywordDensity > 3) score -= 15;
    else if (keywordDensity > 2) score -= 5;

    // Penalize for readability issues
    if (readability < 40) score -= 20;
    else if (readability < 60) score -= 10;

    // Check for title and headings
    if (!content.includes('# ') && !content.includes('<h1>')) score -= 10;
    if (!content.includes('## ') && !content.includes('<h2>')) score -= 5;

    // Check for primary keyword in title/first paragraph
    const firstParagraph = content.split('\n\n')[0].toLowerCase();
    if (!firstParagraph.includes(topic.toLowerCase())) score -= 15;

    return Math.max(0, Math.min(100, score));
}

// Update the generateContent function to not use contentLength
export async function generateContent(
    formData: ContentFormData
): Promise<ContentGenerationResult> {
    try {
        // Validate input
        if (!formData.topic) {
            return {
                success: false,
                error: 'Topic is required',
            };
        }

        // Create the advanced prompt
        const prompt = createAdvancedPrompt(formData);

        // Calculate target token count based on content type
        const contentLength = getContentLengthByType(formData.contentType);
        const targetTokens = contentLength.words * 1.5;

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: Math.min(4000, targetTokens), // Ensure we don't exceed API limits
            temperature: 0.7, // Balance between creativity and consistency
        });

        // Extract the generated content
        const generatedContent =
            response.choices[0].message.content?.trim() || '';

        // Analyze the content for SEO metrics
        const analysis = analyzeContent(
            generatedContent,
            formData.topic,
            formData.keywords
        );

        // Calculate SEO score
        const seoScore = calculateSeoScore(
            generatedContent,
            formData.topic,
            formData.keywords,
            formData.contentType
        );

        // Return the result
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
        console.error('Error generating content:', error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'An unknown error occurred',
        };
    }
}
