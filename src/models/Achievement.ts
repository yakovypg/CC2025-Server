import { Schema } from "mongoose";

export interface Achievement {
  currentProgress: number;
  nextLevelProgress: number;
  level: number;
  hasMaxLevel: boolean;
}

export interface AchievementDocument extends Achievement, Document {}

export const AchievementSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    currentProgress: { type: Number, required: true },
    nextLevelProgress: { type: Number, required: true },
    level: { type: Number, required: true },
    hasMaxLevel: { type: Boolean, required: true }
  },
  { _id: false }
);

export const AchievementModelName: string = "Achievement";
