import { Router } from "express";
import { ingestKeyword } from "../services/ingest.service.js";
import { seedKeywords } from "../utils/keywords.js";

const router = Router();

router.post("/run", async (req, res) => {
    try {
        const keywords =
            Array.isArray(req.body?.keywords) && req.body.keywords.length
                ? req.body.keywords
                : seedKeywords;

        const results = [];

        for (const keyword of keywords) {
            const trimmed = String(keyword).trim();
            if (!trimmed) continue;

            const result = await ingestKeyword(trimmed);
            results.push(result);
        }

        res.json({
            message: "Ingest complete",
            count: results.length,
            results,
        });
    } catch (error) {
        console.error("Ingest route error:", error);
        res.status(500).json({
            error: "Failed to process keywords",
        });
    }
});

export default router;