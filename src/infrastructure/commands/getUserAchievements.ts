import { UserRepository } from "../../infrastructure/data/repositories";
import { Achievements } from "../../models";
import { UserNotFoundError } from "../errors";
import { LOGGER } from "../loggers";

const getUserAchievements = async (
  userVkId: number,
  repository: UserRepository
): Promise<Achievements> => {
  LOGGER.info({ userVkId }, "Trying to get user achievements");
  const achievements: Achievements | null = await repository.findAchievements(userVkId);

  if (achievements === null) {
    LOGGER.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  LOGGER.info({ userVkId }, "User achievements recieved");
  return achievements;
};

export default getUserAchievements;
