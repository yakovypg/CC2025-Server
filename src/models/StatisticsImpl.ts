import { Statistics } from "./";

export class StatisticsImpl implements Statistics {
  public correctAnswers: number;
  public incorrectAnswers: number;
  public currentSeries: number;
  public bestSeries: number;
  public strikeCounter: number;

  constructor(
    correctAnswers: number = 0,
    incorrectAnswers: number = 0,
    currentSeries: number = 0,
    bestSeries: number = 0,
    strikeCounter: number = 0
  ) {
    this.correctAnswers = correctAnswers;
    this.incorrectAnswers = incorrectAnswers;
    this.currentSeries = currentSeries;
    this.bestSeries = bestSeries;
    this.strikeCounter = strikeCounter;
  }
}
