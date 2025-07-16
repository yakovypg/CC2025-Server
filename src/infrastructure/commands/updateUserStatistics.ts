import { Statistics } from "../../models";
import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";

const updateUserStatistics = async (
  userVkId: number,
  statistics: Partial<Statistics>,
  repository: UserRepository
): Promise<Statistics> => {
  const user = await repository.updateStatistics(userVkId, statistics);

  if (!user) {
    throw new UserNotFoundError();
  }

  return user.statistics;
};

export default updateUserStatistics;
