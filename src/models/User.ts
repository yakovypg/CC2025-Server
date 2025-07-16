import mongoose, { Document, Schema, Model } from "mongoose";

import {
  Achievements,
  AchievementsDocument,
  AchievementsSchema,
  Statistics,
  StatisticsDocument,
  StatisticsSchema
} from "./";

export interface User {
  vkId: number;
  statistics: Statistics;
  achievements: Achievements;
  mistakeIds: number[];
  lastResultDate: Date;
  registrationDate: Date;

  save(...args: any[]): Promise<this>;
}

export interface UserDocument extends User, Document {
  statistics: StatisticsDocument;
  achievements: AchievementsDocument;

  save(...args: any[]): Promise<this>;
}

export const UserSchema: Schema = new Schema(
  {
    vkId: { type: Number, required: true, unique: true },
    statistics: { type: StatisticsSchema, required: true },
    achievements: { type: AchievementsSchema, required: true },
    mistakeIds: { type: [Number], required: true },
    lastResultDate: { type: Date, required: true },
    registrationDate: { type: Date, required: true }
  }
);

export const UserModelName: string = "User";

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  UserModelName,
  UserSchema
);
