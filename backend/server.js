import dotenv from "dotenv";
import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import {
  connectDB,
  disconnectDB,
  keepConnectionAlive,
} from "./config/database.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Database connection middleware for intermittent connections
app.use(async (req, res, next) => {
  if (req.path.includes("/blogs") || req.path.includes("/blog")) {
    try {
      await connectDB();
      // Keep connection alive for ongoing requests
      keepConnectionAlive();
    } catch (error) {
      console.error("Database connection failed:", error);
      return res.status(500).json({ error: "Database connection failed" });
    }
  }
  next();
});

app.use(routes);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
