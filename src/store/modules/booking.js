import axios from "axios";

const apiUrlBase = "https://murmuring-savannah-80036.herokuapp.com/api/bookings";
const headers = { "Content-Type": "multipart/form-data" };

const state = {
  bookings: [],
  userBookings: [],
  pendingBookings: [],
  selectedBooking: {},
  serviceName: null

};

const getters = {
  bookings: state => state.bookings.sort((a, b) => a.id - b.id),
  selectedBooking(state) {
    return state.selectedBooking;
  },
  userBookings(state) {
    return state.userBookings;
  },
  pendingBookings(state) {
    return state.pendingBookings;
  },
};

const mutations = {
  setBookings: (state, bookings) => (state.bookings = bookings),
  setUserBookings: (state, id) => (state.userBookings = state.bookings.filter(booking => booking.user_id === id)),
  setPendingBookings: (state) => (state.pendingBookings = state.bookings.filter(booking => booking.status == "Pending")),
  setBooking: (state, booking) => (state.selectedBooking = booking),
  appendBooking: (state, booking) => (state.bookings = [...state.bookings, booking]),
  editBooking: (state, booking) => (state.selectedBooking = booking),
  removeBooking: (state, id) =>
    (state.bookings = state.bookings.filter(booking => booking.id !== id))
};

const actions = {
  async fetchBookings({ commit }) {
    try {
      const response = await axios.get(`${apiUrlBase}`);
      commit("setBookings", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async fetchPendingBookings({ commit }) {
    commit("setPendingBookings");
  },
  async fetchUserBookings({ commit }, id) {
    commit("setUserBookings", id);
  },
  async fetchBooking({ commit }, id) {
    try {
      const response = await axios.get(`${apiUrlBase}/${id}`);
      commit("setBooking", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async createBooking({ commit }, booking) {
    try {
      const response = await axios.post(`${apiUrlBase}`, booking, headers);
      commit("appendBooking", response.data);
    } catch (e) {
      console.error(e);
    }
  },
  async updateBooking({ commit }, booking) {
    try {
      axios.patch(`${apiUrlBase}/${booking.get("id")}`, booking, headers);
      commit("editBooking", booking);
    } catch (e) {
      console.error(e);
    }
  },
  async deleteBooking({ commit }, id) {
    try {
      axios.delete(`${apiUrlBase}/${id}`);
      commit("removeBooking", id);
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

