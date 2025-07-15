import { Achievement } from "./";

export class AchievementImpl implements Achievement {
  public currentProgress: number;
  public nextLevelProgress: number;
  public level: number;
  public hasMaxLevel: boolean;

  constructor(
    currentProgress: number = 0,
    nextLevelProgress: number = 0,
    level: number = 0,
    hasMaxLevel: boolean = false
  ) {
    this.currentProgress = currentProgress;
    this.nextLevelProgress = nextLevelProgress;
    this.level = level;
    this.hasMaxLevel = hasMaxLevel;
  }
}
