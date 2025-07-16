import { Response } from "express";
import { StatusCode } from "status-code-enum";

import { Statistics } from "../../models";
import { UserRepository } from "../../infrastructure/data/repositories";

const updateUserStatistics = async (
  res: Response,
  userVkId: number,
  statistics: Partial<Statistics>,
  repository: UserRepository
) => {
  const user = await repository.updateStatistics(userVkId, statistics);

  if (!user) {
    res.status(StatusCode.ClientErrorNotFound).json("User statistics not found");
    return;
  }

  res.status(StatusCode.SuccessOK).json(user.statistics);
};

export default updateUserStatistics;
