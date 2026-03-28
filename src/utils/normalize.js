export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

export function normalizeMentions(mentions) {
    return clamp(mentions / 50, 0, 1) * 100;
}

export function normalizeGrowth(growth) {
    const safe = Number.isFinite(growth) ? growth : 0;
    return clamp(safe / 100, 0, 1) * 100;
}