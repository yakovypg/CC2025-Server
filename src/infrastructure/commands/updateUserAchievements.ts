import { Response } from "express";
import { StatusCode } from "status-code-enum";

import { Achievements } from "../../models";
import { UserRepository } from "../../infrastructure/data/repositories";

const updateUserAchievements = async (
  res: Response,
  userVkId: number,
  achievements: Partial<Achievements>,
  repository: UserRepository
) => {
  const user = await repository.updateAchievements(userVkId, achievements);

  if (!user) {
    res.status(StatusCode.ClientErrorNotFound).json("User achievements not found");
    return;
  }

  res.status(StatusCode.SuccessOK).json(user.achievements);
};

export default updateUserAchievements;
