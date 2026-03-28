import googleTrends from "google-trends-api";

export async function fetchSearchGrowth(keyword) {
    try {
        const raw = await googleTrends.interestOverTime({
            keyword,
            startTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
            endTime: new Date(),
            geo: "US",
        });

        const parsed = JSON.parse(raw);
        const timeline = parsed.default?.timelineData || [];

        if (timeline.length < 2) {
            return { growth: 0, points: [] };
        }

        const values = timeline.map((item) => item.value?.[0] ?? 0);
        const firstHalf = values.slice(0, Math.floor(values.length / 2));
        const secondHalf = values.slice(Math.floor(values.length / 2));

        const avg = (arr) =>
            arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

        const firstAvg = avg(firstHalf);
        const secondAvg = avg(secondHalf);

        const growth =
            firstAvg === 0
                ? secondAvg > 0
                    ? 100
                    : 0
                : ((secondAvg - firstAvg) / firstAvg) * 100;

        return {
            growth,
            points: values,
        };
    } catch (error) {
        console.error(`Google Trends failed for ${keyword}:`, error.message);
        return { growth: 0, points: [] };
    }
}