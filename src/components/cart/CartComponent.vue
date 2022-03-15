<template>
  <div class='container has-text-centered'>
    <h2 class="title is-2">Cart</h2>
    <div class='columns is-mobile is-centered'>
      <div class='column is-3' v-for="service in cartItems" :key="service.id">
        <div class="card">
          <div class="card-image">
            <figure class="image is-2by1">
              <img :src="service.image_url" alt="Placeholder image" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <p class="title is-4">{{ service.name }}</p>
              <p class="subtitle is-5">{{ service.description }}</p>
              <p class="subtitle is-5">{{ service.price }}</p>
            </div>
            <div class="control">
              <label class="label">Select Date</label>
              <div class="select">
                <select v-for="date in serviceDates" :key="date.id">
                  <option>{{ date.date }}</option>
                  <option>{{ service.id }}</option>
                </select>
              </div>
            </div>
          </div>
          <!-- <footer class="card-footer" v-if="isLoggedInAdmin">
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
          </footer> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CartList",
  created() {
    this.fetchServices();
    this.fetchDates();
    this.fetchServiceDates(5);
  },
  computed: {
    ...mapGetters("services", ["cartItems"]),
    ...mapGetters("dates", ["serviceDates", "dates"]),
  },
  methods: {
    ...mapActions("services", ["fetchServices"]),
    ...mapActions("dates", ["fetchDates", "fetchServiceDates"]),


  }
};
</script>