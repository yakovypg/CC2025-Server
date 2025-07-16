import mongoose from "mongoose";
import { DatabaseConnector } from "./";

export class MongoDbConnector implements DatabaseConnector {
  public connect = async (): Promise<void> => {
    const connectionUrl = process.env.MONGODB_URI ?? "";

    try {
      await mongoose.connect(connectionUrl);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      process.exit(1);
    }
  }
}
