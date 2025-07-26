import { UserRepository } from "../../infrastructure/data/repositories";
import { Achievements } from "../../models";
import { UserNotFoundError } from "../errors";
import { logger } from "../loggers";

const updateUserAchievements = async (
  userVkId: number,
  achievements: Partial<Achievements>,
  repository: UserRepository
): Promise<Achievements> => {
  logger.info({ userVkId, achievements }, "Trying to update user achievements");
  const user = await repository.updateAchievements(userVkId, achievements);

  if (!user) {
    logger.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  logger.info({ userVkId }, "User achievements updated");
  return user.achievements;
};

export default updateUserAchievements;
