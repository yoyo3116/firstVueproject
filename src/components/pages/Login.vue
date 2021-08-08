<template>

<main class="form-signin">
  <form @submit.prevent="signin">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input v-model="user.username" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input  v-model="user.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <!-- <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label> -->
    </div>
    <button class="w-100 btn btn-lg btn-primary" @keyup.enter="signin" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
  </form>
</main>
</template>

<script>
import {useStore} from 'vuex'
export default {
  name: 'HelloWorld',
   setup(){
    let store = useStore()
    return{store}
  },
  data(){
    return{
      user:{
        username:'',
        password:'',
      }
    } ;
  },
  methods:{
    signin(){
    const api =process.env.VUE_APP_LOGININ_API;
    const vm =this;
    this.axios.post(api,vm.user).then((res)=>{
      if(res.data.success){
        const token =res.data.token
        const expired =res.data.expired
        document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
        vm.$router.push('/admin');
        this.store.state.Islogin = true
      };
      })
    }
  },
}
</script>

<style scpoed>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>