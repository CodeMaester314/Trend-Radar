import { Router } from "express";
import { ingestKeyword } from "../services/ingest.service.js";
import { seedKeywords } from "../utils/keywords.js";

const router = Router();

router.post("/run", async (req, res) => {
    const results = [];

    for (const keyword of seedKeywords) {
        const result = await ingestKeyword(keyword);
        results.push(result);
    }

    res.json({
        message: "Ingest complete",
        results,
    });
});

export default router;