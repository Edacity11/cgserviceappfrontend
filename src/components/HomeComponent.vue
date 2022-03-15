<template>
  <div class="container">
    <div v-if="isLoggedIn">
      <h1 class="title is-1">Welcome {{ this.getUserFirstname }}  {{ this.getUserLastname }}</h1>
      <div v-if="isLoggedInAdmin">
        <router-link to="/AddCategory" class="button is-primary">
          <strong>Add a Category</strong>
        </router-link>
      </div>
    </div>
    <div v-else>
      <h1 class="title is-1">Please Sign In to Continue</h1>
    </div>
    <categories-list />
  </div>
</template>

<script>
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";

import CategoriesList from './category/CategoriesList.vue';

export default {
  name: "HomeComponent",
  components: { CategoriesList },
  computed: {
    ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "getUserFirstname", "getUserLastname", "getUserNumber", "getAllUsers", "isLoggedIn", "isLoggedInAdmin"]),
  },
  methods: {
    ...mapActions(["registerUser", "loginUser", "logoutUser", "addUsers"]),
  },
}
</script>
