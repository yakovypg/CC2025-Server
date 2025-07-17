import { Statistics } from "../../models";
import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";
import { logger } from "../loggers";

const updateUserStatistics = async (
  userVkId: number,
  statistics: Partial<Statistics>,
  repository: UserRepository
): Promise<Statistics> => {
  logger.info({ userVkId, statistics }, "Trying to update user statistics");
  const user = await repository.updateStatistics(userVkId, statistics);

  if (!user) {
    logger.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  logger.info({ userVkId }, "User statistics updated");
  return user.statistics;
};

export default updateUserStatistics;
