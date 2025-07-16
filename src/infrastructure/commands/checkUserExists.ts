import { UserRepository } from "../../infrastructure/data/repositories";

const checkUserExists = async (userVkId: number, repository: UserRepository) => {
  const user = await repository.findByVkId(userVkId);
  return user;
};

export default checkUserExists;
