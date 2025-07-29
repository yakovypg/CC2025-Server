import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";
import { LOGGER } from "../loggers";

const addUserMistakes = async (
  userVkId: number,
  mistakeIds: number[],
  repository: UserRepository
): Promise<void> => {
  LOGGER.info({ userVkId, mistakeIds }, "Trying to add mistakes to the user");
  const mistakesAdded: boolean = await repository.addMistakes(userVkId, mistakeIds);

  if (!mistakesAdded) {
    LOGGER.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  LOGGER.info({ userVkId, mistakeIds }, "Mistakes added to the user");
};

export default addUserMistakes;
