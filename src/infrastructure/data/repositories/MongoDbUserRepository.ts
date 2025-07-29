import { UpdateWriteOpResult } from "mongoose";

import { UserRepository } from "./";
import {
  UserModel,
  UserDocument,
  Statistics,
  Achievements,
  AchievementsDocument,
  StatisticsDocument,
  StatisticsImpl,
  AchievementsImpl
} from "../../../models";

export class MongoDbUserRepository implements UserRepository {
  public findAll = async (): Promise<UserDocument[]> => {
    return UserModel.find().exec();
  };

  public findByVkId = async (vkId: number): Promise<UserDocument | null> => {
    return UserModel.findOne({ vkId }).exec();
  };

  public findStatistics = async (vkId: number): Promise<StatisticsDocument | null> => {
    const user: UserDocument | null = await this.findByVkId(vkId);
    return user?.statistics ?? null;
  };

  public updateStatistics = async (
    vkId: number,
    statistics: Partial<Statistics>
  ): Promise<UserDocument | null> => {
    const user: UserDocument | null = await this.findByVkId(vkId);

    if (user === null) {
      return null;
    }

    Object.assign(user.statistics, statistics);
    return await user.save();
  };

  public findAchievements = async (vkId: number): Promise<AchievementsDocument | null> => {
    const user: UserDocument | null = await this.findByVkId(vkId);
    return user?.achievements ?? null;
  };

  public updateAchievements = async (
    vkId: number,
    achievements: Partial<Achievements>
  ): Promise<UserDocument | null> => {
    const user: UserDocument | null = await this.findByVkId(vkId);

    if (user === null) {
      return null;
    }

    Object.assign(user.achievements, achievements);
    return await user.save();
  };

  public findMistakes = async (vkId: number): Promise<number[] | null> => {
    const user: UserDocument | null = await this.findByVkId(vkId);
    return user?.mistakeIds ?? null;
  };

  public addMistakes = async (vkId: number, mistakeIds: number[]): Promise<boolean> => {
    const result: UpdateWriteOpResult = await UserModel.updateOne(
      { vkId },
      { $addToSet: { mistakeIds: { $each: mistakeIds } } }
    ).exec();

    return result.matchedCount > 0;
  };

  public deleteMistakes = async (vkId: number, mistakeIds: number[]): Promise<boolean> => {
    const result: UpdateWriteOpResult = await UserModel.updateOne(
      { vkId },
      { $pull: { mistakeIds: { $in: mistakeIds } } }
    ).exec();

    return result.matchedCount > 0;
  };

  public addUser = async (vkId: number): Promise<UserDocument> => {
    const user: UserDocument = new UserModel({
      vkId,
      statistics: new StatisticsImpl(),
      achievements: new AchievementsImpl(),
      mistakeIds: [],
      lastResultDate: new Date(1, 0, 1),
      registrationDate: new Date()
    });

    return user.save();
  };

  public deleteUserByVkId = async (vkId: number): Promise<UserDocument | null> => {
    return UserModel.findOneAndDelete({ vkId }).exec();
  };
}
