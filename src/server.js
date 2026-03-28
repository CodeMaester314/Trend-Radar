import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "./config/env.js";
import trendsRoutes from "./routes/trends.routes.js";
import ingestRoutes from "./routes/ingest.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

app.use("/api/trends", trendsRoutes);
app.use("/api/ingest", ingestRoutes);

app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
});