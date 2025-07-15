import { Schema } from "mongoose";

export interface Achievement {
  currentProgress: number;
  nextLevelProgress: number;
  level: number;
  hasMaxLevel: boolean;
}

export interface AchievementDocument extends Achievement, Document {}

export const AchievementSchema: Schema = new Schema({
  currentProgress: { type: Number, required: true },
  nextLevelProgress: { type: Number, required: true },
  level: { type: Number, required: true },
  hasMaxLevel: { type: Boolean, required: true }
});
