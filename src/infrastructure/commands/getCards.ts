import { CardRepository } from "../../infrastructure/data/repositories";
import { Card } from "../../models";
import { randomReduceArray } from "../../utils";

const getCards = async (
  repository: CardRepository,
  cardIds: number[] | null | undefined = null,
  cardsCount: number | null | undefined = null
): Promise<Card[]> => {
  let cards = cardIds ? await repository.findByIds(cardIds) : await repository.findAll();

  if (cardsCount && !Number.isNaN(cardsCount)) {
    randomReduceArray(cards, cardsCount);
  }

  return cards;
};

export default getCards;
