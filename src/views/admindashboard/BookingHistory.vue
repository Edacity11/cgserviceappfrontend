<template>
  <div class="is-fullheight is-primary">
    <booking-history />
  </div>
</template>
<script>

import BookingHistory from "../../components/admindashboard/BookingHistoryComponent.vue"

export default {
  name: "BookingHistoryView",
  components: { BookingHistory },
};
</script>