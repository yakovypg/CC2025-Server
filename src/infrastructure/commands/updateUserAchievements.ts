import { UserRepository } from "../../infrastructure/data/repositories";
import { Achievements, User } from "../../models";
import { UserNotFoundError } from "../errors";
import { LOGGER } from "../loggers";

const updateUserAchievements = async (
  userVkId: number,
  achievements: Partial<Achievements>,
  repository: UserRepository
): Promise<Achievements> => {
  LOGGER.info({ userVkId, achievements }, "Trying to update user achievements");
  const user: User | null = await repository.updateAchievements(userVkId, achievements);

  if (!user) {
    LOGGER.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  LOGGER.info({ userVkId }, "User achievements updated");
  return user.achievements;
};

export default updateUserAchievements;
