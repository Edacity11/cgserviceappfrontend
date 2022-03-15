<template>
  <div class="hero is-fullheight is-primary">
    <edit-service-form />
  </div>
</template>
<script>
import EditServiceForm from "../../components/service/EditServiceForm.vue"

export default {
  name: "EditServiceView",
  components: { EditServiceForm },
};
</script>