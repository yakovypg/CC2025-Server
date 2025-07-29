import { checkUserExists } from "./";
import { UserRepository } from "../../infrastructure/data/repositories";
import { User } from "../../models";
import { UserExistsError } from "../errors";
import { logger } from "../loggers";

const addUser = async (userVkId: number, repository: UserRepository): Promise<User> => {
  logger.info({ userVkId }, "Trying to add user");
  const userExists = await checkUserExists(userVkId, repository);

  if (userExists) {
    logger.warn({ userVkId }, "User already exists");
    throw new UserExistsError();
  }

  const user = await repository.addUser(userVkId);
  logger.info({ userVkId }, "User added");

  return user;
};

export default addUser;
