<template>
  <div class='container has-text-centered' v-if="isLoggedIn">
    <h2 class="title is-2">Categories</h2>
    <div class='columns is-mobile is-centered'>
      <div class='column is-3' v-for="category in categories" :key="category.id">
        <div class="card">
          <div class="card-image">
            <figure class="image is-2by1">
              <img :src="category.image_url" alt="Placeholder image" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <p class="title is-4">{{ category.name }}</p>
              <p class="subtitle is-5">{{ category.description }}</p>
            </div>
          </div>
          <footer class="card-footer" v-if="isLoggedInAdmin">
            <router-link
              :to="{ name: 'Services', params: { id: category.id } }"
              class="card-footer-item"
            >
              Services
            </router-link>
            <router-link
              :to="{ name: 'EditCategoryView', params: { id: category.id } }"
              class="card-footer-item"
            >
              Edit
            </router-link>
            <a type="submit" @click="del(category.id)" class="card-footer-item">Delete</a>
          </footer>
          <footer class="card-footer" v-else>
            <router-link
              :to="{ name: 'Services', params: { id: category.id } }"
              class="card-footer-item"
            >
              View Services
            </router-link>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CategoriesList",
  created() {
    this.fetchCategories();
  },
  computed: {
    ...mapGetters("categories", ["categories"]),
    ...mapGetters(["isLoggedIn", "isLoggedInAdmin"])
  },
  methods: {
    ...mapActions("categories", ["fetchCategories", "deleteCategory"]),
    del(id) {
      this.deleteCategory(id);
    },
  }
};
</script>