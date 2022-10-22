import "./modules";
import Vuex from "vuex";
import ActivityModule from "./modules/ActivityModule";
import ToDoModule from "./modules/ToDoModule";

export const store = new Vuex.Store({
  modules: {
    ActivityModule,
    ToDoModule,
  },
});
