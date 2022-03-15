<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-8 is-offset-2">
          <h3 class="title has-text-white">Edit Service</h3>
          <hr class="login-hr">
          <div class="box">
            <div class="title has-text-grey is-5">Please update service details below.</div>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="selectedService.name" type="text" placeholder="Name" autofocus="" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="selectedService.description" type="textarea" placeholder="Description" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="selectedService.price" type="number" placeholder="Price" required>
                </div>
              </div>
              <div>
                <h1 class="subtitle has-text-black">Current Image:</h1>
                <img :src="selectedService.image_url" />
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
              <input type="submit" @click="editService(selectedService)" class="button is-block is-danger is-large is-fullwidth" value="Update Service" />
            </form>
          </div>
          <h3 class="title has-text-white">Available Dates</h3>
          <hr class="login-hr">
          <div class="box">
            <form>
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input class="input" v-model="date" type="date" required>
                </div>
                <div class="control">
                  <a @click="addDate" class="button is-success">
                    Add Date
                  </a>
                </div>
              </div>
            </form>
            <table class="table container is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>Date ID</th>
                  <th>Available Date/s</th>
                  <th>Add Time</th>
                  <th>Delete Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="date in serviceDates" :key="date.id">
                  <td>{{ date.id }}</td>
                  <td>{{ date.date }}</td>
                  <td>
                    <div class="field has-addons">
                      <div class="control is-expanded">
                        <input class="input" v-model="time" type="time" required>
                      </div>
                      <div class="control">
                        <a @click="addTime(date)" class="button is-success">
                          Add Time
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button @click="delDate(date.id)" class="button is-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- TIME TABLE -->
          <h3 class="title has-text-white">Available Timeslots</h3>
          <hr class="login-hr">
          <div class="box">
            <form>
              
            </form>

            <table class="table container is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>Available Time/s</th>
                  <th>Timeslot for Date ID:</th>
                  <th>Delete Time</th>
                </tr>
              </thead>
              <tbody>
                <!-- <span v-for="date in serviceDates" :key="date.id"> -->
                  <tr v-for="time in dateTimes" :key="time.id">
                    <td>{{ time.time }}</td>
                    <td>{{ time.available_date_id }}</td>
                    <td>
                      <button @click="delTime(time.id)" class="button is-danger">Delete</button>
                    </td>
                  </tr>
                <!-- </span> -->
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
  name: "EditServiceForm",
  data () {
    return{
      serviceId: this.$route.params.id,
      date: null,
      time: null,
      image: null,
      displayImage: null
    }
  },
  created() {
    this.fetchDates();
    this.fetchTimes();
    this.fetchService(this.$route.params.id);
    this.fetchServiceDates(this.$route.params.id);
    this.fetchDateTimes(this.$route.params.id);
    
  },
  computed: {
    ...mapGetters("services", ["selectedService"]),
    ...mapGetters("dates", ["serviceDates", "selectedDate"]),
    ...mapGetters("times", ["times", "dateTimes"]),
  },
  methods: {
    ...mapActions("services", ["updateService", "fetchService"]),
    ...mapActions("dates", ["createDate", "deleteDate", "fetchServiceDates", "fetchDates", "fetchDate"]),
    ...mapActions("times", ["createTime", "deleteTime", "fetchTimes", "fetchDateTimes"]),
    async editService(data) {
      let formData = new FormData();
      formData.append("id", data.id);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      if (this.image !== null) {
        formData.append("image", this.image);
      }

      this.updateService(formData);
      this.removeImage;
      this.$router.push("/");
    },
    async addDate() {
      let dateData = new FormData();
      dateData.append("date", this.date);
      dateData.append("service_id", this.serviceId);

      this.createDate(dateData);
      this.$router.go();
    },
    async addTime(date) {
      let timeData = new FormData();
      timeData.append("time", this.time);
      timeData.append("available_date_id", date.id);
      timeData.append("service_id", this.serviceId);

      this.createTime(timeData);
      this.$router.go();
    },
    delDate(id) {
      this.deleteDate(id);
      this.$router.go()
    },
    delTime(id) {
      this.deleteTime(id);
      this.$router.go()
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