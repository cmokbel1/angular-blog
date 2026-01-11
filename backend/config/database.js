import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables from .env file
dotenv.config();

let isConnected = () => mongoose.connection.readyState === 1;
let connectionTimeout;

// MongoDB connection string - update with your actual MongoDB URI
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/angular-blog";

const connectDB = async () => {
  try {
    // Check if already connected (readyState 1 = connected)
    if (mongoose.connection.readyState === 1) {
      return;
    }

    // Clear any existing timeout
    if (connectionTimeout) {
      clearTimeout(connectionTimeout);
    }

    const conn = await mongoose.connect(MONGODB_URI, {});

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Connected to database: ${conn.connection.name}`);

    // Set auto-disconnect after 30 seconds of inactivity
    connectionTimeout = setTimeout(() => {
      disconnectDB();
    }, 30000);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

const disconnectDB = async () => {
  try {
    // Check if connected (readyState 1 = connected)
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    await mongoose.connection.close();
    console.log("MongoDB Disconnected");
    if (connectionTimeout) {
      clearTimeout(connectionTimeout);
      connectionTimeout = null;
    }
  } catch (error) {
    console.error("MongoDB disconnection error:", error);
  }
};

// Keep connection alive for ongoing requests
const keepConnectionAlive = () => {
  if (connectionTimeout) {
    clearTimeout(connectionTimeout);
  }
  connectionTimeout = setTimeout(() => {
    disconnectDB();
  }, 30000);
};

export { connectDB, disconnectDB, keepConnectionAlive, isConnected };
