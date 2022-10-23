import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums";
import ApiService from "@/core/services/ApiService";

export type PriorityItem = "very-high" | "high" | "normal" | "low" | "very-low";

export type SortingProps = "newer" | "older" | "nameAsc" | "nameDesc" | "default";

export type ItemToDo = {
  id?: number;
  title: string;
  activity_group_id: number;
  is_active?: number;
  priority: PriorityItem;
};

@Module
export default class ToDoModule extends VuexModule {
  todoItems: Array<ItemToDo> = new Array();

  get getTodoItems(): Array<ItemToDo> {
    return this.todoItems;
  }

  @Mutation
  [Mutations.SET_TODO_ITEMS](todoItems: Array<ItemToDo>) {
    this.todoItems = todoItems;
  }

  @Action
  [Actions.FETCH_TODO_ITEMS](id: number) {
    return new Promise<void>((resolve, reject) => {
      ApiService.get<{ data: Array<ItemToDo> }>(`/todo-items?activity_group_id=${id}`)
        .then((res) => {
          this.context.commit(Mutations.SET_TODO_ITEMS, res.data.data);
          resolve();
        })
        .catch((err) => reject(err));
    });
  }

  @Action
  [Actions.DELETE_TODO_ITEM](id: number) {
    return new Promise<void>((resolve, reject) => {
      ApiService.delete(`/todo-items/${id}`)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  @Action
  [Actions.ADD_TODO_ITEM]({ activity_group_id, title, priority }: ItemToDo) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post(`/todo-items`, {
        activity_group_id,
        title,
        priority,
      })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  @Action
  [Actions.UPDATE_TODO_ITEM]({ id, activity_group_id, title, priority }: ItemToDo) {
    return new Promise<void>((resolve, reject) => {
      ApiService.patch(`/todo-items/${id}`, {
        activity_group_id,
        title,
        priority,
      })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}
