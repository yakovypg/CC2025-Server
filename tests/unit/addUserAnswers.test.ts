jest.mock("../../src/infrastructure/loggers");

import { addUserAnswers } from "../../src/infrastructure/commands";
import { UserRepository } from "../../src/infrastructure/data/repositories";
import { UserNotFoundError } from "../../src/infrastructure/errors";
import { AchievementsImpl, Answer, StatisticsImpl, User } from "../../src/models";

describe("addUserAnswers", () => {
  const userVkId: number = 1;

  const answers: Answer[] = [
    { cardId: 1, isCorrect: true },
    { cardId: 2, isCorrect: true },
    { cardId: 3, isCorrect: true },
    { cardId: 4, isCorrect: false },
    { cardId: 5, isCorrect: true },
    { cardId: 6, isCorrect: true }
  ];

  const mockRepository: Partial<UserRepository> = {
    findByVkId: jest.fn(),
    addMistakes: jest.fn()
  };

  const user: User = {
    vkId: userVkId,
    statistics: new StatisticsImpl(),
    achievements: new AchievementsImpl(),
    mistakeIds: [],
    lastResultDate: new Date(1, 0, 1),
    registrationDate: new Date(),
    save: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (mockRepository.findByVkId as jest.Mock).mockResolvedValue(user);
    (user.save as jest.Mock).mockResolvedValue(user);
  });

  it("should add answers to the user and update statistics and achievements", async () => {
    (mockRepository.addMistakes as jest.Mock).mockResolvedValue(true);

    const result: User = await addUserAnswers(userVkId, answers, mockRepository as UserRepository);

    expect(result).toBe(user);

    expect(mockRepository.findByVkId).toHaveBeenCalledWith(userVkId);
    expect(mockRepository.addMistakes).toHaveBeenCalledWith(userVkId, [4]);

    expect(user.statistics.correctAnswers).toBe(5);
    expect(user.statistics.incorrectAnswers).toBe(1);
    expect(user.statistics.currentSeries).toBe(2);
    expect(user.statistics.bestSeries).toBe(3);
    expect(user.statistics.strikeCounter).toBe(0);

    expect(user.achievements.daysInStrike.currentProgress).toBe(0);
    expect(user.achievements.daysInStrike.nextLevelProgress).toBe(1);
    expect(user.achievements.daysInStrike.level).toBe(0);
    expect(user.achievements.daysInStrike.hasMaxLevel).toBe(false);

    expect(user.achievements.rightAnswers.currentProgress).toBe(5);
    expect(user.achievements.rightAnswers.nextLevelProgress).toBe(2 ** Math.ceil(Math.log2(5 + 1)));
    expect(user.achievements.rightAnswers.level).toBe(Math.ceil(Math.log2(5 + 1)));
    expect(user.achievements.rightAnswers.hasMaxLevel).toBe(false);

    expect(user.achievements.perfectSeries.currentProgress).toBe(3);

    expect(user.achievements.perfectSeries.nextLevelProgress).toBe(
      2 ** Math.ceil(Math.log2(3 + 1))
    );

    expect(user.achievements.perfectSeries.level).toBe(Math.ceil(Math.log2(3 + 1)));
    expect(user.achievements.perfectSeries.hasMaxLevel).toBe(false);

    expect(user.achievements.veteran.currentProgress).toBe(0);
    expect(user.achievements.veteran.nextLevelProgress).toBe(1);
    expect(user.achievements.veteran.level).toBe(0);
    expect(user.achievements.veteran.hasMaxLevel).toBe(false);
  });

  it("should throw UserNotFoundError if user does not exist", async () => {
    (mockRepository.findByVkId as jest.Mock).mockResolvedValue(null);

    await expect(
      addUserAnswers(userVkId, answers, mockRepository as UserRepository)
    ).rejects.toThrow(UserNotFoundError);
  });
});
