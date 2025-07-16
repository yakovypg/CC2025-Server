import { Response } from "express";
import { StatusCode } from "status-code-enum";

import { checkUserExists } from "./"
import { UserRepository } from "../../infrastructure/data/repositories";

const addUser = async (res: Response, userVkId: number, repository: UserRepository) => {
  const userExists = await checkUserExists(userVkId, repository);

  if (userExists) {
    res.status(StatusCode.ClientErrorBadRequest).json("Cannot create user");
    return;
  }

  const user = await repository.addUser(userVkId);
  res.status(StatusCode.SuccessCreated).json(user);
};

export default addUser;
