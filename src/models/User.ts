import { Achievements, Statistics } from ".";

export interface User {
  vkId: number;
  statistics: Statistics;
  achievements: Achievements;
  mistakeIds: number[];
  lastResultDate: Date;
  registrationDate: Date;

  save(...args: unknown[]): Promise<this>;
}
