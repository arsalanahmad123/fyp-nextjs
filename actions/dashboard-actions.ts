'use server';
import {auth} from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Content from "@/models/Content";
import { IUserGeneratedContent } from "@/models/Content";


export const getAllGeneratedContent = async() => {


    const session = await auth();

    if(!session?.user?.id) return {success: false, message: 'Unauthorized'}

    await connectToDatabase();

    const contents = (await Content.find({
        userId: session.user.id,
    })
        .lean()
        .exec()) as unknown as IUserGeneratedContent[];


    return {
        success: true,
        data: contents
    }
}

export const getContentById = async (id: string) => {
    try {
        await connectToDatabase();
        const content = await Content.findById(id).lean().exec();
        return content as IUserGeneratedContent | null;
    } catch (error) {
        console.error('Error fetching content:', error);
        return null;
    }
};