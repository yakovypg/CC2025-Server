import { Card } from "../models";

export interface CardRepository {
  findAll(): Promise<Card[]>;
}
