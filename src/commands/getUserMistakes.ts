import { Response } from "express";
import { StatusCode } from "status-code-enum";

import { UserRepository } from "../repositories";

const getUserMistakes = async (res: Response, userVkId: number, repository: UserRepository) => {
  const mistakes = await repository.findMistakes(userVkId);

  if (!mistakes) {
    res.status(StatusCode.ClientErrorNotFound).json("User not found");
    return;
  }

  res.status(StatusCode.SuccessOK).json(mistakes);
};

export default getUserMistakes;
