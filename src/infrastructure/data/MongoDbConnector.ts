import * as autoIncrement from "@alec016/mongoose-autoincrement";
import mongoose from "mongoose";

import { DatabaseConnector } from "./";
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
import { logger } from "../loggers";

export class MongoDbConnector implements DatabaseConnector {
  public connect = async (): Promise<void> => {
    const connectionUrl = process.env.MONGODB_URI ?? "";

    try {
      logger.info("Trying to connect to MongoDB");

      await mongoose.connect(connectionUrl);
      autoIncrement.initialize(mongoose.connection);

      logger.info("MongoDB connected");
    } catch (error) {
      logger.error({ err: error }, "Failed to connect to MongoDB");
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

    logger.info("Trying to initialize MongoDB models");

    AchievementSchema.plugin(autoIncrement.plugin, createOptions(AchievementModelName));
    AchievementsSchema.plugin(autoIncrement.plugin, createOptions(AchievementsModelName));
    CardSchema.plugin(autoIncrement.plugin, createOptions(CardModelName));
    StatisticsSchema.plugin(autoIncrement.plugin, createOptions(StatisticsModelName));
    UserSchema.plugin(autoIncrement.plugin, createOptions(UserModelName));

    logger.info("MongoDB models initialized");
  };
}
