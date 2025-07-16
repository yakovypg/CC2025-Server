import mongoose from "mongoose";
import * as autoIncrement from "@alec016/mongoose-autoincrement";

import {
  StatisticsSchema,
  StatisticsModelName,
  AchievementSchema,
  AchievementModelName,
  AchievementsModelName,
  AchievementsSchema,
  CardSchema,
  CardModelName,
  UserSchema,
  UserModelName
} from "../../models";

import { DatabaseConnector } from "./";

export class MongoDbConnector implements DatabaseConnector {
  public connect = async (): Promise<void> => {
    const connectionUrl = process.env.MONGODB_URI ?? "";

    try {
      await mongoose.connect(connectionUrl);
      autoIncrement.initialize(mongoose.connection);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      process.exit(1);
    }
  };

  public initialize = async (): Promise<void> => {
    const createOptions = (modelName: string) => ({
      model: modelName,
      field: "id",
      startAt: 1,
      incrementBy: 1
    });

    AchievementSchema.plugin(autoIncrement.plugin, createOptions(AchievementModelName));
    AchievementsSchema.plugin(autoIncrement.plugin, createOptions(AchievementsModelName));
    CardSchema.plugin(autoIncrement.plugin, createOptions(CardModelName));
    StatisticsSchema.plugin(autoIncrement.plugin, createOptions(StatisticsModelName));
    UserSchema.plugin(autoIncrement.plugin, createOptions(UserModelName));
  };
}
