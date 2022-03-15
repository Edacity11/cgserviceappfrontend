<template>
  <div class="hero is-fullheight is-primary">
    <service-form />
  </div>
</template>
<script>

import ServiceForm from "../../components/service/ServiceForm.vue"

export default {
  name: "AddServiceView",
  components: { ServiceForm },
};
</script>