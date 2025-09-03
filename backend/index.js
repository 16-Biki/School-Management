// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import schoolsRoutes from "./routes/schools.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve images statically
const __dirname = path.resolve();
app.use(
  "/schoolImages",
  express.static(path.join(__dirname, "public/schoolImages"))
);

// Routes
app.use("/api/schools", schoolsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
