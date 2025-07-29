import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";
import { logger } from "../loggers";

const getUserMistakes = async (userVkId: number, repository: UserRepository): Promise<number[]> => {
  logger.info({ userVkId }, "Trying to get user mistakes");
  const mistakeIds: number[] | null = await repository.findMistakes(userVkId);

  if (!mistakeIds) {
    logger.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  logger.info({ userVkId }, "User mistakes recieved");
  return mistakeIds;
};

export default getUserMistakes;
