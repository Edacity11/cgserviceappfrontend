<template>
  <div class="hero is-fullheight is-primary">
    <edit-category-form />
  </div>
</template>
<script>
import EditCategoryForm from "../../components/category/EditCategoryForm.vue"

export default {
  name: "EditCategoryView",
  components: { EditCategoryForm },
};
</script>