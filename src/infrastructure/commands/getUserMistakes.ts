import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";
import { LOGGER } from "../loggers";

const getUserMistakes = async (userVkId: number, repository: UserRepository): Promise<number[]> => {
  LOGGER.info({ userVkId }, "Trying to get user mistakes");
  const mistakeIds: number[] | null = await repository.findMistakes(userVkId);

  if (mistakeIds === null) {
    LOGGER.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  LOGGER.info({ userVkId }, "User mistakes recieved");
  return mistakeIds;
};

export default getUserMistakes;
