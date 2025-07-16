import { Answer, User } from "../../models";
import { UserRepository } from "../../infrastructure/data/repositories";
import { UserUpdater } from "../services";
import { UserNotFoundError } from "../errors";
import { addUserMistakes } from "./";

const addUserAnswers = async (
  userVkId: number,
  answers: Answer[],
  repository: UserRepository
): Promise<User> => {
  const user = await repository.findByVkId(userVkId);

  if (!user) {
    throw new UserNotFoundError();
  }

  const mistakeIds = answers.filter((t) => !t.isCorrect).map((t) => t.cardId);
  await addUserMistakes(userVkId, mistakeIds, repository);

  const userUpdater = new UserUpdater(user);
  userUpdater.updateAll(answers);

  return await userUpdater.saveChanges();
};

export default addUserAnswers;
