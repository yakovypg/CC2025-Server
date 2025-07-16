import { AchievementUpdater } from "./";
import { Answer, UserDocument } from "../../models";
import { isWithinOneDay } from "../../utils";

export class UserUpdater {
  private user: UserDocument;

  constructor(user: UserDocument) {
    this.user = user;
  }

  private updateStrikeCounterStatistics = (): void => {
    const currentDate = new Date();
    const lastResultDate = this.user.lastResultDate;
    const stillInStrike = isWithinOneDay(currentDate, lastResultDate);

    this.user.statistics.strikeCounter = stillInStrike ? this.user.statistics.strikeCounter + 1 : 0;
  };

  private updateAnswerStatistics = (answers: Answer[]): void => {
    const correctAnswers = answers.filter((t) => t.isCorrect).length;
    this.user.statistics.correctAnswers += correctAnswers;

    const incorrectAnswers = answers.filter((t) => !t.isCorrect).length;
    this.user.statistics.incorrectAnswers += incorrectAnswers;
  };

  private updateBestSeriesStatistics = (answers: Answer[]): void => {
    const firstIncorrectAnswersIndex = answers.findIndex((t) => !t.isCorrect);

    const bestSeriesDelta =
      firstIncorrectAnswersIndex < 0 ? answers.length : firstIncorrectAnswersIndex;

    this.user.statistics.bestSeries += bestSeriesDelta;
  };

  public updateStatistics = (answers: Answer[]): void => {
    this.updateStrikeCounterStatistics();
    this.updateAnswerStatistics(answers);
    this.updateBestSeriesStatistics(answers);
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

  public saveChanges = async (): Promise<UserDocument> => {
    return await this.user.save();
  };
}
