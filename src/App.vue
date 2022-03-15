<template>
  <div>
    <nav-component />
    <router-view />
  </div>
</template>

<script>
import NavComponent from './components/NavComponent.vue';

export default {
  name: "App",
  components: {
    NavComponent,
  },
};
</script>

<style scoped lang="scss" src="./styles/main.scss" />
