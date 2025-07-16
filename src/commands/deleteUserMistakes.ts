import { Response } from "express";
import { StatusCode } from "status-code-enum";

import { UserRepository } from "../repositories";

const deleteUserMistakes = async (
  res: Response,
  userVkId: number,
  mistakeIds: string[],
  repository: UserRepository
) => {
  const ok = await repository.deleteMistakes(userVkId, mistakeIds);

  if (!ok) {
    res.status(StatusCode.ClientErrorNotFound).json("User not found");
    return;
  }

  res.status(StatusCode.SuccessOK).json("OK");
};

export default deleteUserMistakes;
