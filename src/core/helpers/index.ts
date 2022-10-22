import moment from "moment";
import "moment/dist/locale/id";
import { ItemToDo, PriorityItem } from "../../store/modules/ToDoModule";

export const formatTime = (time: Date) => {
  moment.updateLocale("id", {});
  return moment(time, "D-M-YYYY").format("DD MMMM YYYY");
};

export const BindingClassPriority = (priority: PriorityItem) => {
  return {
    "bg-very-high": priority === "very-high",
    "bg-high": priority === "high",
    "bg-medium": priority === "normal",
    "bg-low": priority === "low",
    "bg-very-low": priority === "very-low",
  };
};
