import { UserRepository } from "../../infrastructure/data/repositories";
import { User } from "../../models";
import { UserNotFoundError } from "../errors";
import { logger } from "../loggers";

const getUser = async (userVkId: number, repository: UserRepository): Promise<User> => {
  logger.info({ userVkId }, "Trying to get user");
  const user: User | null = await repository.findByVkId(userVkId);

  if (!user) {
    logger.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  logger.info({ userVkId }, "User recieved");
  return user;
};

export default getUser;
