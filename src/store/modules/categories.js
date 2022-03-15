import axios from "axios";

const apiUrlBase = "https://murmuring-savannah-80036.herokuapp.com/api/categories";
const headers = { "Content-Type": "multipart/form-data" };

const state = {
  categories: [],
  selectedCategory: {
    name: null,
    description: null,
    image: null,
  },
};

const getters = {
  categories: state => state.categories.sort((a, b) => b.id - a.id),
  selectedCategory(state) {
    return state.selectedCategory;
  }
};

const mutations = {
  setCategories: (state, categories) => (state.categories = categories),
  setCategory: (state, category) => (state.selectedCategory = category),
  appendCategory: (state, category) => (state.categories = [...state.categories, category]),
  editCategory: (state, category) => (state.selectedCategory = category),
  removeCategory: (state, id) =>
    (state.categories = state.categories.filter(category => category.id !== id))
};

const actions = {
  async fetchCategories({ commit }) {
    try {
      const response = await axios.get(`${apiUrlBase}`);
      commit("setCategories", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async fetchCategory({ commit }, id) {
    try {
      const response = await axios.get(`${apiUrlBase}/${id}`);
      commit("setCategory", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async createCategory({ commit }, category) {
    try {
      const response = await axios.post(`${apiUrlBase}`, category, headers);
      commit("appendCategory", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async updateCategory({ commit }, category) {
    try {
      axios.patch(`${apiUrlBase}/${category.get("id")}`, category, headers);
      commit("editCategory", category);
    } catch (e) {
      console.error(e);
    }
  },
  async deleteCategory({ commit }, id) {
    try {
      axios.delete(`${apiUrlBase}/${id}`);
      commit("removeCategory", id);
    } catch (e) {
      console.error(e);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};