import { Card, CardModel } from "../../../models";
import { CardRepository } from "./";

export class MongoDbCardRepository implements CardRepository {
  public findAll = async (): Promise<Card[]> => {
    return CardModel.find().exec();
  };
}
