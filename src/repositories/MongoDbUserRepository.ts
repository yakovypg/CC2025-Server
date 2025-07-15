import {
  UserModel,
  User,
  Statistics,
  Achievements,
  StatisticsImpl,
  AchievementsImpl
} from "../models";

import { UserRepository } from "./";

export class MongoDbUserRepository implements UserRepository {
  public findAll = async (): Promise<User[]> => {
    return UserModel.find().exec();
  };

  public findByVkId = async (vkId: number): Promise<User | null> => {
    return UserModel.findOne({ vkId }).exec();
  };

  public findStatistics = async (vkId: number): Promise<Statistics | null> => {
    const user = await this.findByVkId(vkId);
    return user?.statistics ?? null;
  };

  public updateStatistics = async (
    vkId: number,
    statistics: Partial<Statistics>
  ): Promise<User | null> => {
    const user = await this.findByVkId(vkId);

    if (!user) {
      return null;
    }

    Object.assign(user.statistics, statistics);
    return await user.save();
  };

  public findAchievements = async (vkId: number): Promise<Achievements | null> => {
    const user = await this.findByVkId(vkId);
    return user?.achievements ?? null;
  };

  public updateAchievements = async (
    vkId: number,
    achievements: Partial<Achievements>
  ): Promise<User | null> => {
    const user = await this.findByVkId(vkId);

    if (!user) {
      return null;
    }

    Object.assign(user.achievements, achievements);
    return await user.save();
  };

  public findMistakes = async (vkId: number): Promise<number[] | null> => {
    const user = await this.findByVkId(vkId);
    return user?.mistakeIds ?? null;
  };

  public addMistakes = async (vkId: number, mistakeIds: number[]): Promise<boolean> => {
    const result = await UserModel.updateOne(
      { vkId },
      { $addToSet: { mistakeIds: { $each: mistakeIds } } }
    ).exec();

    return result.matchedCount > 0;
  };

  public deleteMistakes = async (vkId: number, mistakeIds: number[]): Promise<boolean> => {
    const result = await UserModel.updateOne(
      { vkId },
      { $pull: { mistakeIds: { $in: mistakeIds } } }
    ).exec();

    return result.matchedCount > 0;
  };

  public addUser = async (vkId: number): Promise<User> => {
    const user = new UserModel({
      vkId,
      statistics: new StatisticsImpl(),
      achievements: new AchievementsImpl(),
      mistakeIds: []
    });

    return user.save();
  };

  public deleteUserByVkId = async (vkId: number): Promise<User | null> => {
    return UserModel.findOneAndDelete({ vkId }).exec();
  };
}
