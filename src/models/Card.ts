import mongoose, { Document, Schema, Model } from "mongoose";

export interface Card {
  frontText: string;
  backText: string;
}

export interface CardDocument extends Card, Document {}

export const CardSchema: Schema = new Schema({
  frontText: { type: String, required: true },
  backText: { type: String, required: true }
});

export const CardModel: Model<CardDocument> = mongoose.model<CardDocument>("Card", CardSchema);
