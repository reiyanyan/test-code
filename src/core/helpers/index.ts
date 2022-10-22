import moment from "moment";
import "moment/dist/locale/id";

export const formatTime = (time: Date) => {
  moment.updateLocale("id", {});
  return moment(time, "D-M-YYYY").format("DD MMMM YYYY");
};
