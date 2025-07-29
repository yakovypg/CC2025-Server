import { Document, Schema } from "mongoose";

import { Achievements, AchievementDocument, AchievementSchema } from "./";

export interface AchievementsDocument extends Achievements, Document {
  daysInStrike: AchievementDocument;
  rightAnswers: AchievementDocument;
  perfectSeries: AchievementDocument;
  veteran: AchievementDocument;
}

export const ACHIEVEMENTS_SCHEMA: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    daysInStrike: { type: AchievementSchema, required: true },
    rightAnswers: { type: AchievementSchema, required: true },
    perfectSeries: { type: AchievementSchema, required: true },
    veteran: { type: AchievementSchema, required: true }
  },
  { _id: false }
);

export const ACHIEVEMENTS_MODEL_NAME: string = "Achievements";
