import { UserRepository } from "../../infrastructure/data/repositories";
import { Statistics } from "../../models";
import { UserNotFoundError } from "../errors";
import { logger } from "../loggers";

const getUserStatistics = async (
  userVkId: number,
  repository: UserRepository
): Promise<Statistics> => {
  logger.info({ userVkId }, "Trying to get user statistics");
  const statistics = await repository.findStatistics(userVkId);

  if (!statistics) {
    logger.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  logger.info({ userVkId }, "User statistics recieved");
  return statistics;
};

export default getUserStatistics;
