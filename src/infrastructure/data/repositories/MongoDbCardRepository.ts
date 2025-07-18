import { CardDocument, CardModel } from "../../../models";
import { CardRepository } from "./";

export class MongoDbCardRepository implements CardRepository {
  public findAll = async (): Promise<CardDocument[]> => {
    return CardModel.find().exec();
  };

  public findById = async (id: number): Promise<CardDocument[]> => {
    return CardModel.find({ id: id }).exec();
  };

  public findByIds = async (ids: number[]): Promise<CardDocument[]> => {
    return CardModel.find({ id: { $in: ids } }).exec();
  };
}
