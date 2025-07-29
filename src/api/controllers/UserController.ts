import { Request, Response } from "express";

import {
  addUser,
  addUserAnswers,
  addUserMistakes,
  deleteUserMistakes,
  getUser,
  getUserAchievements,
  getUserMistakes,
  getUserStatistics,
  updateUserAchievements,
  updateUserStatistics
} from "../../infrastructure/commands";
import { UserRepository } from "../../infrastructure/data/repositories";
import { Achievements, Answer, Statistics, User } from "../../models";
import {
  parseAnswerArray,
  parseNumberArray,
  parseStatistics,
  parseAchievements,
  answerSuccessCreated,
  answerBadRequest,
  answerSuccessOk
} from "../../utils";

export class UserController {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public addUser = async (req: Request, res: Response): Promise<void> => {
    const vkId: number = Number(req.body.id);

    if (!Number.isInteger(vkId)) {
      answerBadRequest(res);
      return;
    }

    const user: User = await addUser(vkId, this.repository);
    answerSuccessCreated(res, user);
  };

  public getUser = async (req: Request, res: Response): Promise<void> => {
    const vkId: number = Number(req.params.id);

    if (!Number.isInteger(vkId)) {
      answerBadRequest(res);
      return;
    }

    const user: User = await getUser(vkId, this.repository);
    answerSuccessOk(res, user);
  };

  public updateStatistics = async (req: Request, res: Response): Promise<void> => {
    const vkId: number = Number(req.params.id);
    const statistics: Partial<Statistics> | null = parseStatistics(req.body);

    if (!Number.isInteger(vkId) || statistics === null) {
      answerBadRequest(res);
      return;
    }

    const updatedStatistics: Statistics = await updateUserStatistics(
      vkId,
      statistics,
      this.repository
    );
    answerSuccessOk(res, updatedStatistics);
  };

  public getStatistics = async (req: Request, res: Response): Promise<void> => {
    const vkId: number = Number(req.params.id);

    if (!Number.isInteger(vkId)) {
      answerBadRequest(res);
      return;
    }

    const statistics: Statistics = await getUserStatistics(vkId, this.repository);
    answerSuccessOk(res, statistics);
  };

  public updateAchievements = async (req: Request, res: Response): Promise<void> => {
    const vkId: number = Number(req.params.id);
    const achievements: Partial<Achievements> | null = parseAchievements(req.body);

    if (!Number.isInteger(vkId) || achievements === null) {
      answerBadRequest(res);
      return;
    }

    const updatedAchievements: Achievements = await updateUserAchievements(
      vkId,
      achievements,
      this.repository
    );
    answerSuccessOk(res, updatedAchievements);
  };

  public getAchievements = async (req: Request, res: Response): Promise<void> => {
    const vkId: number = Number(req.params.id);

    if (!Number.isInteger(vkId)) {
      answerBadRequest(res);
      return;
    }

    const achievements: Achievements = await getUserAchievements(vkId, this.repository);
    answerSuccessOk(res, achievements);
  };

  public addMistakes = async (req: Request, res: Response): Promise<void> => {
    const vkId: number = Number(req.params.id);
    const mistakeIds: number[] | null = parseNumberArray(req.body);

    if (!Number.isInteger(vkId) || mistakeIds === null) {
      answerBadRequest(res);
      return;
    }

    await addUserMistakes(vkId, mistakeIds, this.repository);
    answerSuccessOk(res);
  };

  public deleteMistakes = async (req: Request, res: Response): Promise<void> => {
    const vkId: number = Number(req.params.id);
    const mistakeIds: number[] | null = parseNumberArray(req.body);

    if (!Number.isInteger(vkId) || mistakeIds === null) {
      answerBadRequest(res);
      return;
    }

    await deleteUserMistakes(vkId, mistakeIds, this.repository);
    answerSuccessOk(res);
  };

  public getMistakes = async (req: Request, res: Response): Promise<void> => {
    const vkId: number = Number(req.params.id);

    if (!Number.isInteger(vkId)) {
      answerBadRequest(res);
      return;
    }

    const mistakeIds: number[] = await getUserMistakes(vkId, this.repository);
    answerSuccessOk(res, mistakeIds);
  };

  public addAnswers = async (req: Request, res: Response): Promise<void> => {
    const vkId: number = Number(req.params.id);
    const answers: Answer[] | null = parseAnswerArray(req.body);

    if (!Number.isInteger(vkId) || answers === null) {
      answerBadRequest(res);
      return;
    }

    const user: User = await addUserAnswers(vkId, answers, this.repository);
    answerSuccessOk(res, user);
  };
}
