import { createApp } from 'vue'
import './registerServiceWorker'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/global.css'




import App from './App.vue'
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


axios.defaults.withCredentials = true;

const app = Vue.createApp(App)
app.use(VueAxios, axios)
app.use(store).use(router).mount('#app')
app.use(VueLoading);


router.beforeEach((to,from,next)=>{
if(to.meta.requiresAuth){
  const api =process.env.VUE_APP_USERCHECK_API;
  axios.post(api).then((res)=>{
    if(res.data.success){
      next();
    }else {
      next({
        path:'/login'
      });
    }
    })
}else{
  next();
}
})


