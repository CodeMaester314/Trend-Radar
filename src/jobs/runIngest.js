import { seedKeywords } from "../utils/keywords.js";
import { ingestKeyword } from "../services/ingest.service.js";
import { prisma } from "../db/prisma.js";

async function main() {
    console.log("Starting ingest...");

    for (const keyword of seedKeywords) {
        try {
            console.log(`Processing: ${keyword}`);
            const result = await ingestKeyword(keyword);

            console.log("Saved:", {
                keyword: result.keyword,
                mentions: result.mentions,
                searchGrowth: result.searchGrowth,
                trendScore: result.trendScore,
                status: result.status,
            });
        } catch (error) {
            console.error(`Failed on keyword: ${keyword}`);
            console.error(error.message);
        }
    }

    console.log("Ingest complete.");
}

main()
    .catch((error) => {
        console.error("Fatal ingest error:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });