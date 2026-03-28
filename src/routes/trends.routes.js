import { Router } from "express";
import { prisma } from "../db/prisma.js";

const router = Router();

router.get("/", async (req, res) => {
    const trends = await prisma.productTrend.findMany({
        orderBy: { trendScore: "desc" },
        take: 20,
    });

    res.json(trends);
});

export default router;