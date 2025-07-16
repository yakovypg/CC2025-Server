import { Request, Response } from "express";
import { StatusCode } from "status-code-enum";

import {
  safeInvoke,
  getNumberIdFromBody,
  getNumberIdFromParams,
  getArrayFromBody,
  getAnswerArrayFromBody,
  getStatisticsFromBody,
  getAchievementsFromBody
} from "../utils";

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
} from "../commands";

import { UserRepository } from "../repositories";

export class UserController {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public addUser = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromBody(req, res);

    if (!vkId) {
      return;
    }

    await safeInvoke(
      res,
      async () => await addUser(res, vkId, this.repository),
      StatusCode.ClientErrorBadRequest,
      "Cannot create user"
    );
  };

  public getUser = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);

    if (!vkId) {
      return;
    }

    await safeInvoke(res, async () => {
      await getUser(res, vkId, this.repository);
    });
  };

  public updateStatistics = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);
    const statistics = getStatisticsFromBody(req, res);

    if (!vkId || !statistics) {
      return;
    }

    await safeInvoke(res, async () => {
      await updateUserStatistics(res, vkId, statistics, this.repository);
    });
  };

  public getStatistics = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);

    if (!vkId) {
      return;
    }

    await safeInvoke(res, async () => {
      await getUserStatistics(res, vkId, this.repository);
    });
  };

  public updateAchievements = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);
    const achievements = getAchievementsFromBody(req, res);

    if (!vkId || !achievements) {
      return;
    }

    await safeInvoke(res, async () => {
      await updateUserAchievements(res, vkId, achievements, this.repository);
    });
  };

  public getAchievements = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);

    if (!vkId) {
      return;
    }

    await safeInvoke(res, async () => {
      await getUserAchievements(res, vkId, this.repository);
    });
  };

  public addMistakes = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);
    const mistakeIds = getArrayFromBody(req, res);

    if (!vkId || !mistakeIds) {
      return;
    }

    await safeInvoke(res, async () => {
      await addUserMistakes(res, vkId, mistakeIds, this.repository);
    });
  };

  public deleteMistakes = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);
    const mistakeIds = getArrayFromBody(req, res);

    if (!vkId || !mistakeIds) {
      return;
    }

    await safeInvoke(res, async () => {
      deleteUserMistakes(res, vkId, mistakeIds, this.repository);
    });
  };

  public getMistakes = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);

    if (!vkId) {
      return;
    }

    await safeInvoke(res, async () => {
      getUserMistakes(res, vkId, this.repository);
    });
  };

  public addAnswers = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);
    const answers = getAnswerArrayFromBody(req, res);

    if (!vkId || !answers) {
      return;
    }

    await safeInvoke(res, async () => {
      await addUserAnswers(res, vkId, answers, this.repository);
    });
  };
}
