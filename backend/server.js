import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import generateRoute from "./routes/generate.js";
import historyRoutes from "./routes/history.js";

console.log(
  "OPENAI KEY STATUS:",
  process.env.OPENAI_API_KEY ? "LOADED" : "MISSING",
);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/generate", generateRoute);
app.use("/api/history", historyRoutes);

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
