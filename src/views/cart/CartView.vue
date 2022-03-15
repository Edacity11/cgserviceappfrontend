<template>
  <div class="is-fullheight is-primary">
    <cart-component />
  </div>
</template>
<script>

import CartComponent from "../../components/cart/CartComponent.vue"

export default {
  name: "CartView",
  components: { CartComponent },
};
</script>