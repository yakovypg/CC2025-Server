import { Request, Response } from "express";

import {
  safeInvoke,
  parseAnswerArray,
  parseNumberArray,
  parseStatistics,
  parseAchievements,
  answerSuccessCreated,
  answerBadRequest,
  answerSuccessOk
} from "../../utils";

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

export class UserController {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public addUser = async (req: Request, res: Response): Promise<void> => {
    const vkId = Number(req.body.id);

    if (!Number.isInteger(vkId)) {
      answerBadRequest(res);
      return;
    }

    await safeInvoke(res, async () => {
      const user = await addUser(vkId, this.repository);
      answerSuccessCreated(res, user);
    });
  };

  public getUser = async (req: Request, res: Response): Promise<void> => {
    const vkId = Number(req.params.id);

    if (!Number.isInteger(vkId)) {
      answerBadRequest(res);
      return;
    }

    await safeInvoke(res, async () => {
      const user = await getUser(vkId, this.repository);
      answerSuccessOk(res, user);
    });
  };

  public updateStatistics = async (req: Request, res: Response): Promise<void> => {
    const vkId = Number(req.params.id);
    const statistics = parseStatistics(req.body);

    if (!Number.isInteger(vkId) || !statistics) {
      answerBadRequest(res);
      return;
    }

    await safeInvoke(res, async () => {
      const updatedStatistics = await updateUserStatistics(vkId, statistics, this.repository);
      answerSuccessOk(res, updatedStatistics);
    });
  };

  public getStatistics = async (req: Request, res: Response): Promise<void> => {
    const vkId = Number(req.params.id);

    if (!Number.isInteger(vkId)) {
      answerBadRequest(res);
      return;
    }

    await safeInvoke(res, async () => {
      const statistics = await getUserStatistics(vkId, this.repository);
      answerSuccessOk(res, statistics);
    });
  };

  public updateAchievements = async (req: Request, res: Response): Promise<void> => {
    const vkId = Number(req.params.id);
    const achievements = parseAchievements(req.body);

    if (!Number.isInteger(vkId) || !achievements) {
      answerBadRequest(res);
      return;
    }

    await safeInvoke(res, async () => {
      const updatedAchievements = await updateUserAchievements(vkId, achievements, this.repository);
      answerSuccessOk(res, updatedAchievements);
    });
  };

  public getAchievements = async (req: Request, res: Response): Promise<void> => {
    const vkId = Number(req.params.id);

    if (!Number.isInteger(vkId)) {
      answerBadRequest(res);
      return;
    }

    await safeInvoke(res, async () => {
      const achievements = await getUserAchievements(vkId, this.repository);
      answerSuccessOk(res, achievements);
    });
  };

  public addMistakes = async (req: Request, res: Response): Promise<void> => {
    const vkId = Number(req.params.id);
    const mistakeIds = parseNumberArray(req.body);

    if (!Number.isInteger(vkId) || !mistakeIds) {
      answerBadRequest(res);
      return;
    }

    await safeInvoke(res, async () => {
      await addUserMistakes(vkId, mistakeIds, this.repository);
      answerSuccessOk(res);
    });
  };

  public deleteMistakes = async (req: Request, res: Response): Promise<void> => {
    const vkId = Number(req.params.id);
    const mistakeIds = parseNumberArray(req.body);

    if (!Number.isInteger(vkId) || !mistakeIds) {
      answerBadRequest(res);
      return;
    }

    await safeInvoke(res, async () => {
      await deleteUserMistakes(vkId, mistakeIds, this.repository);
      answerSuccessOk(res);
    });
  };

  public getMistakes = async (req: Request, res: Response): Promise<void> => {
    const vkId = Number(req.params.id);

    if (!Number.isInteger(vkId)) {
      answerBadRequest(res);
      return;
    }

    await safeInvoke(res, async () => {
      const mistakeIds = await getUserMistakes(vkId, this.repository);
      answerSuccessOk(res, mistakeIds);
    });
  };

  public addAnswers = async (req: Request, res: Response): Promise<void> => {
    const vkId = Number(req.params.id);
    const answers = parseAnswerArray(req.body);

    if (!Number.isInteger(vkId) || !answers) {
      answerBadRequest(res);
      return;
    }

    await safeInvoke(res, async () => {
      const user = await addUserAnswers(vkId, answers, this.repository);
      answerSuccessOk(res, user);
    });
  };
}
