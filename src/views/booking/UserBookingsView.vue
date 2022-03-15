<template>
  <div class="is-fullheight is-primary">
    <user-bookings-component />
  </div>
</template>
<script>

import UserBookingsComponent from "../../components/booking/UserBookingsComponent.vue"

export default {
  name: "UserBookingView",
  components: { UserBookingsComponent },
};
</script>