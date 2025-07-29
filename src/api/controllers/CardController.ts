import { Request, Response } from "express";

import { getCards } from "../../infrastructure/commands";
import { CardRepository } from "../../infrastructure/data/repositories";
import { Card } from "../../models";
import { parseNumberArray, answerSuccessOk } from "../../utils";

export class CardController {
  private repository: CardRepository;

  constructor(repository: CardRepository) {
    this.repository = repository;
  }

  public getCards = async (req: Request, res: Response): Promise<void> => {
    const cardsCount: number = Number(req.query.cardsCount);
    const cardsIds: number[] | null = parseNumberArray(req.query.cardIds);

    const cards: Card[] = await getCards(this.repository, cardsIds, cardsCount);
    answerSuccessOk(res, cards);
  };
}
