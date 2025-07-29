import {
  AchievementImpl,
  Achievements,
  AchievementsImpl,
  Answer,
  Statistics,
  StatisticsImpl,
  isAnswer
} from "../models";

export const parseArray = (data: unknown): unknown[] | null => {
  return Array.isArray(data) ? data : [data];
};

export const parseNumberArray = (data: unknown): number[] | null => {
  const arr: unknown[] | null = parseArray(data);

  if (arr === null) {
    return null;
  }

  const mappedArr: number[] = arr.map((t: unknown) => Number(t));
  const isMappedArrCorrect: boolean = mappedArr.every((t: number) => !Number.isNaN(t));

  return isMappedArrCorrect ? mappedArr : null;
};

export const parseAnswerArray = (data: unknown): Answer[] | null => {
  const arr: unknown[] | null = parseArray(data);

  if (arr === null) {
    return null;
  }

  const isArrCorrect: boolean = arr.every(isAnswer);

  if (!isArrCorrect) {
    return null;
  }

  const mappedArr: Answer[] = arr.map((t: unknown) =>
    isAnswer(t)
      ? {
          cardId: Number(t.cardId),
          isCorrect: Boolean(Number(t.isCorrect))
        }
      : {
          cardId: -1,
          isCorrect: false
        }
  );

  const isMappedArrCorrect: boolean = mappedArr.every((t: Answer) => !Number.isNaN(t.cardId));

  return isMappedArrCorrect ? mappedArr : null;
};

export const parseStatistics = (data: unknown): Partial<Statistics> | null => {
  if (!data || Array.isArray(data) || typeof data !== "object") {
    return null;
  }

  const allowedKeys: string[] = Object.keys(new StatisticsImpl());
  const bodyKeys: string[] = Object.keys(data);

  const isBodyCorrect: boolean =
    bodyKeys.length > 0 && bodyKeys.every((key: string) => allowedKeys.includes(key));

  if (!isBodyCorrect) {
    return null;
  }

  return data;
};

export const parseAchievements = (data: unknown): Partial<Achievements> | null => {
  if (!data || Array.isArray(data) || typeof data !== "object") {
    return null;
  }

  const allowedKeys: string[] = Object.keys(new AchievementsImpl());
  const allowedAchievementKeys: string[] = Object.keys(new AchievementImpl());

  const body: Record<string, unknown> = data as Record<string, unknown>;
  const bodyKeys: string[] = Object.keys(body);

  const isBodyCorrect: boolean =
    bodyKeys.length > 0 &&
    bodyKeys.every(
      (key: string) =>
        allowedKeys.includes(key) &&
        body[key] &&
        Object.keys(body[key]).every((subkey: string) => allowedAchievementKeys.includes(subkey))
    );

  if (!isBodyCorrect) {
    return null;
  }

  return data;
};
