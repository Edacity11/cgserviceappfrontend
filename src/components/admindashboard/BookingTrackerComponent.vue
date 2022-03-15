<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-10 is-offset-1">
          <h3 class="title has-text-white">Booking Tracker</h3>
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
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="booking in pendingBookings" :key="booking.id">
                  <td>{{ booking.id }}</td>
                  <td>{{ booking.booking_date }}</td>
                  <td>{{ booking.user_name }}</td>
                  <td>{{ booking.service_name }}</td>
                  <td>{{ booking.date}}</td>
                  <td>{{ booking.time }}</td>
                  <td>{{ booking.amount }}</td>
                  <td>{{ booking.status }}</td>
                  <td>
                    <div class="container is-fullwidth">
                      <button @click="serveBooking(booking)" class="button is-success">Served</button>
                      <button @click="cancelBooking(booking)" class="button is-danger">Cancel</button>
                    </div>
                  </td>
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
    this.fetchPendingBookings();
  },
  computed: {
    ...mapGetters("bookings", ["bookings", "pendingBookings"]),
  },
  methods: {
    ...mapActions("bookings", ["fetchBookings", "fetchPendingBookings", "updateBooking"]),
    async serveBooking(data) {
      let formData = new FormData();
      formData.append("id", data.id)
      formData.append("status", "Served");

      this.updateBooking(formData);
      this.$router.push("/BookingHistory");
    },
    async cancelBooking(data) {
      let formData = new FormData();
      formData.append("id", data.id)
      formData.append("status", "Cancelled");

      this.updateBooking(formData);
      this.$router.push("/BookingHistory");
    },
  },
};
</script>