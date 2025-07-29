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

export const UserSchema: Schema = new Schema({
  vkId: { type: Number, required: true, unique: true },
  statistics: { type: StatisticsSchema, required: true },
  achievements: { type: AchievementsSchema, required: true },
  mistakeIds: { type: [Number], required: true },
  lastResultDate: { type: Date, required: true },
  registrationDate: { type: Date, required: true }
});

export const UserModelName: string = "User";

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  UserModelName,
  UserSchema
);
