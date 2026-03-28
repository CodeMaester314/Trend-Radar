-- CreateTable
CREATE TABLE "ProductTrend" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "keyword" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "mentions" INTEGER NOT NULL DEFAULT 0,
    "searchGrowth" REAL NOT NULL DEFAULT 0,
    "trendScore" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'watch',
    "sampleSize" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
