import axios from "axios";

const SUBREDDITS = [
    "Dropshipping",
    "AmazonFBA",
    "Entrepreneur",
    "BuyItForLife",
    "TikTokMadeMeBuyIt",
];

export async function fetchRedditMentions(keyword) {
    let totalMentions = 0;
    let sampleSize = 0;

    for (const subreddit of SUBREDDITS) {
        const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(
            keyword
        )}&restrict_sr=1&sort=new&t=month&limit=25`;

        try {
            const response = await axios.get(url, {
                headers: {
                    "User-Agent": "TrendRadar/1.0",
                },
                timeout: 15000,
            });

            const posts = response.data?.data?.children || [];
            totalMentions += posts.length;
            sampleSize += 25;
        } catch (error) {
            console.error(`Reddit fetch failed for ${subreddit} / ${keyword}:`, error.message);
        }
    }

    return {
        mentions: totalMentions,
        sampleSize,
    };
}