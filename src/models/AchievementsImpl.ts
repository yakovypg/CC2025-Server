import { Achievement, Achievements, AchievementImpl } from ".";

export class AchievementsImpl implements Achievements {
  public daysInStrike: Achievement;
  public rightAnswers: Achievement;
  public perfectSeries: Achievement;
  public veteran: Achievement;

  constructor(
    daysInStrike: Achievement = new AchievementImpl(),
    rightAnswers: Achievement = new AchievementImpl(),
    perfectSeries: Achievement = new AchievementImpl(),
    veteran: Achievement = new AchievementImpl()
  ) {
    this.daysInStrike = daysInStrike;
    this.rightAnswers = rightAnswers;
    this.perfectSeries = perfectSeries;
    this.veteran = veteran;
  }
}
