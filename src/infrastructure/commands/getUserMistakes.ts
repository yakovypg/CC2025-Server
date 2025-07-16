import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";

const getUserMistakes = async (userVkId: number, repository: UserRepository): Promise<number[]> => {
  const mistakeIds = await repository.findMistakes(userVkId);

  if (!mistakeIds) {
    throw new UserNotFoundError();
  }

  return mistakeIds;
};

export default getUserMistakes;
