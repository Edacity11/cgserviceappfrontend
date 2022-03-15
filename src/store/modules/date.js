import axios from "axios";

const apiUrlBase = "https://murmuring-savannah-80036.herokuapp.com/api/available_dates";
const headers = { "Content-Type": "multipart/form-data" };

const state = {
  dates: [],
  serviceDates: [],
  selectedDate: {
    date: null,
    service_id: null,
  },
};

const getters = {
  dates: state => state.dates.sort((a, b) => b.id - a.id),
  selectedDate(state) {
    return state.selectedDate;
  },
  serviceDates(state) {
    return state.serviceDates;
  }
};

const mutations = {
  setDates: (state, dates) => (state.dates = dates),
  setServiceDates: (state, dates) => (state.serviceDates = state.dates.filter(date => date.service_id === dates.id)),
  setDate: (state, date) => (state.selectedDate = date),
  appendDate: (state, date) => (state.dates = [...state.dates, date]),
  removeDate: (state, id) =>
    (state.dates = state.dates.filter(date => date.id !== id))
};

const actions = {
  async fetchDates({ commit }) {
    try {
      const response = await axios.get(`${apiUrlBase}`);
      commit("setDates", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async fetchServiceDates({ commit }, id) {
    try {
      const response = await axios.get(`https://murmuring-savannah-80036.herokuapp.com/api/services/${id}`);
      commit("setServiceDates", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async fetchDate({ commit }, id) {
    try {
      const response = await axios.get(`${apiUrlBase}/${id}`);
      commit("setDate", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async createDate({ commit }, date) {
    try {
      const response = await axios.post(`${apiUrlBase}`, date, headers);
      commit("appendDate", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async deleteDate({ commit }, id) {
    try {
      axios.delete(`${apiUrlBase}/${id}`);
      commit("removeDate", id);
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