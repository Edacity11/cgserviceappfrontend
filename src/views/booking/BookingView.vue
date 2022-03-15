<template>
  <div class="is-fullheight is-primary">
    <booking-component />
  </div>
</template>
<script>

import BookingComponent from "../../components/booking/BookingComponent.vue"

export default {
  name: "BookingView",
  components: { BookingComponent },
};
</script>