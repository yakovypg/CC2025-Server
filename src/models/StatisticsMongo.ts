import { Document, Schema } from "mongoose";

import { Statistics } from "./";

export interface StatisticsDocument extends Statistics, Document {}

export const STATISTICS_SCHEMA: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    correctAnswers: { type: Number, required: true },
    incorrectAnswers: { type: Number, required: true },
    currentSeries: { type: Number, required: true },
    bestSeries: { type: Number, required: true },
    strikeCounter: { type: Number, required: true }
  },
  { _id: false }
);

export const STATISTICS_MODEL_NAME: string = "Statistics";
