<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-8 is-offset-2">
          <h3 class="title has-text-white">Your Bookings</h3>
          <hr class="login-hr">
          <div class="box">
            <table class="table container is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>Booking #</th>
                  <th>Booked On</th>
                  <th>User</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="booking in userBookings" :key="booking.id">
                  <td>{{ booking.id }}</td>
                  <td>{{ booking.booking_date }}</td>
                  <td>{{ booking.user_name }}</td>
                  <td>{{ booking.service_name }}</td>
                  <td>{{ booking.date}}</td>
                  <td>{{ booking.time }}</td>
                  <td>{{ booking.amount }}</td>
                  <td>{{ booking.status }}</td>
                </tr>
              </tbody>
            </table>
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
  name: "UserBookings",
  created() {
    this.fetchBookings();
    this.fetchUserBookings(Number(this.$route.params.id));
  },
  computed: {
    ...mapGetters("bookings", ["bookings", "userBookings"]),
  },
  methods: {
    ...mapActions("bookings", ["fetchBookings", "fetchUserBookings"]),
  },
};
</script>