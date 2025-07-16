import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";

const addUserMistakes = async (
  userVkId: number,
  mistakeIds: number[],
  repository: UserRepository
): Promise<void> => {
  const mistakesAdded = await repository.addMistakes(userVkId, mistakeIds);

  if (!mistakesAdded) {
    throw new UserNotFoundError();
  }
};

export default addUserMistakes;
