import { Schema } from "mongoose";

import { Achievement } from "./";

export interface AchievementDocument extends Achievement, Document {}

export const ACHIEVEMENT_SCHEMA: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    currentProgress: { type: Number, required: true },
    nextLevelProgress: { type: Number, required: true },
    level: { type: Number, required: true },
    hasMaxLevel: { type: Boolean, required: true }
  },
  { _id: false }
);

export const ACHIEVEMENT_MODEL_NAME: string = "Achievement";
