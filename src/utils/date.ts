import moment from "moment";

export const isEqualWithoutRegardToTime = (lhs: Date, rhs: Date): boolean => {
  const lhsMoment = moment(lhs);
  const rhsMoment = moment(rhs);

  return lhsMoment.isSame(rhsMoment, "day");
};

export const isWithinOneDay = (currDate: Date, prevDate: Date): boolean => {
  if (currDate < prevDate) {
    return false;
  }

  const currMoment = moment(currDate);
  const prevMoment = moment(prevDate);
  const maxAcceptedMoment = prevMoment.add(1, "days");

  return currMoment.isBefore(maxAcceptedMoment);
};
