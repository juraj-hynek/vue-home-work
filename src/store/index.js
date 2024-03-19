import { createStore } from "vuex";
import userModule from "./state-modules/stateUser";
import itemsModule from "./state-modules/stateItems";
import uiModule from "./state-modules/stateUI";

export default createStore({
  modules: {
    user: userModule,
    items: itemsModule,
    ui: uiModule,
  },
});
