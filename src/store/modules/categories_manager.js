import axios from "axios";

//UNUSED FILE PLEASE IGNORE
const BASE_URL = "http://localhost:3000/";

const state = {
  //---For Categories--//
  allCategories: [],
  category: {
    name: null,
    description: null,
    image: null,
  },
};
const getters = {
  //---For Categories--//
  getAllCategories(state) {
    return state.allCategories;
  },
};
const actions = {
  //---For Users--//
  addCategory({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}categories`, payload)
        .then((response) => {
          commit("setCategoryInfo", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // loginUser({ commit }, payload) {
  //   new Promise((resolve, reject) => {
  //     axios
  //       .post(`${BASE_URL}users/sign_in`, payload)
  //       .then((response) => {
  //         commit("setUserInfo", response);
  //         resolve(response);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
  // logoutUser({ commit }) {
  //   const config = {
  //     headers: {
  //       authorization: state.auth_token,
  //     },
  //   };
  //   new Promise((resolve, reject) => {
  //     axios
  //       .delete(`${BASE_URL}users/sign_out`, config)
  //       .then(() => {
  //         commit("resetUserInfo");
  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
  // loginUserWithToken({ commit }, payload) {
  //   const config = {
  //     headers: {
  //       Authorization: payload.auth_token,
  //     },
  //   };
  //   new Promise((resolve, reject) => {
  //     axios
  //       .get(`${BASE_URL}member-data`, config)
  //       .then((response) => {
  //         commit("setUserInfoFromToken", response);
  //         resolve(response);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
  addCategories({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}categories`)
        .then((response) => {
          commit("setCategories", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
const mutations = {
  //---For Categories-//
  setCategoryInfo(state, data) {
    state.category = data.data.category;
  },

  resetCategoryInfo(state) {
    // state.user = {
    //   id: null,
    //   username: null,
    //   email: null,
    // };
    state.allCategories = [];
    // state.auth_token = null;
    // localStorage.removeItem("auth_token");
    // axios.defaults.headers.common["Authorization"] = null;
  },
  setCategories(state, data) {
    data.data.forEach(category => {
      state.allCategories.push(category);
    });
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};