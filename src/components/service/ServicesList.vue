<template>
  <div class='container has-text-centered' v-if="isLoggedIn">
    <h2 class="title is-2">Services</h2>
    <div v-if="isLoggedInAdmin">
      <router-link
        :to="{ name: 'AddServiceView', params: { id: $route.params.id } }"
        class="button is-primary"
      >
        <strong>Add a Service</strong>
      </router-link>
    </div>
    <br />
    <div class='columns is-mobile is-centered'>
      <div class='column is-3' v-for="service in categoryServices" :key="service.id">
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
              <p class="title is-5">P {{ service.price }}</p>
            </div>
          </div>
          <footer class="card-footer" v-if="isLoggedInAdmin">
            <router-link
              :to="{ name: 'BookingView', params: { id: service.id } }"
              class="card-footer-item"
            >
              Book
            </router-link>
            <router-link
              :to="{ name: 'EditServiceView', params: { id: service.id } }"
              class="card-footer-item"
            >
              Edit
            </router-link>
            <a type="submit" @click="del(service.id)" class="card-footer-item">Delete</a>
          </footer>
          <footer class="card-footer" v-else>
            <router-link
              :to="{ name: 'BookingView', params: { id: service.id } }"
              class="card-footer-item"
            >
              Make a Booking
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
  name: "ServicessList",
  created() {
    this.fetchServices();
    this.fetchCategoryServices(this.$route.params.id);
  },
  computed: {
    ...mapGetters("services", ["services", "categoryServices"]),
    ...mapGetters(["isLoggedIn", "isLoggedInAdmin"])
  },
  methods: {
    ...mapActions("services", ["fetchServices", "fetchCategoryServices", "deleteService", "addToCart"]),
    ...mapActions("categories", ["fetchCategory"]),
    del(id) {
      this.deleteService(id);
      this.$router.go()
    },

    addCartItem(id) {
      this.addToCart(id);
    }
  }
};
</script>