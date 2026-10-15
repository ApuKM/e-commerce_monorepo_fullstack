import mongoose from "mongoose";

let isConnected = false;

export const connectOrderDB = async () => {
  if (isConnected) return;
  const mongoUrl = (globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  }).process?.env?.MONGODB_URI;
  if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined in env file!");
  }
  
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to Mongodb");
  } catch (error) {
    console.log("Mongodb connection error", error);
    throw error;
  }
};
