import { Response } from "express";
import { StatusCode } from "status-code-enum";

import { UserRepository } from "../repositories";

const addUser = async (res: Response, userVkId: number, repository: UserRepository) => {
  const user = await repository.addUser(userVkId);
  res.status(StatusCode.SuccessCreated).json(user);
};

export default addUser;
