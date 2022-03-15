<template>
  <div class="hero is-fullheight is-primary">
    <category-form />
  </div>
</template>
<script>

import CategoryForm from "../../components/category/CategoryForm.vue"

export default {
  name: "CategoryView",
  components: { CategoryForm },
};
</script>