export interface Answer {
  cardId: number;
  isCorrect: boolean;
}

export const isAnswer = (obj: unknown): obj is Answer => {
  return (
    obj !== null &&
    obj !== undefined &&
    typeof obj === "object" &&
    "cardId" in obj &&
    "isCorrect" in obj
  );
};
