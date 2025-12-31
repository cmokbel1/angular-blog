import mongoose from "mongoose";

let isConnected = () => mongoose.connection.readyState === "connected";
let connectionTimeout;

// MongoDB connection string - update with your actual MongoDB URI
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/angular-blog";

const connectDB = async () => {
  try {
    if (isConnected) {
      return;
    }

    // Clear any existing timeout
    if (connectionTimeout) {
      clearTimeout(connectionTimeout);
    }
    const conn = await mongoose.connect(MONGODB_URI, {});

    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    // Set auto-disconnect after 30 seconds of inactivity
    connectionTimeout = setTimeout(() => {
      disconnectDB();
    }, 30000);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    isConnected = false;
    throw error;
  }
};

const disconnectDB = async () => {
  try {
    if (!isConnected) {
      return;
    }

    await mongoose.connection.close();
    isConnected = false;
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
