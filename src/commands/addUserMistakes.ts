import { Response } from "express";
import { StatusCode } from "status-code-enum";

import { UserRepository } from "../repositories";

const addUserMistakes = async (
  res: Response,
  userVkId: number,
  mistakeIds: string[],
  repository: UserRepository
) => {
  const ok = await repository.addMistakes(userVkId, mistakeIds);

  if (!ok) {
    res.status(StatusCode.ClientErrorNotFound).json("User not found");
    return;
  }

  //res.status(StatusCode.SuccessCreated).json("OK");
};

export default addUserMistakes;
