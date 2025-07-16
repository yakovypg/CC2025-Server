import { Request, Response } from "express";
import { StatusCode } from "status-code-enum";

import { CardRepository } from "../../infrastructure/data/repositories";
import { safeInvoke, randomReduceArray } from "../../utils";

export class CardController {
  private repository: CardRepository;

  constructor(repository: CardRepository) {
    this.repository = repository;
  }

  public getCards = async (req: Request, res: Response): Promise<void> => {
    const cardsCount = Number(req.query.cardsCount);

    await safeInvoke(res, async () => {
      const cards = await this.repository.findAll();

      if (!Number.isNaN(cardsCount)) {
        randomReduceArray(cards, cardsCount);
      }

      res.status(StatusCode.SuccessOK).json(cards);
    });
  };
}
