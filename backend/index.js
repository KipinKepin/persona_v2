import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import "./models/index.js";

import CustomerRoutes from "./routes/CustomerRoute.js";
import PersonaRoutes from "./routes/PersonaRoute.js";
import SegmentRoutes from "./routes/SegmentRoute.js";
import RecommendationRoutes from "./routes/RecommendationRoute.js";
import RecommendationFeedbackRoutes from "./routes/RecommendationFeedbackRoute.js";
import RecommendationHistoryRoutes from "./routes/RecommendationHistoryRoute.js";

const app = express();

(async () => {
  await db.sync();
})();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

app.use(CustomerRoutes);
app.use(PersonaRoutes);
app.use(SegmentRoutes);
app.use(RecommendationHistoryRoutes);
app.use(RecommendationRoutes);
app.use(RecommendationFeedbackRoutes);

app.listen(5000, () => console.log("Server running at port 5000"));
