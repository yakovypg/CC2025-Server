import { CardRepository } from "../../infrastructure/data/repositories";
import { Card } from "../../models";
import { randomReduceArray } from "../../utils";
import { LOGGER } from "../loggers";

const getCards = async (
  repository: CardRepository,
  cardIds: number[] | null | undefined = null,
  cardsCount: number | null | undefined = null
): Promise<Card[]> => {
  LOGGER.info({ cardIds, cardsCount }, "Trying to get cards");

  const cards: Card[] | null = cardIds
    ? await repository.findByIds(cardIds)
    : await repository.findAll();

  LOGGER.info(
    { cardIds, cardsCount, numberOfCards: cards?.length },
    "Cards recieved from the repository"
  );

  if (cardsCount && !Number.isNaN(cardsCount)) {
    LOGGER.info({ cardIds, cardsCount }, "Trying to reduce cards array");
    randomReduceArray(cards, cardsCount);
  }

  LOGGER.info({ cardIds, cardsCount, numberOfCards: cards?.length }, "Cards recieved");
  return cards;
};

export default getCards;
