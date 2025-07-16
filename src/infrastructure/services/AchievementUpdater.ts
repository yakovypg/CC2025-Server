import moment from "moment";

import { UserDocument, Achievement } from "../../models";
import { NotSupportedError } from "../errors";

export class AchievementUpdater {
  private static readonly maxLevel: number = 10;
  private static readonly nextLevelMultiplyingFactor: number = 2;

  private user: UserDocument;

  constructor(user: UserDocument) {
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

      if (achievement.level == AchievementUpdater.maxLevel) {
        achievement.currentProgress = achievement.nextLevelProgress;
        achievement.hasMaxLevel = true;
        break;
      }
    }
  };

  public updateDaysInStrike = (): void => {
    const newProgress = this.user.statistics.strikeCounter;

    if (newProgress > this.user.achievements.daysInStrike.currentProgress) {
      this.updateAchievement(this.user.achievements.daysInStrike, newProgress);
    }
  };

  public updateRightAnswers = (): void => {
    const newProgress = this.user.statistics.correctAnswers;

    if (newProgress > this.user.achievements.rightAnswers.currentProgress) {
      this.updateAchievement(this.user.achievements.rightAnswers, newProgress);
    }
  };

  public updatePerfectSeries = (): void => {
    const newProgress = this.user.statistics.bestSeries;

    if (newProgress > this.user.achievements.perfectSeries.currentProgress) {
      this.updateAchievement(this.user.achievements.perfectSeries, newProgress);
    }
  };

  public updateVeteran = (): void => {
    const currentDateMoment = moment(new Date());
    const userRegistrationMoment = moment(this.user.registrationDate);
    const newProgress = currentDateMoment.diff(userRegistrationMoment, "days");

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

  public saveChanges = async (): Promise<UserDocument> => {
    return this.user.save();
  };
}
