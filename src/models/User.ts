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
  mistakeIds: string[];
  lastResultDate: Date;
  registrationDate: Date;
}

export interface UserDocument extends User, Document {
  vkId: number;
  statistics: StatisticsDocument;
  achievements: AchievementsDocument;
  mistakeIds: string[];
  lastResultDate: Date;
  registrationDate: Date;
}

export const UserSchema: Schema = new Schema({
  vkId: { type: Number, required: true, unique: true },
  statistics: { type: StatisticsSchema, required: true },
  achievements: { type: AchievementsSchema, required: true },
  mistakeIds: { type: [String], required: true },
  lastResultDate: { type: Date, required: true },
  registrationDate: { type: Date, required: true }
});

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("User", UserSchema);
