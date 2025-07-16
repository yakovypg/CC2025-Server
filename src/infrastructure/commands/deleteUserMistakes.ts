import { UserRepository } from "../../infrastructure/data/repositories";
import { UserNotFoundError } from "../errors";

const deleteUserMistakes = async (
  userVkId: number,
  mistakeIds: number[],
  repository: UserRepository
): Promise<void> => {
  const mistakesDeleted = await repository.deleteMistakes(userVkId, mistakeIds);

  if (!mistakesDeleted) {
    throw new UserNotFoundError();
  }
};

export default deleteUserMistakes;
