<template>

<Navbar />
<router-view/>

</template>


<script>
import Navbar from './components/shared/Navbar.vue'
export default {
  name: 'App',
  components:{
    Navbar
  },
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.text-end button a {
  color: aliceblue;
  text-decoration: none;
}
.text-end button:hover a{
  color: black; 
}

</style>
