import { CardRepository } from "../../infrastructure/data/repositories";
import { Card } from "../../models";
import { randomReduceArray } from "../../utils";
import { logger } from "../loggers";

const getCards = async (
  repository: CardRepository,
  cardIds: number[] | null | undefined = null,
  cardsCount: number | null | undefined = null
): Promise<Card[]> => {
  logger.info({ cardIds, cardsCount }, "Trying to get cards");
  const cards: Card[] | null = cardIds
    ? await repository.findByIds(cardIds)
    : await repository.findAll();

  logger.info(
    { cardIds, cardsCount, numberOfCards: cards?.length },
    "Cards recieved from the repository"
  );

  if (cardsCount && !Number.isNaN(cardsCount)) {
    logger.info({ cardIds, cardsCount }, "Trying to reduce cards array");
    randomReduceArray(cards, cardsCount);
  }

  logger.info({ cardIds, cardsCount, numberOfCards: cards?.length }, "Cards recieved");
  return cards;
};

export default getCards;
