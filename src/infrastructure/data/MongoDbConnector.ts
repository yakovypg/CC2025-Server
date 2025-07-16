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
    AchievementSchema.plugin(autoIncrement.plugin, {
      model: AchievementModelName,
      field: "id",
      startAt: 1,
      incrementBy: 1
    });

    AchievementsSchema.plugin(autoIncrement.plugin, {
      model: AchievementsModelName,
      field: "id",
      startAt: 1,
      incrementBy: 1
    });

    CardSchema.plugin(autoIncrement.plugin, {
      model: CardModelName,
      field: "id",
      startAt: 1,
      incrementBy: 1
    });

    StatisticsSchema.plugin(autoIncrement.plugin, {
      model: StatisticsModelName,
      field: "id",
      startAt: 1,
      incrementBy: 1
    });

    UserSchema.plugin(autoIncrement.plugin, {
      model: UserModelName,
      field: "id",
      startAt: 1,
      incrementBy: 1
    });
  };
}
