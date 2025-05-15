import mongoose, { Schema, Document } from 'mongoose';

interface ContentFormData {
    topic: string;
    contentType: 'linkedin-post' | 'blog-post' | 'product-description';
    keywords?: string[];
    platform?: string;
    tone_of_voice: string;
    target_audience: string;
    contentGoal?: string;
}

export interface IUserGeneratedContent extends Document {
    userId: string;
    inputMetadata: ContentFormData;
    generatedContent: string;
    createdAt: Date;
    updatedAt: Date;
    seoScore?: number;
    keywordDensity?: number;
    wordCount?: number;
    readability?: number;
    topKeywords?: { keyword: string; count: number }[];
}

const UserGeneratedContentSchema: Schema = new Schema<IUserGeneratedContent>(
    {
        userId: { type: String, required: true },
        inputMetadata: {
            topic: { type: String, required: true },
            contentType: { type: String, required: true },
            keywords: [String], 
            platform: { type: String, default: '' },
            tone_of_voice: { type: String, required: true },
            target_audience: { type: String, required: true },
            contentGoal: { type: String, default: '' },
        },
        generatedContent: { type: String, required: true },
        seoScore: { type: Number },
        keywordDensity: { type: Number },
        wordCount: { type: Number },
        readability: { type: Number },
        topKeywords: [
            {
                keyword: { type: String },
                count: { type: Number },
            },
        ],
    },
    { timestamps: true,versionKey: false }
);

export default mongoose.models.Content ||
    mongoose.model<IUserGeneratedContent>(
        'Content',
        UserGeneratedContentSchema
    );
