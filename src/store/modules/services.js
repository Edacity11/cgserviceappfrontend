import axios from "axios";

const apiUrlBase = "https://murmuring-savannah-80036.herokuapp.com/api/services";
const headers = { "Content-Type": "multipart/form-data" };

const state = {
  services: [],
  categoryServices: [],
  selectedService: {
    name: null,
    description: null,
    price: null,
    category_id: null,
    image: null,
  },
};

const getters = {
  services: state => state.services.sort((a, b) => b.id - a.id),
  selectedService(state) {
    return state.selectedService;
  },
  categoryServices(state) {
    return state.categoryServices;
  },
};

const mutations = {
  setServices: (state, services) => (state.services = services),
  setCategoryServices: (state, services) => (state.categoryServices = state.services.filter(service => service.category_id === services.id)),
  setService: (state, service) => (state.selectedService = service),
  appendService: (state, service) => (state.services = [...state.services, service]),
  editService: (state, service) => (state.selectedService = service),
  removeService: (state, id) =>
    (state.services = state.services.filter(service => service.id !== id))
};

const actions = {
  async fetchServices({ commit }) {
    try {
      const response = await axios.get(`${apiUrlBase}`);
      commit("setServices", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async fetchCategoryServices({ commit }, id) {
    try {
      const response = await axios.get(`https://murmuring-savannah-80036.herokuapp.com/api/categories/${id}`);
      commit("setCategoryServices", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async fetchService({ commit }, id) {
    try {
      const response = await axios.get(`${apiUrlBase}/${id}`);
      commit("setService", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async createService({ commit }, service) {
    try {
      const response = await axios.post(`${apiUrlBase}`, service, headers);
      commit("appendService", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async updateService({ commit }, service) {
    try {
      axios.patch(`${apiUrlBase}/${service.get("id")}`, service, headers);
      commit("editService", service);
    } catch (e) {
      console.error(e);
    }
  },
  async deleteService({ commit }, id) {
    try {
      axios.delete(`${apiUrlBase}/${id}`);
      commit("removeService", id);
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

