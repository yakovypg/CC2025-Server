import { addUserMistakes } from "./";
import { UserRepository } from "../../infrastructure/data/repositories";
import { Answer, User } from "../../models";
import { UserNotFoundError } from "../errors";
import { logger } from "../loggers";
import { UserUpdater } from "../services";

const addUserAnswers = async (
  userVkId: number,
  answers: Answer[],
  repository: UserRepository
): Promise<User> => {
  logger.info({ userVkId, answers }, "Trying to add answers to the user");
  const user = await repository.findByVkId(userVkId);

  if (!user) {
    logger.warn({ userVkId }, "User not found");
    throw new UserNotFoundError();
  }

  const mistakeIds = answers.filter((t) => !t.isCorrect).map((t) => t.cardId);
  await addUserMistakes(userVkId, mistakeIds, repository);

  const userUpdater = new UserUpdater(user);
  userUpdater.updateAll(answers);

  const updatedUser = await userUpdater.saveChanges();
  logger.info({ userVkId, answers }, "Answers added to the user");

  return updatedUser;
};

export default addUserAnswers;
