import { Response } from "express";
import { StatusCode } from "status-code-enum";

import { UserRepository } from "../../infrastructure/data/repositories";

const getUser = async (res: Response, userVkId: number, repository: UserRepository) => {
  const user = await repository.findByVkId(userVkId);

  if (!user) {
    res.status(StatusCode.ClientErrorNotFound).json("User not found");
    return;
  }

  res.status(StatusCode.SuccessOK).json(user);
};

export default getUser;
