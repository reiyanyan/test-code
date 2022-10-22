import "./modules";
import Vuex from "vuex";
import ActivityModule from "./modules/ActivityModule";

export const store = new Vuex.Store({
  modules: {
    ActivityModule,
  },
});
