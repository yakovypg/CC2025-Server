import { Card } from "../../../models";

export interface CardRepository {
  findAll(): Promise<Card[]>;
  findById(id: number): Promise<Card | null>;
  findByIds(ids: number[]): Promise<Card[]>;
}
