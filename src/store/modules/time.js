import axios from "axios";

const apiUrlBase = "https://murmuring-savannah-80036.herokuapp.com/api/available_times";
const headers = { "Content-Type": "multipart/form-data" };

const state = {
  times: [],
  dateTimes: [],
  selectedTime: {
    time: null,
    available_date_id: null,
  },
};

const getters = {
  times: state => state.times.sort((a, b) => b.id - a.id),
  selectedTime(state) {
    return state.selectedTime;
  },
  dateTimes(state) {
    return state.dateTimes;
  }
};

const mutations = {
  setTimes: (state, times) => (state.times = times),
  setDateTimes: (state, times) => (state.dateTimes = state.times.filter(time => time.service_id === times.id)),
  setTimesOfDate: (state, times) => (state.dateTimes = state.times.filter(time => time.available_date_id === times.id)),
  setTime: (state, time) => (state.selectedTime = time),
  appendTime: (state, time) => (state.times = [...state.times, time]),
  removeTime: (state, id) =>
    (state.times = state.times.filter(time => time.id !== id))
};

const actions = {
  async fetchTimes({ commit }) {
    try {
      const response = await axios.get(`${apiUrlBase}`);
      commit("setTimes", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async fetchDateTimes({ commit }, id) {
    try {
      const response = await axios.get(`https://murmuring-savannah-80036.herokuapp.com/api/services/${id}`);
      commit("setDateTimes", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async fetchTimesOfDate({ commit }, id) {
    try {
      const response = await axios.get(`https://murmuring-savannah-80036.herokuapp.com/api/available_dates/${id}`);
      commit("setTimesOfDate", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async fetchTime({ commit }, id) {
    try {
      const response = await axios.get(`${apiUrlBase}/${id}`);
      commit("setTime", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async createTime({ commit }, time) {
    try {
      const response = await axios.post(`${apiUrlBase}`, time, headers);
      commit("appendTime", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async deleteTime({ commit }, id) {
    try {
      axios.delete(`${apiUrlBase}/${id}`);
      commit("removeTime", id);
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