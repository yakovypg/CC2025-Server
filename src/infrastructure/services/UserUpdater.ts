import { AchievementUpdater } from ".";
import { Answer, User } from "../../models";
import { isEqualWithoutRegardToTime, isWithinOneDay } from "../../utils";

export class UserUpdater {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  private updateStrikeCounterStatistics = (): void => {
    const currentDate = new Date();
    const lastResultDate = this.user.lastResultDate;

    if (isEqualWithoutRegardToTime(currentDate, lastResultDate)) {
      return;
    }

    const stillInStrike = isWithinOneDay(currentDate, lastResultDate);

    this.user.statistics.strikeCounter = stillInStrike ? this.user.statistics.strikeCounter + 1 : 0;
  };

  private updateAnswerStatistics = (answers: Answer[]): void => {
    const correctAnswers = answers.filter((t) => t.isCorrect).length;
    this.user.statistics.correctAnswers += correctAnswers;

    const incorrectAnswers = answers.filter((t) => !t.isCorrect).length;
    this.user.statistics.incorrectAnswers += incorrectAnswers;
  };

  private updateSeriesStatistics = (answers: Answer[]): void => {
    let currentSeries = this.user.statistics.currentSeries;
    let bestSeries = this.user.statistics.bestSeries;

    answers.forEach((answer: Answer) => {
      if (!answer.isCorrect) {
        currentSeries = 0;
        return;
      }

      currentSeries++;

      if (currentSeries > bestSeries) {
        bestSeries = currentSeries;
      }
    });

    this.user.statistics.currentSeries = currentSeries;
    this.user.statistics.bestSeries = bestSeries;
  };

  public updateStatistics = (answers: Answer[]): void => {
    this.updateStrikeCounterStatistics();
    this.updateAnswerStatistics(answers);
    this.updateSeriesStatistics(answers);
  };

  public updateAchievements = (): void => {
    const achievementUpdater = new AchievementUpdater(this.user);
    achievementUpdater.updateAll();
  };

  public updateLastResultDate = (): void => {
    this.user.lastResultDate = new Date();
  };

  public updateAll = (answers: Answer[]): void => {
    this.updateStatistics(answers);
    this.updateAchievements();
    this.updateLastResultDate();
  };

  public saveChanges = async (): Promise<User> => {
    return await this.user.save();
  };
}
