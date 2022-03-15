import { createStore } from "vuex";
import sessionManager from "@/store/modules/session_manager";
import categories from "@/store/modules/categories"
import services from "@/store/modules/services"
import dates from "@/store/modules/date"
import times from "@/store/modules/time"
import bookings from "./modules/booking";
//import carts from "@/store/modules/cart"

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    sessionManager, categories, services, dates, times, bookings
  },
});
