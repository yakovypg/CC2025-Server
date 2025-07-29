import { UserRepository } from "../../infrastructure/data/repositories";
import { User } from "../../models";
import { LOGGER } from "../loggers";

const checkUserExists = async (userVkId: number, repository: UserRepository): Promise<boolean> => {
  LOGGER.info({ userVkId }, "Trying to check if the user exists");

  const user: User | null = await repository.findByVkId(userVkId);
  const userExists: boolean = Boolean(user);

  LOGGER.info({ userVkId }, `User ${userExists ? "" : "not "}exists`);

  return userExists;
};

export default checkUserExists;
