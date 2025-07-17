import { UserRepository } from "../../infrastructure/data/repositories";
import { logger } from "../loggers";

const checkUserExists = async (userVkId: number, repository: UserRepository): Promise<boolean> => {
  logger.info({ userVkId }, "Trying to check if the user exists");

  const user = await repository.findByVkId(userVkId);
  const userExists = Boolean(user);

  logger.info({ userVkId }, `User ${userExists ? "" : "not "}exists`);

  return userExists;
};

export default checkUserExists;
