import mongoose, { Document, Schema, Model } from "mongoose";

import {
  AchievementsDocument,
  AchievementsSchema,
  StatisticsDocument,
  StatisticsSchema,
  User
} from "./";

export interface UserDocument extends User, Document {
  statistics: StatisticsDocument;
  achievements: AchievementsDocument;

  save(...args: unknown[]): Promise<this>;
}

export const USER_SCHEMA: Schema = new Schema({
  vkId: { type: Number, required: true, unique: true },
  statistics: { type: StatisticsSchema, required: true },
  achievements: { type: AchievementsSchema, required: true },
  mistakeIds: { type: [Number], required: true },
  lastResultDate: { type: Date, required: true },
  registrationDate: { type: Date, required: true }
});

export const USER_MODEL_NAME: string = "User";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  USER_MODEL_NAME,
  USER_SCHEMA
);
