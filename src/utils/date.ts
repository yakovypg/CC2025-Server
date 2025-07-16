import moment from "moment";

export const isWithinOneDay = (currDate: Date, prevDate: Date): boolean => {
  if (currDate < prevDate) {
    return false;
  }

  const currMoment = moment(currDate);
  const prevMoment = moment(prevDate);
  const maxAcceptedMoment = prevMoment.add(1, "days");

  return currMoment.isBefore(maxAcceptedMoment);
};
