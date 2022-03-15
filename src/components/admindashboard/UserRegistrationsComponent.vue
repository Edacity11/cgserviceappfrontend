<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-8 is-offset-2">
          <h3 class="title has-text-white">User Registrations</h3>
          <hr class="login-hr">
          <div class="box">
            <table class="table container is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Email</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Contact Info</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in this.getAllUsers" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.firstname }}</td>
                  <td>{{ user.lastname }}</td>
                  <td>{{ user.number }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserRegistrationsComponent",
  created() {
    this.addUsers();
  },
  computed: {
    ...mapGetters(["getUserEmail", "getUserID", "getUserFirstname", "getUserLastname", "getUserNumber", "getAllUsers"]),
  },
  methods: {
    ...mapActions(["addUsers"]),
  },
};
</script>