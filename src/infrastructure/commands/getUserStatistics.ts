import { Response } from "express";
import { StatusCode } from "status-code-enum";

import { UserRepository } from "../../infrastructure/data/repositories";

const getUserStatistics = async (res: Response, userVkId: number, repository: UserRepository) => {
  const statistics = await repository.findStatistics(userVkId);

  if (!statistics) {
    res.status(StatusCode.ClientErrorNotFound).json("User statistics not found");
    return;
  }

  res.status(StatusCode.SuccessOK).json(statistics);
};

export default getUserStatistics;
