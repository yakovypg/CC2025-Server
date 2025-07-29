import { checkUserExists } from "./";
import { UserRepository } from "../../infrastructure/data/repositories";
import { User } from "../../models";
import { UserExistsError } from "../errors";
import { LOGGER } from "../loggers";

const addUser = async (userVkId: number, repository: UserRepository): Promise<User> => {
  LOGGER.info({ userVkId }, "Trying to add user");
  const userExists: boolean = await checkUserExists(userVkId, repository);

  if (userExists) {
    LOGGER.warn({ userVkId }, "User already exists");
    throw new UserExistsError();
  }

  const user: User | null = await repository.addUser(userVkId);
  LOGGER.info({ userVkId }, "User added");

  return user;
};

export default addUser;
