<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-8 is-offset-2">
          <h3 class="title has-text-white">Register</h3>
          <hr class="login-hr">
          <p class="subtitle has-text-white">Fill up the form below to create your account.</p>
          <div class="box">
            <div class="box">
              <img src="https://cdn.dribbble.com/users/1111447/screenshots/13998032/media/55bb3f3cb1be320f5bf6678e28a6f304.jpg?compress=1&resize=400x300">
            </div>
            <div class="title has-text-grey is-5">Please enter your details below.</div>
            <form @submit="onSignUp">
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="signUpEmail" type="email" placeholder="Email" autofocus="" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="signUpPassword" type="password" placeholder="Password" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="signUpFirstname" type="text" placeholder="Firstname" autofocus="" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="signUpLastname" type="text" placeholder="Lastname" autofocus="" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    v-model="signUpNumber"
                    type="tel"
                    placeholder="Contact Number"
                    autofocus=""
                    required
                  >
                </div>
              </div>
              <input type="submit" class="button is-block is-danger is-large is-fullwidth" value="Sign Up" />
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
  name: "SignUpComponent",
  data() {
    return {
      signUpEmail: "",
      signUpPassword: "",
      signUpFirstname: "",
      signUpLastname: "",
      signUpNumber: "",
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    onSignUp(event) {
      event.preventDefault();
      let data = {
        user: {
          email: this.signUpEmail,
          password: this.signUpPassword,
          firstname: this.signUpFirstname,
          lastname: this.signUpLastname,
          number: this.signUpNumber,
        },
      };
      this.registerUser(data);
      this.resetData();
      this.$router.push("/");
    },
    resetData() {
      this.signUpEmail = "";
      this.signUpPassword = "";
      this.signUpFirstname = "";
      this.signUpLastname = "";
      this.signUpNumber = "";
    },
  },
};
</script>
