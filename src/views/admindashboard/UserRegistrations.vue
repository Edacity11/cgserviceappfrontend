<template>
  <div class="is-fullheight is-primary">
    <user-registrations />
  </div>
</template>
<script>

import UserRegistrations from "../../components/admindashboard/UserRegistrationsComponent.vue"

export default {
  name: "UserRegistrationsView",
  components: { UserRegistrations },
};
</script>