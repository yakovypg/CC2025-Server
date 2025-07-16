import { UserRepository } from "../../infrastructure/data/repositories";
import { User } from "../../models";
import { UserNotFoundError } from "../errors";

const getUser = async (userVkId: number, repository: UserRepository): Promise<User> => {
  const user = await repository.findByVkId(userVkId);

  if (!user) {
    throw new UserNotFoundError();
  }

  return user;
};

export default getUser;
