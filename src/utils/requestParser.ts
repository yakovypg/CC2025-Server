import {
  AchievementImpl,
  Achievements,
  AchievementsImpl,
  Answer,
  Statistics,
  StatisticsImpl
} from "../models";

export const parseArray = (data: any): any[] | null => {
  return Array.isArray(data) ? data : [data];
};

export const parseNumberArray = (data: any): number[] | null => {
  const arr = parseArray(data);

  if (!arr) {
    return null;
  }

  const mappedArr = arr.map((t) => Number(t));
  const isMappedArrCorrect = mappedArr.every((t) => !Number.isNaN(t));

  return isMappedArrCorrect ? mappedArr : null;
};

export const parseAnswerArray = (data: any): Answer[] | null => {
  const arr = parseArray(data);

  if (!arr) {
    return null;
  }

  const isArrCorrect = arr.every((t) => t.cardId !== undefined && t.isCorrect !== undefined);

  if (!isArrCorrect) {
    return null;
  }

  const mappedArr: Answer[] = arr.map((t) => ({
    cardId: Number(t.cardId),
    isCorrect: Boolean(Number(t.isCorrect))
  }));

  const isMappedArrCorrect = mappedArr.every((t) => !Number.isNaN(t.cardId));

  return isMappedArrCorrect ? mappedArr : null;
};

export const parseStatistics = (data: any): Partial<Statistics> | null => {
  const allowedKeys = Object.keys(new StatisticsImpl());
  const bodyKeys = Object.keys(data);

  const isBodyCorrect = bodyKeys.length > 0 && bodyKeys.every((key) => allowedKeys.includes(key));

  if (!isBodyCorrect) {
    return null;
  }

  return data;
};

export const parseAchievements = (data: any): Partial<Achievements> | null => {
  const allowedKeys = Object.keys(new AchievementsImpl());
  const allowedAchievementKeys = Object.keys(new AchievementImpl());

  const body = data;
  const bodyKeys = Object.keys(body);

  const isBodyCorrect =
    bodyKeys.length > 0 &&
    bodyKeys.every(
      (key) =>
        allowedKeys.includes(key) &&
        Object.keys(body[key]).every((subkey) => allowedAchievementKeys.includes(subkey))
    );

  if (!isBodyCorrect) {
    return null;
  }

  return data;
};
