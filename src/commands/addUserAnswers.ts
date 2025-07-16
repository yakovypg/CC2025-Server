import { Response } from "express";
import { StatusCode } from "status-code-enum";

import { Answer } from "../models";
import { UserRepository } from "../repositories";
import { UserUpdater } from "../services";
import { addUserMistakes } from "./";

const addUserAnswers = async (
  res: Response,
  userVkId: number,
  answers: Answer[],
  repository: UserRepository
) => {
  const user = await repository.findByVkId(userVkId);

  if (!user) {
    res.status(StatusCode.ClientErrorNotFound).json("User not found");
    return;
  }

  const mistakeIds = answers.filter((t) => !t.isCorrect).map((t) => t.cardId);
  await addUserMistakes(res, userVkId, mistakeIds, repository);

  const userUpdater = new UserUpdater(user);
  userUpdater.updateAll(answers);

  const updatedUser = await userUpdater.saveChanges();

  if (!updatedUser) {
    res.status(StatusCode.ServerErrorInternal).json("Internal server error");
    return;
  }

  res.status(StatusCode.SuccessOK).json(updatedUser);
};

export default addUserAnswers;
