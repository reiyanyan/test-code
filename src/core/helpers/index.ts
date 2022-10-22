import moment from "moment";

export const formatTime = (time: Date) => {
  moment.updateLocale("id", {});
  return moment(time, "D-M-YYYY").format("DD MMMM YYYY");
};
