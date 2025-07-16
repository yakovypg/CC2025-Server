import { Request, Response } from "express";

import { CardRepository } from "../../infrastructure/data/repositories";
import { parseNumberArray, answerSuccessOk } from "../../utils";
import { getCards } from "../../infrastructure/commands/";

export class CardController {
  private repository: CardRepository;

  constructor(repository: CardRepository) {
    this.repository = repository;
  }

  public getCards = async (req: Request, res: Response): Promise<void> => {
    const cardsCount = Number(req.query.cardsCount);
    const cardsIds = parseNumberArray(req.query.cardIds);

    const cards = await getCards(this.repository, cardsIds, cardsCount);
    answerSuccessOk(res, cards);
  };
}
