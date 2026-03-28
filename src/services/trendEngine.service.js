import { normalizeGrowth, normalizeMentions } from "../utils/normalize.js";

export function calculateTrendScore({ mentions, growth }) {
    const mentionScore = normalizeMentions(mentions);
    const growthScore = normalizeGrowth(growth);

    const trendScore = (mentionScore * 0.45) + (growthScore * 0.55);

    let status = "watch";
    if (trendScore >= 75) status = "emerging";
    if (trendScore >= 90) status = "hot";

    return {
        trendScore: Number(trendScore.toFixed(2)),
        status,
    };
}