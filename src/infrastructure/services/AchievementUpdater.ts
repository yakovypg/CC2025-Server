import moment from "moment";

import { User, Achievement } from "../../models";
import { NotSupportedError } from "../errors";

export class AchievementUpdater {
  private static readonly maxLevel: number = 10;
  private static readonly nextLevelMultiplyingFactor: number = 2;

  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  private updateAchievement = (achievement: Achievement, newProgress: number): void => {
    if (newProgress < achievement.currentProgress) {
      throw new NotSupportedError("Progress reduction of achievements is not supported");
    }

    if (achievement.currentProgress === newProgress || achievement.hasMaxLevel) {
      return;
    }

    achievement.currentProgress = newProgress;

    while (achievement.currentProgress >= achievement.nextLevelProgress) {
      achievement.nextLevelProgress *= AchievementUpdater.nextLevelMultiplyingFactor;
      achievement.level++;

      if (achievement.level === AchievementUpdater.maxLevel) {
        achievement.currentProgress = achievement.nextLevelProgress;
        achievement.hasMaxLevel = true;
        break;
      }
    }
  };

  public updateDaysInStrike = (): void => {
    const newProgress: number = this.user.statistics.strikeCounter;

    if (newProgress > this.user.achievements.daysInStrike.currentProgress) {
      this.updateAchievement(this.user.achievements.daysInStrike, newProgress);
    }
  };

  public updateRightAnswers = (): void => {
    const newProgress: number = this.user.statistics.correctAnswers;

    if (newProgress > this.user.achievements.rightAnswers.currentProgress) {
      this.updateAchievement(this.user.achievements.rightAnswers, newProgress);
    }
  };

  public updatePerfectSeries = (): void => {
    const newProgress: number = this.user.statistics.bestSeries;

    if (newProgress > this.user.achievements.perfectSeries.currentProgress) {
      this.updateAchievement(this.user.achievements.perfectSeries, newProgress);
    }
  };

  public updateVeteran = (): void => {
    const currentDateMoment: moment.Moment = moment(new Date()).startOf("day");
    const userRegistrationMoment: moment.Moment = moment(this.user.registrationDate).startOf("day");
    const newProgress: number = currentDateMoment.diff(userRegistrationMoment, "days");

    if (newProgress > this.user.achievements.veteran.currentProgress) {
      this.updateAchievement(this.user.achievements.veteran, newProgress);
    }
  };

  public updateAll = (): void => {
    this.updateDaysInStrike();
    this.updateRightAnswers();
    this.updatePerfectSeries();
    this.updateVeteran();
  };

  public saveChanges = async (): Promise<User> => {
    return this.user.save();
  };
}
