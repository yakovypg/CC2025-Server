import mongoose, { Document, Schema, Model } from "mongoose";

import { Card } from "./";

export interface CardDocument extends Card, Document {
  id: number;
}

export const CARD_SCHEMA: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  frontText: { type: String, required: true, unique: true },
  backText: { type: String, required: true }
});

export const CARD_MODEL_NAME: string = "Card";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CardModel: Model<CardDocument> = mongoose.model<CardDocument>(
  CARD_MODEL_NAME,
  CARD_SCHEMA
);
