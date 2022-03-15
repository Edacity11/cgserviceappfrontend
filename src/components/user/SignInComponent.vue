<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-8 is-offset-2">
          <h3 class="title has-text-white">Login</h3>
          <hr class="login-hr">
          <p class="subtitle has-text-white">Login to view our Services.</p>
          <div class="box">
            <div class="box">
              <img src="https://cdn.dribbble.com/users/1111447/screenshots/13998032/media/55bb3f3cb1be320f5bf6678e28a6f304.jpg?compress=1&resize=400x300">
            </div>
            <div class="title has-text-grey is-5">Please enter your details below.</div>
            <form @submit="onLogin">
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="loginEmail" type="email" placeholder="Email" autofocus="" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="loginPassword" type="password" placeholder="Password" required>
                </div>
              </div>
              <input type="submit" class="button is-block is-danger is-large is-fullwidth" value="Sign In" />
            </form>
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
  name: "SignInComponent",
  // computed: {
  //     ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "getUserFirstname", "getUserLastname", "getUserNumber", "getAllUsers", "isLoggedIn", "isLoggedInAdmin"]),
  // },
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
    };
  },
  methods: {
    ...mapActions(["loginUser", "addUsers"]),
    ...mapActions("services", ["fetchServices"]),
    onLogin(event) {
        event.preventDefault();
        let data = {
          user: {
            email: this.loginEmail,
            password: this.loginPassword,
          },
        };
        this.loginUser(data);
        this.addUsers();
        this.fetchServices();
        this.resetData();
        this.$router.push("/");
    },
    resetData() {
      this.loginEmail = "";
      this.loginPassword = "";
    },
  },
};
</script>
