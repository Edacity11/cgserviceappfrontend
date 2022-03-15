import axios from "axios";
//import services from "./services";
import { mapActions, mapGetters } from "vuex";
import "@/store/index.js";

//UNUSED FILE PLEASE IGNORE
const BASE_URL = "http://localhost:3000/";

const state = {
  cart: [],
  services: [],
};
const getters = {
  getCart(state) {
    return state.cart;
  },
  //getServices: state => state.services.sort((a, b) => b.id - a.id),
  getServices(state) {
    return state.services;
  },
  cartItems: (state) => {
    return state.cart.map((itemId) =>
      state.services.find((service) => service.id === itemId)
    );
  },
};
const actions = {
  addToCart({ commit }, payload) {
    commit("addToCart", payload);
  },
  removeFromCart({ commit }, payload) {
    commit("removeFromCart", payload);
  },

};
const mutations = {
  addToCart(state, payload) {
    state.cart.push(Number(payload));
  },
  removeFromCart(state, payload) {
    let indexToDelete = state.cart.indexOf(Number(payload));
    state.cart.splice(indexToDelete, 1);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
