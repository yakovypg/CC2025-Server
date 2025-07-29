import { UserRepository } from "../../infrastructure/data/repositories";
import { Statistics, User } from "../../models";
import { UserNotFoundError } from "../errors";
import { LOGGER } from "../loggers";

const updateUserStatistics = async (
  userVkId: number,
  statistics: Partial<Statistics>,
  repository: UserRepository
): Promise<Statistics> => {
  LOGGER.info({ userVkId, statistics }, "Trying to update user statistics");
  const user: User | null = await repository.updateStatistics(userVkId, statistics);

  if (user === null) {
    LOGGER.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  LOGGER.info({ userVkId }, "User statistics updated");
  return user.statistics;
};

export default updateUserStatistics;
