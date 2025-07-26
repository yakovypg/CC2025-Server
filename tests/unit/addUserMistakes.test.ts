jest.mock("../../src/infrastructure/loggers");

import { addUserMistakes } from "../../src/infrastructure/commands";
import { UserRepository } from "../../src/infrastructure/data/repositories";
import { UserNotFoundError } from "../../src/infrastructure/errors";
import { AchievementsImpl, StatisticsImpl, User } from "../../src/models";

describe("addUserMistakes", () => {
  const userVkId = 1;
  const mistakeIds = [1, 3, 3, 5, 5, 6];

  const mockRepository: Partial<UserRepository> = {
    findByVkId: jest.fn(),
    addMistakes: jest.fn()
  };

  const user: User = {
    vkId: userVkId,
    statistics: new StatisticsImpl(),
    achievements: new AchievementsImpl(),
    mistakeIds: [1, 2, 5],
    lastResultDate: new Date(1, 0, 1),
    registrationDate: new Date(),
    save: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (mockRepository.findByVkId as jest.Mock).mockResolvedValue(user);
    (user.save as jest.Mock).mockResolvedValue(user);
  });

  it("should add mistakes to the user without duplicates", async () => {
    (mockRepository.addMistakes as jest.Mock).mockImplementation(async (_vkId, newMistakes) => {
      user.mistakeIds = Array.from(new Set([...user.mistakeIds, ...newMistakes]));
      return true;
    });

    await addUserMistakes(userVkId, mistakeIds, mockRepository as UserRepository);

    expect(mockRepository.addMistakes).toHaveBeenCalledWith(userVkId, mistakeIds);
    expect(user.mistakeIds.sort()).toEqual([1, 2, 3, 5, 6]);
  });

  it("should throw UserNotFoundError if user does not exist", async () => {
    (mockRepository.findByVkId as jest.Mock).mockResolvedValue(null);
    (mockRepository.addMistakes as jest.Mock).mockResolvedValue(false);

    await expect(
      addUserMistakes(userVkId, mistakeIds, mockRepository as UserRepository)
    ).rejects.toThrow(UserNotFoundError);
  });
});
