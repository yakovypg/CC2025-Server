import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";
import { Statistics } from "../../models";

const getUserStatistics = async (
  userVkId: number,
  repository: UserRepository
): Promise<Statistics> => {
  const statistics = await repository.findStatistics(userVkId);

  if (!statistics) {
    throw new UserNotFoundError();
  }

  return statistics;
};

export default getUserStatistics;
