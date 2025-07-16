import { UserRepository } from "../../infrastructure/data/repositories";
import { Achievements } from "../../models";
import { UserNotFoundError } from "../errors";

const getUserAchievements = async (
  userVkId: number,
  repository: UserRepository
): Promise<Achievements> => {
  const achievements = await repository.findAchievements(userVkId);

  if (!achievements) {
    throw new UserNotFoundError();
  }

  return achievements;
};

export default getUserAchievements;
