import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import ApiService from "@/core/services/ApiService";

export type ItemActivity = {
  id: number;
  title: string;
  created_at: Date;
};

const email = "rei@mail.com";

type A = {
  data: Array<ItemActivity>;
  limit: number;
  skip: number;
  total: number;
};
@Module
export default class ActivityModule extends VuexModule {
  dataActivityGroups: Array<ItemActivity> = new Array();

  get getDataActivityGroups(): Array<ItemActivity> {
    return this.dataActivityGroups;
  }

  @Mutation
  [Mutations.SET_DATA_ACTIVITY_GROUPS](dataActivityGroups: Array<ItemActivity>) {
    this.dataActivityGroups = dataActivityGroups;
  }

  @Action
  [Actions.FETCH_ACTIVITY_GROUPS]() {
    return new Promise<void>((resolve, reject) => {
      ApiService.get<{ data: Array<ItemActivity> }>("/activity-groups", {
        params: {
          email,
        },
      })
        .then((res) => {
          this.context.commit(Mutations.SET_DATA_ACTIVITY_GROUPS, res.data.data);
          resolve();
        })
        .then((err) => reject(err));
    });
  }

  @Action
  [Actions.DELETE_ACTIVITY_GROUP](id: number) {
    return new Promise<void>((resolve, reject) => {
      ApiService.delete(`/activity-groups/${id}`)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  @Action
  [Actions.ADD_ACTIVITY_GROUP]() {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("/activity-groups", {
        email,
        title: "New Activity",
      })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}
