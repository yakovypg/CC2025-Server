import {
  AchievementImpl,
  Achievements,
  AchievementsImpl,
  Answer,
  Statistics,
  StatisticsImpl
} from "../models";

export const parseArray = (data: unknown): unknown[] | null => {
  return Array.isArray(data) ? data : [data];
};

export const parseNumberArray = (data: unknown): number[] | null => {
  const arr = parseArray(data);

  if (!arr) {
    return null;
  }

  const mappedArr = arr.map((t) => Number(t));
  const isMappedArrCorrect = mappedArr.every((t) => !Number.isNaN(t));

  return isMappedArrCorrect ? mappedArr : null;
};

export const parseAnswerArray = (data: unknown): Answer[] | null => {
  const arr = parseArray(data);

  if (!arr) {
    return null;
  }

  function isAnswer(obj: unknown): obj is Answer {
    return (
      obj !== null &&
      obj !== undefined &&
      typeof obj === "object" &&
      "cardId" in obj &&
      "isCorrect" in obj
    );
  }

  const isArrCorrect = arr.every(isAnswer);

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

export const parseStatistics = (data: unknown): Partial<Statistics> | null => {
  if (!data || Array.isArray(data) || typeof data !== "object") {
    return null;
  }

  const allowedKeys = Object.keys(new StatisticsImpl());
  const bodyKeys = Object.keys(data);

  const isBodyCorrect = bodyKeys.length > 0 && bodyKeys.every((key) => allowedKeys.includes(key));

  if (!isBodyCorrect) {
    return null;
  }

  return data;
};

export const parseAchievements = (data: unknown): Partial<Achievements> | null => {
  if (!data || Array.isArray(data) || typeof data !== "object") {
    return null;
  }

  const allowedKeys = Object.keys(new AchievementsImpl());
  const allowedAchievementKeys = Object.keys(new AchievementImpl());

  const body = data as Record<string, unknown>;
  const bodyKeys = Object.keys(body);

  const isBodyCorrect =
    bodyKeys.length > 0 &&
    bodyKeys.every(
      (key) =>
        allowedKeys.includes(key) &&
        body[key] &&
        Object.keys(body[key]).every((subkey) => allowedAchievementKeys.includes(subkey))
    );

  if (!isBodyCorrect) {
    return null;
  }

  return data;
};
