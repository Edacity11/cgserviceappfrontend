<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-8 is-offset-2">
          <h3 class="title has-text-white">Add a Category</h3>
          <hr class="login-hr">
          <div class="box">
            <div class="title has-text-grey is-5">Please enter category details below.</div>
            <form @submit="uploadCategory">
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="addCategoryName" type="text" placeholder="Name" autofocus="" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="addCategoryDescription" type="textarea" placeholder="Description" required>
                </div>
              </div>
              <div v-if="!image">
                <div class="file">
                  <label class="file-label">
                    <input class="file-input" @change="setImage" type="file" accept="image/png,image/jpeg" name="resume" required>
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose an image file…
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <div v-else>
                <img :src="displayImage" />
                <button @click="removeImage" class="button is-danger">Remove image</button>
              </div>
              <br />
              <input type="submit" class="button is-block is-danger is-large is-fullwidth" value="Add Category" />
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
  name: "CategoryForm",
  computed: {
    //...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "getUserFirstname", "getUserLastname", "getUserNumber", "getAllUsers", "isLoggedIn", "isLoggedInAdmin"]),
  },
  data() {
    return {
      addCategoryName: "",
      addCategoryDescription: "",
      image: null,
      displayImage: null,
    };
  },
  methods: {
    ...mapActions("categories", ["createCategory"]),
    async uploadCategory() {
      let formData = new FormData();
      formData.append("name", this.addCategoryName);
      formData.append("description", this.addCategoryDescription);
      if (this.image !== null) {
        formData.append("image", this.image);
      }
      this.createCategory(formData);
      this.resetData();
      this.$router.push("/");
    },
    resetData() {
      this.addCategoryName = "";
      this.addCategoryDescription= "";
      this.image = null;
      this.displayImage = null;
    },

    //--Image Handler--//
    setImage(e) {
      e.preventDefault();
      var files = e.target.files || e.dataTransfer.files;
      this.image = e.target.files[0];
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();

      reader.onload = (e) => {
        this.displayImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
      this.displayImage = null;
    }
  },
};
</script>