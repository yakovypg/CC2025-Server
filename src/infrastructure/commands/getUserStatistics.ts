import { UserRepository } from "../../infrastructure/data/repositories";
import { Statistics } from "../../models";
import { UserNotFoundError } from "../errors";
import { LOGGER } from "../loggers";

const getUserStatistics = async (
  userVkId: number,
  repository: UserRepository
): Promise<Statistics> => {
  LOGGER.info({ userVkId }, "Trying to get user statistics");
  const statistics: Statistics | null = await repository.findStatistics(userVkId);

  if (statistics === null) {
    LOGGER.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  LOGGER.info({ userVkId }, "User statistics recieved");
  return statistics;
};

export default getUserStatistics;
