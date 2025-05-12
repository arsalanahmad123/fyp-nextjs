import mongoose, { Schema, Document } from 'mongoose';

interface ITopKeyword {
    keyword: string;
    count: number;
}

interface ISeoAnalysis {
    seoScore: number;
    keywordDensity: number;
    wordCount: number;
    readability: number;
    topKeywords: ITopKeyword[];
    suggestions: string[];
}

interface IHumanScore {
    engagementScore: number;
    emotionLevel: 'neutral' | 'engaging' | 'compelling';
    averageSentenceLength: number;
    passiveVoicePercentage: number;
    ctaIncluded: boolean;
}

interface IInputMetadata {
    topic: string;
    contentType: 'blog-post' | 'product-description';
    keywords: string[];
    platform: string;
    toneOfVoice: string;
    targetAudience: string;
    wordLimit?: number;
    competitorUrls?: string[];
    contentGoal: 'inform' | 'sell' | 'rank-on-google' | 'educate';
}

export interface IUserGeneratedContent extends Document {
    userId: string;
    inputMetadata: IInputMetadata;
    generatedContent: string;
    createdAt: Date;
    updatedAt: Date;
    seoAnalysis: ISeoAnalysis;
    humanScore?: IHumanScore;
}

const UserGeneratedContentSchema: Schema = new Schema<IUserGeneratedContent>({
    userId: {
        type: String,
        required: true
    },
    inputMetadata: {
        topic: { type: String, required: true },
        contentType: {
            type: String,
            enum: ['blog-post', 'product-description'],
            required: true,
        },
        keywords: { type: [String], default: [] },
        platform: { type: String, required: true },
        toneOfVoice: { type: String, required: true },
        targetAudience: { type: String, required: true },
        wordLimit: { type: Number },
        competitorUrls: { type: [String] },
        contentGoal: {
            type: String,
            enum: ['inform', 'sell', 'rank-on-google', 'educate'],
            required: true,
        },
    },
    generatedContent: { type: String, required: true },
    seoAnalysis: {
        seoScore: { type: Number },
        keywordDensity: { type: Number },
        wordCount: { type: Number },
        readability: { type: Number },
        topKeywords: [{ keyword: String, count: Number }],
        suggestions: [String],
    },
    humanScore: {
        engagementScore: { type: Number },
        emotionLevel: {
            type: String,
            enum: ['neutral', 'engaging', 'compelling'],
        },
        averageSentenceLength: { type: Number },
        passiveVoicePercentage: { type: Number },
        ctaIncluded: { type: Boolean },
    },
},{
    timestamps: true 
});

export default mongoose.model<IUserGeneratedContent>(
    'UserGeneratedContent',
    UserGeneratedContentSchema
);
