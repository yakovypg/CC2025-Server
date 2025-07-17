import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";
import { logger } from "../loggers";

const addUserMistakes = async (
  userVkId: number,
  mistakeIds: number[],
  repository: UserRepository
): Promise<void> => {
  logger.info({ userVkId, mistakeIds }, "Trying to add mistakes to the user");
  const mistakesAdded = await repository.addMistakes(userVkId, mistakeIds);

  if (!mistakesAdded) {
    logger.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  logger.info({ userVkId, mistakeIds }, "Mistakes added to the user");
};

export default addUserMistakes;
