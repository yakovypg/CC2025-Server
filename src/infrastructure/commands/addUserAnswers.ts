import { addUserMistakes } from "./";
import { UserRepository } from "../../infrastructure/data/repositories";
import { Answer, User } from "../../models";
import { UserNotFoundError } from "../errors";
import { LOGGER } from "../loggers";
import { UserUpdater } from "../services";

const addUserAnswers = async (
  userVkId: number,
  answers: Answer[],
  repository: UserRepository
): Promise<User> => {
  LOGGER.info({ userVkId, answers }, "Trying to add answers to the user");
  const user: User | null = await repository.findByVkId(userVkId);

  if (!user) {
    LOGGER.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  const mistakeIds: number[] = answers
    .filter((t: Answer) => !t.isCorrect)
    .map((t: Answer) => t.cardId);
  await addUserMistakes(userVkId, mistakeIds, repository);

  const userUpdater: UserUpdater = new UserUpdater(user);
  userUpdater.updateAll(answers);

  const updatedUser: User = await userUpdater.saveChanges();
  LOGGER.info({ userVkId, answers }, "Answers added to the user");

  return updatedUser;
};

export default addUserAnswers;
