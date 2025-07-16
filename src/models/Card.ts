import mongoose, { Document, Schema, Model } from "mongoose";

export interface Card {
  id: number;
  frontText: string;
  backText: string;
}

export interface CardDocument extends Card, Document {
  id: number;
}

export const CardSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  frontText: { type: String, required: true },
  backText: { type: String, required: true }
});

export const CardModelName: string = "Card";

export const CardModel: Model<CardDocument> = mongoose.model<CardDocument>(
  CardModelName,
  CardSchema
);
