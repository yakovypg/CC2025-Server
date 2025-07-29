import { UserRepository } from "../../infrastructure/data/repositories";
import { User } from "../../models";
import { UserNotFoundError } from "../errors";
import { LOGGER } from "../loggers";

const getUser = async (userVkId: number, repository: UserRepository): Promise<User> => {
  LOGGER.info({ userVkId }, "Trying to get user");
  const user: User | null = await repository.findByVkId(userVkId);

  if (!user) {
    LOGGER.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  LOGGER.info({ userVkId }, "User recieved");
  return user;
};

export default getUser;
