import { UserDocument, Statistics, Achievements } from "../models";

export interface UserRepository {
  findAll(): Promise<UserDocument[]>;
  findByVkId(vkId: number): Promise<UserDocument | null>;

  updateStatistics(vkId: number, statistics: Partial<Statistics>): Promise<UserDocument | null>;
  findStatistics(vkId: number): Promise<Statistics | null>;

  updateAchievements(vkId: number, achievements: Partial<Achievements>): Promise<UserDocument | null>;
  findAchievements(vkId: number): Promise<Achievements | null>;

  findMistakes(vkId: number): Promise<string[] | null>;
  addMistakes(vkId: number, mistakeIds: string[]): Promise<boolean>;
  deleteMistakes(vkId: number, mistakeIds: string[]): Promise<boolean>;

  addUser(vkId: number): Promise<UserDocument>;
  deleteUserByVkId(vkId: number): Promise<UserDocument | null>;
}
