import { prisma } from "../db/prisma.js";
import { fetchRedditMentions } from "./reddit.service.js";
import { fetchSearchGrowth } from "./googleTrends.service.js";
import { calculateTrendScore } from "./trendEngine.service.js";

export async function ingestKeyword(keyword) {
    const reddit = await fetchRedditMentions(keyword);
    const trends = await fetchSearchGrowth(keyword);

    const scoring = calculateTrendScore({
        mentions: reddit.mentions,
        growth: trends.growth,
    });

    const saved = await prisma.productTrend.create({
        data: {
            keyword,
            source: "reddit+googleTrends",
            mentions: reddit.mentions,
            searchGrowth: trends.growth,
            trendScore: scoring.trendScore,
            status: scoring.status,
            sampleSize: reddit.sampleSize,
            notes: trends.points.length ? JSON.stringify(trends.points) : null,
        },
    });

    return saved;
}