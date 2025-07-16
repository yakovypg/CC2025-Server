import { Response } from "express";
import { StatusCode } from "status-code-enum";

import { UserRepository } from "../repositories";

const getUserAchievements = async (res: Response, userVkId: number, repository: UserRepository) => {
  const achievement = await repository.findAchievements(userVkId);

  if (!achievement) {
    res.status(StatusCode.ClientErrorNotFound).json("User achievements not found");
    return;
  }

  res.status(StatusCode.SuccessOK).json(achievement);
};

export default getUserAchievements;
