import { UserRepository } from "../../infrastructure/data/repositories";

const checkUserExists = async (
  userVkId: number,
  repository: UserRepository
): Promise<boolean> => {
  const user = await repository.findByVkId(userVkId);
  return Boolean(user);
};

export default checkUserExists;
