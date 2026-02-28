import mongoose from "mongoose";
import { connectDB, keepConnectionAlive } from "../config/database.js";

const ensureCollectionsExist = async (models = []) => {
  try {
    await connectDB();

    const requiredCollections = models
      .map((model) => model?.collection?.collectionName)
      .filter(Boolean);

    const existingCollections = await mongoose.connection.db
      .listCollections({}, { nameOnly: true })
      .toArray();

    const existingNames = new Set(existingCollections.map((collection) => collection.name));

    for (const collectionName of requiredCollections) {
      if (!existingNames.has(collectionName)) {
        await mongoose.connection.db.createCollection(collectionName);
        console.log(`Created collection: ${collectionName}`);
      } else {
        console.log(`Collection exists: ${collectionName}`);
      }
    }

    keepConnectionAlive();
  } catch (error) {
    console.error("Unable to ensure required collections:", error);
    throw error;
  }
};

export { ensureCollectionsExist };
