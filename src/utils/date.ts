import moment from "moment";

export const isEqualWithoutRegardToTime = (lhs: Date, rhs: Date): boolean => {
  const lhsMoment: moment.Moment = moment(lhs);
  const rhsMoment: moment.Moment = moment(rhs);

  return lhsMoment.isSame(rhsMoment, "day");
};

export const isWithinOneDay = (currDate: Date, prevDate: Date): boolean => {
  if (currDate < prevDate) {
    return false;
  }

  const currMoment: moment.Moment = moment(currDate);
  const prevMoment: moment.Moment = moment(prevDate);
  const maxAcceptedMoment: moment.Moment = prevMoment.add(1, "days");

  return currMoment.isBefore(maxAcceptedMoment);
};
