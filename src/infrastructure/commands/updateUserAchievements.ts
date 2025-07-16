import { Achievements } from "../../models";
import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";

const updateUserAchievements = async (
  userVkId: number,
  achievements: Partial<Achievements>,
  repository: UserRepository
): Promise<Achievements> => {
  const user = await repository.updateAchievements(userVkId, achievements);

  if (!user) {
    throw new UserNotFoundError();
  }

  return user.achievements;
};

export default updateUserAchievements;
