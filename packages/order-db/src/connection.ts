import mongoose from "mongoose";

let isConnected = false;

export const connectOrderDB = async () => {
  if (isConnected) return;

  const mongoUrl = process.env.MONGODB_URI;

  if (!mongoUrl) {
    throw new Error(
      "MONGODB_URI environment variable is not set. " +
        "Set it in your platform's environment configuration."
    );
  }

  try {
    await mongoose.connect(mongoUrl, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

