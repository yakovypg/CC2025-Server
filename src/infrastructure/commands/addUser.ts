import { UserRepository } from "../../infrastructure/data/repositories";
import { UserExistsError } from "../errors";
import { User } from "../../models";

import { checkUserExists } from "./";

const addUser = async (userVkId: number, repository: UserRepository): Promise<User> => {
  const userExists = await checkUserExists(userVkId, repository);

  if (userExists) {
    throw new UserExistsError();
  }

  return await repository.addUser(userVkId);
};

export default addUser;
