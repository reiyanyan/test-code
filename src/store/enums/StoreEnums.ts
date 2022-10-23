enum Actions {
  FETCH_ACTIVITY_GROUPS = "fetchActivityGroups",
  DELETE_ACTIVITY_GROUP = "deleteActivityGroup",
  ADD_ACTIVITY_GROUP = "addActivityGroup",
  UPDATE_ACTIVITY_GROUP = "updateActivityGroup",
  INFO_ACTIVITY_GROUP = "infoActivityGroup",
  FETCH_TODO_ITEMS = "fetchToDoItems",
  DELETE_TODO_ITEM = "deleteToDoItem",
  ADD_TODO_ITEM = "addToDoItem",
  UPDATE_TODO_ITEM = "updateToDoItem",
  UPDATE_STATUS_TODO_ITEM = "updateStatusToDoItem",
}

enum Mutations {
  SET_DATA_ACTIVITY_GROUPS = "setDataActivityGroups",
  SET_TODO_ITEMS = "setToDoItems",
}

export { Actions, Mutations };
