<template>
  <Banner />
  <info />
</template>

<script>
// @ is an alias to /src
import Banner from "../components/Home/Banner.vue";
import Info from '../components/Home/Info.vue';

export default {
  name: "Home",
  components: {
    Banner,
    Info,
  },
};
</script>
