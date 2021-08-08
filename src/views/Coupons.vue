<template>
  <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main role="main" class="text-start col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
        <CouponsAD/>
        </main>
      </div>
    </div>
</template>
  
<script>
import Sidebar from '../components/admin/Sidebar.vue';
import CouponsAD from "../components/admin/CouponsAD.vue";
export default {
  name: "coupons",
  components: {
   Sidebar,CouponsAD
  },
  created(){
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    console.log(token);
    if (token != "") {
      this.axios.defaults.headers.common["Authorization"] = token;
    }
  }
};
</script>