import { Request, Response } from "express";
import { StatusCode } from "status-code-enum";

import {
  safeInvoke,
  getNumberIdFromBody,
  getNumberIdFromParams,
  getNumberArrayFromBody,
  getStatisticsFromBody,
  getAchievementsFromBody
} from "../utils";

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
      async () => {
        const user = await this.repository.addUser(vkId);
        res.status(StatusCode.SuccessCreated).json(user);
      },
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
      const user = await this.repository.findByVkId(vkId);

      if (!user) {
        res.status(StatusCode.ClientErrorNotFound).json("User not found");
        return;
      }

      res.status(StatusCode.SuccessOK).json(user);
    });
  };

  public updateStatistics = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);
    const statistics = getStatisticsFromBody(req, res);

    if (!vkId || !statistics) {
      return;
    }

    await safeInvoke(res, async () => {
      const user = await this.repository.updateStatistics(vkId, statistics);

      if (!user) {
        res.status(StatusCode.ClientErrorNotFound).json("User statistics not found");
        return;
      }

      res.status(StatusCode.SuccessOK).json(user.statistics);
    });
  };

  public getStatistics = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);

    if (!vkId) {
      return;
    }

    await safeInvoke(res, async () => {
      const statistics = await this.repository.findStatistics(vkId);

      if (!statistics) {
        res.status(StatusCode.ClientErrorNotFound).json("User statistics not found");
        return;
      }

      res.status(StatusCode.SuccessOK).json(statistics);
    });
  };

  public updateAchievements = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);
    const achievements = getAchievementsFromBody(req, res);

    if (!vkId || !achievements) {
      return;
    }

    await safeInvoke(res, async () => {
      const user = await this.repository.updateAchievements(vkId, achievements);

      if (!user) {
        res.status(StatusCode.ClientErrorNotFound).json("User achievements not found");
        return;
      }

      res.status(StatusCode.SuccessOK).json(user.achievements);
    });
  };

  public getAchievements = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);

    if (!vkId) {
      return;
    }

    await safeInvoke(res, async () => {
      const achievement = await this.repository.findAchievements(vkId);

      if (!achievement) {
        res.status(StatusCode.ClientErrorNotFound).json("User achievements not found");
        return;
      }

      res.status(StatusCode.SuccessOK).json(achievement);
    });
  };

  public addMistakes = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);
    const mistakeIds = getNumberArrayFromBody(req, res);

    if (!vkId || !mistakeIds) {
      return;
    }

    await safeInvoke(res, async () => {
      const ok = await this.repository.addMistakes(vkId, mistakeIds);

      if (!ok) {
        res.status(StatusCode.ClientErrorNotFound).json("User not found");
        return;
      }

      res.status(StatusCode.SuccessCreated).json("OK");
    });
  };

  public deleteMistakes = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);
    const mistakeIds = getNumberArrayFromBody(req, res);

    if (!vkId || !mistakeIds) {
      return;
    }

    await safeInvoke(res, async () => {
      const ok = await this.repository.deleteMistakes(vkId, mistakeIds);

      if (!ok) {
        res.status(StatusCode.ClientErrorNotFound).json("User not found");
        return;
      }

      res.status(StatusCode.SuccessOK).json("OK");
    });
  };

  public getMistakes = async (req: Request, res: Response): Promise<void> => {
    const vkId = getNumberIdFromParams(req, res);

    if (!vkId) {
      return;
    }

    await safeInvoke(res, async () => {
      const mistakes = await this.repository.findMistakes(vkId);

      if (!mistakes) {
        res.status(StatusCode.ClientErrorNotFound).json("User not found");
        return;
      }

      res.status(StatusCode.SuccessOK).json(mistakes);
    });
  };
}
