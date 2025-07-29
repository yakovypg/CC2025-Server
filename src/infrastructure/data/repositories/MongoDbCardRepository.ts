import { CardRepository } from "./";
import { CardDocument, CardModel } from "../../../models";

export class MongoDbCardRepository implements CardRepository {
  public findAll = async (): Promise<CardDocument[]> => {
    return CardModel.find().exec();
  };

  public findById = async (id: number): Promise<CardDocument | null> => {
    return CardModel.findOne({ id: id }).exec();
  };

  public findByIds = async (ids: number[]): Promise<CardDocument[]> => {
    return CardModel.find({ id: { $in: ids } }).exec();
  };
}
