import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";
import { logger } from "../loggers";

const deleteUserMistakes = async (
  userVkId: number,
  mistakeIds: number[],
  repository: UserRepository
): Promise<void> => {
  logger.info({ userVkId, mistakeIds }, "Trying to delete user mistakes");
  const mistakesDeleted = await repository.deleteMistakes(userVkId, mistakeIds);

  if (!mistakesDeleted) {
    logger.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  logger.info({ userVkId, mistakeIds }, "User mistakes deleted");
};

export default deleteUserMistakes;
