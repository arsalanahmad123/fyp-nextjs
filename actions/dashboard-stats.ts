'use server';
import { auth } from '@/auth';
import { connectToDatabase } from '@/lib/mongodb';
import Content from '@/models/Content';
import { startOfMonth } from 'date-fns';

export async function getDashboardStats() {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        await connectToDatabase();

        const totalContentPromise = Content.countDocuments({ userId });

        // 2. Content generated this month
        const currentMonthStart = startOfMonth(new Date());
        const contentThisMonthPromise = Content.countDocuments({
            userId,
            createdAt: { $gte: currentMonthStart },
        });

        // 3. Average word count
        const avgWordCountPromise = Content.aggregate([
            { $match: { userId } },
            { $group: { _id: null, avgWordCount: { $avg: '$wordCount' } } },
        ]);

        // 4. Average SEO score
        const avgSeoScorePromise = Content.aggregate([
            { $match: { userId } },
            { $group: { _id: null, avgSeoScore: { $avg: '$seoScore' } } },
        ]);

        // 5. Recent generations
        const recentContentPromise = Content.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('inputMetadata.topic inputMetadata.contentType createdAt');

        const monthlyPerformancePromise = Content.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    contentCount: { $sum: 1 },
                    avgSeoScore: { $avg: '$seoScore' },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        // Run all queries in parallel
        const [
            totalContent,
            contentThisMonth,
            avgWordCountRes,
            avgSeoScoreRes,
            recentContent,
            monthlyPerformance,
        ] = await Promise.all([
            totalContentPromise,
            contentThisMonthPromise,
            avgWordCountPromise,
            avgSeoScorePromise,
            recentContentPromise,
            monthlyPerformancePromise,
        ]);

        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];

        const formattedMonthlyStats = monthlyPerformance.map((item) => ({
            name: months[item._id - 1],
            content: item.contentCount,
            score: Math.round(item.avgSeoScore),
        }));


        return {
            totalContent,
            contentThisMonth,
            avgWordCount: Math.round(avgWordCountRes[0]?.avgWordCount || 0),
            avgSeoScore: Math.round(avgSeoScoreRes[0]?.avgSeoScore || 0),
            recentContent,
            monthlyPerformance: formattedMonthlyStats,
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return null;
    }
}
