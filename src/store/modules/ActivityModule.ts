import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums";

export type ItemActivity = {
  id: number;
  title: string;
  created_at: Date;
};

@Module
export default class ActivityModule extends VuexModule {
  dataActivityGroups: Array<ItemActivity> = new Array();

  get getDataActivityGroups(): Array<ItemActivity> {
    return this.dataActivityGroups;
  }

  @Mutation
  [Mutations.SET_DATA_ACTIVITY_GROUPS](itemActivity: ItemActivity) {
    this.dataActivityGroups.push(itemActivity);
  }

  @Action
  [Actions.FETCH_ACTIVITY_GROUPS]() {
    // return new Promise<void>((resolve, reject) => {});
  }
}
