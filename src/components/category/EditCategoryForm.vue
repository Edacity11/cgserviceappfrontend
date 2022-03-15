<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-8 is-offset-2">
          <h3 class="title has-text-white">Edit Category</h3>
          <hr class="login-hr">
          <div class="box">
            <div class="title has-text-grey is-5">Please update category details below.</div>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="selectedCategory.name" type="text" placeholder="Name" autofocus="" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="selectedCategory.description" type="textarea" placeholder="Description" required>
                </div>
              </div>
              <div>
                <h1 class="subtitle has-text-black">Current Image:</h1>
                <img :src="selectedCategory.image_url" />
              </div>
              <div v-if="!image">
                <div class="file">
                  <label class="file-label">
                    <input class="file-input" @change="setImage" type="file">
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose a new image file…
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <div v-else>
                <h1 class="subtitle has-text-black">New Image:</h1>
                <img :src="displayImage" />
                <button @click="removeImage" class="button is-danger">Remove image</button>
              </div>
              <br />
              <input type="submit" @click="editCategory(selectedCategory)" class="button is-block is-danger is-large is-fullwidth" value="Update Category" />
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
  data () {
    return{
      image: null,
      displayImage: null,
    }
  },
  created() {
    this.fetchCategory(this.$route.params.id);
  },
  computed: {
    ...mapGetters("categories", ["selectedCategory"]),
  },
  methods: {
    ...mapActions("categories", ["updateCategory", "fetchCategory"]),
    async editCategory(data) {
      let formData = new FormData();
      formData.append("id", data.id);
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (this.image !== null) {
        formData.append("image", this.image);
      }

      this.updateCategory(formData);
      this.removeImage;
      this.$router.push("/");
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
      this.image = null;
      this.displayImage = null;
    }
  },
};
</script>