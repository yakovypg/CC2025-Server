import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";
import { LOGGER } from "../loggers";

const deleteUserMistakes = async (
  userVkId: number,
  mistakeIds: number[],
  repository: UserRepository
): Promise<void> => {
  LOGGER.info({ userVkId, mistakeIds }, "Trying to delete user mistakes");
  const mistakesDeleted: boolean = await repository.deleteMistakes(userVkId, mistakeIds);

  if (!mistakesDeleted) {
    LOGGER.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  LOGGER.info({ userVkId, mistakeIds }, "User mistakes deleted");
};

export default deleteUserMistakes;
