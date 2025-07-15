import { StatusCode } from "status-code-enum";
import { Request, Response } from "express";

import {
  AchievementImpl,
  Achievements,
  AchievementsImpl,
  Statistics,
  StatisticsImpl
} from "../models";

export const getNumberIdFromObject = (idData: any, res: Response): number | null => {
  const id = Number(idData);

  if (Number.isNaN(id)) {
    res.status(StatusCode.ClientErrorBadRequest).json("Invalid id");
    return null;
  }

  return id;
};

export const getIdFromBody = (req: Request): string => {
  return req.body.id;
};

export const getIdFromParams = (req: Request): string => {
  return req.params.id;
};

export const getNumberIdFromBody = (req: Request, res: Response): number | null => {
  const idData = getIdFromBody(req);
  return getNumberIdFromObject(idData, res);
};

export const getNumberIdFromParams = (req: Request, res: Response): number | null => {
  const idData = getIdFromParams(req);
  return getNumberIdFromObject(idData, res);
};

export const getArrayFromBody = (req: Request, res: Response): any[] | null => {
  const arr = req.body;

  if (!Array.isArray(arr)) {
    res.status(StatusCode.ClientErrorBadRequest).json("Invalid array");
    return null;
  }

  return arr;
};

export const getNumberArrayFromBody = (req: Request, res: Response): number[] | null => {
  const arr = getArrayFromBody(req, res);

  if (!arr) {
    return null;
  }

  const mappedArr = arr.map((t) => Number(t));
  const isMappedArrCorrect = mappedArr.some((t) => Number.isNaN(t));

  if (isMappedArrCorrect) {
    res.status(StatusCode.ClientErrorBadRequest).json("Invalid array");
    return null;
  }

  return mappedArr;
};

export const getStatisticsFromBody = (req: Request, res: Response): Partial<Statistics> | null => {
  const allowedKeys = Object.keys(new StatisticsImpl());
  const bodyKeys = Object.keys(req.body);

  const isBodyCorrect = bodyKeys.length > 0 && bodyKeys.every((key) => allowedKeys.includes(key));

  if (!isBodyCorrect) {
    res.status(StatusCode.ClientErrorBadRequest).json("Invalid statistics");
    return null;
  }

  return req.body;
};

export const getAchievementsFromBody = (
  req: Request,
  res: Response
): Partial<Achievements> | null => {
  const allowedKeys = Object.keys(new AchievementsImpl());
  const allowedAchievementKeys = Object.keys(new AchievementImpl());

  const body = req.body;
  const bodyKeys = Object.keys(body);

  const isBodyCorrect =
    bodyKeys.length > 0 &&
    bodyKeys.every(
      (key) =>
        allowedKeys.includes(key) &&
        Object.keys(body[key]).every((subkey) => allowedAchievementKeys.includes(subkey))
    );

  if (!isBodyCorrect) {
    res.status(StatusCode.ClientErrorBadRequest).json("Invalid achievements");
    return null;
  }

  return req.body;
};
