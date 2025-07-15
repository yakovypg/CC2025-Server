import mongoose, { Document, Schema, Model } from "mongoose";

import {
  Achievements,
  AchievementsDocument,
  AchievementsSchema,
  Statistics,
  StatisticsDocument,
  StatisticsSchema
} from "./";

export interface User extends Document {
  vkId: number;
  statistics: Statistics;
  achievements: Achievements;
  mistakeIds: number[];
}

export interface UserDocument extends User, Document {
  vkId: number;
  statistics: StatisticsDocument;
  achievements: AchievementsDocument;
  mistakeIds: number[];
}

export const UserSchema: Schema = new Schema({
  vkId: { type: Number, required: true, unique: true },
  statistics: { type: StatisticsSchema, required: true },
  achievements: { type: AchievementsSchema, required: true },
  mistakeIds: { type: [Number], required: true }
});

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("User", UserSchema);
