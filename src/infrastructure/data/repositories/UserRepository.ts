import { Achievements, Statistics, User } from "../../../models";

export interface UserRepository {
  findAll(): Promise<User[]>;
  findByVkId(vkId: number): Promise<User | null>;

  updateStatistics(vkId: number, statistics: Partial<Statistics>): Promise<User | null>;
  findStatistics(vkId: number): Promise<Statistics | null>;

  updateAchievements(vkId: number, achievements: Partial<Achievements>): Promise<User | null>;
  findAchievements(vkId: number): Promise<Achievements | null>;

  findMistakes(vkId: number): Promise<number[] | null>;
  addMistakes(vkId: number, mistakeIds: number[]): Promise<boolean>;
  deleteMistakes(vkId: number, mistakeIds: number[]): Promise<boolean>;

  addUser(vkId: number): Promise<User>;
  deleteUserByVkId(vkId: number): Promise<User | null>;
}
