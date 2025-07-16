import { Document, Schema } from "mongoose";

export interface Statistics {
  correctAnswers: number;
  incorrectAnswers: number;
  bestSeries: number;
  strikeCounter: number;
}

export interface StatisticsDocument extends Statistics, Document {}

export const StatisticsSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    correctAnswers: { type: Number, required: true },
    incorrectAnswers: { type: Number, required: true },
    bestSeries: { type: Number, required: true },
    strikeCounter: { type: Number, required: true }
  },
  { _id: false }
);

export const StatisticsModelName: string = "Statistics";
