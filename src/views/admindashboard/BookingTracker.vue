<template>
  <div class="is-fullheight is-primary">
    <booking-tracker />
  </div>
</template>
<script>

import BookingTracker from "../../components/admindashboard/BookingTrackerComponent.vue"

export default {
  name: "BookingTrackerView",
  components: { BookingTracker },
};
</script>