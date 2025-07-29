import { UserRepository } from "../../infrastructure/data/repositories";
import { Achievements } from "../../models";
import { UserNotFoundError } from "../errors";
import { logger } from "../loggers";

const getUserAchievements = async (
  userVkId: number,
  repository: UserRepository
): Promise<Achievements> => {
  logger.info({ userVkId }, "Trying to get user achievements");
  const achievements: Achievements | null = await repository.findAchievements(userVkId);

  if (!achievements) {
    logger.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  logger.info({ userVkId }, "User achievements recieved");
  return achievements;
};

export default getUserAchievements;
