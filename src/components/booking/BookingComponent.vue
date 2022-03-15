<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-8 is-offset-2">
          <h3 class="title has-text-white">Make a Booking</h3>
          <hr class="login-hr">
          <div class="box">
            <div class="title has-text-grey is-5">Service Details</div>
            <h2 class="title has-text-grey is-2">{{ selectedService.name }}</h2>
            <hr />
            <h2 class="subtitle has-text-grey is-3">{{ selectedService.description }}</h2>
            <h3 class="title has-text-success is-3">P {{ selectedService.price }}</h3>
            <form @submit="addBooking()">
              <div>
                <img :src="selectedService.image_url" />
              </div>
              <p class="title has-text-grey is-5">Select Date</p>
              <div class="select is-rounded">
                <select v-model="selectDate" @change="selectedDateTimes(selectDate.id)" class="control is-expanded" required>
                  <option v-for="date in serviceDates" :key="date.id" :value="date">{{ date.date }}</option>
                </select>
              </div>
              <!-- <p v-if="this.selectDate !== null">{{ selectDate.id }} {{ selectDate.date }}</p> -->
              <p class="title has-text-grey is-5">Select Time</p>
              <div class="select is-rounded">
                <select
                  v-model="selectTime"
                  @change="setUserID(this.getUserID), setUserName(this.getUserFirstname, this.getUserLastname), setService(this.selectedService)"
                  class="control is-expanded"
                  required
                >
                  <option v-for="time in dateTimes" :key="time.id" :value="time">{{ time.time }}</option>
                </select>
              </div>
              <hr class="has-text-black" />
              <div v-if="this.service !== null">
                <div class="title has-text-grey is-5">
                  Account Details
                  <p class="title has-text-grey is-6">Name: {{ userName }} <br /> Contact#: {{ this.getUserNumber }} Email:{{ this.getUserEmail }}</p> 
                </div>
                <div class="title has-text-grey is-5 container is-fluid">
                  Complete Address
                  <br />
                  <input class="input is-rounded" type="text" placeholder="Street" required>
                  <br /><br />
                  <input class="input is-rounded" type="text" placeholder="Baranggay" required>
                  <br /><br />
                  <input class="input is-rounded" type="text" placeholder="City" required>
                  <br /><br />
                  <input class="input is-rounded" type="text" placeholder="Province" required>
                  <br /><br />
                  <input class="input is-rounded" type="number" placeholder="Postal Code" required>
                </div>
                <div class="title has-text-grey is-5">
                  Payment Method
                  <br />
                  <div class="control">
                    <label class="radio">
                      <input type="radio" name="foobar" checked>
                      Bank Payment
                    </label>
                    <label class="radio">
                      <input type="radio" name="foobar">
                      Pay at Store
                    </label>
                  </div>
                </div>
              </div>
              <br /><br />
              <input type="submit" class="button is-block is-danger is-large is-fullwidth" value="Book Service" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BookingForm",
  data () {
    return{
      now_date: null,
      userID: null,
      userName: null,
      serviceId: this.$route.params.id,
      service: null,
      amount: null,
      selectDate: null,
      selectTime: null,
      date: null,
      time: null,
    }
  },
  created() {
    this.fetchDates();
    this.fetchTimes();
    this.fetchService(this.$route.params.id);
    this.fetchServiceDates(this.$route.params.id);
    this.fetchDateTimes(this.$route.params.id);
    this.getDateNow();
  },
  computed: {
    ...mapGetters("services", ["selectedService"]),
    ...mapGetters("dates", ["serviceDates", "selectedDate"]),
    ...mapGetters("times", ["times", "dateTimes"]),
    ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "getUserFirstname", "getUserLastname", "getUserNumber", "getAllUsers", "isLoggedIn", "isLoggedInAdmin"]),
  },
  methods: {
    ...mapActions("services", ["fetchService"]),
    ...mapActions("dates", ["fetchServiceDates", "fetchDates", "fetchDate"]),
    ...mapActions("times", ["fetchTimes", "fetchDateTimes", "fetchTimesOfDate"]),
    ...mapActions("bookings", ["createBooking"]),

    async addBooking() {
      let bookingData = new FormData();
      bookingData.append("booking_date", this.now_date);
      bookingData.append("status", "Pending");
      bookingData.append("available_date_id", this.selectDate.id);
      bookingData.append("available_time_id", this.selectTime.id);
      bookingData.append("user_id", this.userID);
      bookingData.append("service_id", this.serviceId);
      bookingData.append("user_name", this.userName);
      bookingData.append("date", this.selectDate.date);
      bookingData.append("time", this.selectTime.time);
      bookingData.append("service_name", this.service.name);
      bookingData.append("amount", this.service.price);

      this.createBooking(bookingData);
      this.$router.push(`/YourBookings/${this.userID}`);
    },

    selectedDateTimes(id) {
      this.fetchTimesOfDate(id);
    },
    getDateNow() {
      var today = new Date()
      this.now_date = (today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate());
    },
    setUserID(id) {
      this.userID = id;
    },
    setUserName(fname, lname) {
      this.userName = fname + ' ' + lname;
    },
    setService(data) {
      this.service = data;
    }

  },
};
</script>