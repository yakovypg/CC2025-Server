import { Card } from "../../../models";

export interface CardRepository {
  findAll(): Promise<Card[]>;
  findById(id: number): Promise<Card[]>;
  findByIds(ids: number[]): Promise<Card[]>;
}
