import mongoose, { Document, Schema, Model } from "mongoose";

import { Card } from "./";

export interface CardDocument extends Card, Document {
  id: number;
}

export const CardSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  frontText: { type: String, required: true, unique: true },
  backText: { type: String, required: true }
});

export const CardModelName: string = "Card";

export const CardModel: Model<CardDocument> = mongoose.model<CardDocument>(
  CardModelName,
  CardSchema
);
