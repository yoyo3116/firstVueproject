<template>
  <header class="p-3 bg-dark bg-gradient text-white  qq" >
    <div
      class="
        d-flex
        flex-wrap
        align-items-center
        justify-content-center justify-content-lg-start
      "
    >
      <a
        href="/"
        class="
          d-flex
          align-items-center
          mb-2 mb-lg-0
          text-white text-decoration-none
        "
      >
        <svg
          class="bi me-2"
          width="40"
          height="32"
          role="img"
          aria-label="Bootstrap"
        >
          <use xlink:href="#bootstrap" />
        </svg>
      </a>

      <ul
        class="
          nav
          col-12 col-lg-auto
          me-lg-auto
          mb-2
          justify-content-center
          mb-md-0
        "
      >
        <li><a href="/" class="nav-link px-2 text-secondary">首頁</a></li>
        <!-- <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
        <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
        <li><a href="#" class="nav-link px-2 text-white">About</a></li> -->
      </ul>

      <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
        <input
          type="search"
          class="form-control form-control-dark"
          placeholder="Search..."
          aria-label="Search"
        />
      </form>

      <div class="text-end">
        <button
          v-if="store.state.Islogin == false"
          type="button"
          class="btn btn-outline-light me-2"
        >
          <router-link to="/login/">Login</router-link>
        </button>
        <button
          @click="signout"
          v-if="store.state.Islogin == true"
          type="button"
          class="btn btn-danger me-2"
        >
          <router-link to="/login/">Sign-out</router-link>
        </button>
        <button class="btn btn-outline-light">
          <router-link to="/admin">後臺管理</router-link>
        </button>
        <div class="btn-group">
        <button type="button" class=" fs-5 mx-2 btn text-white position-relative "
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            @click="getCart">
   <i class="fs-3 fas fa-shopping-cart"></i> <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >{{cart_count}}<span class="visually-hidden">unread messages</span></span>
</button>





          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div class="offcanvas-header">
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <h5 class="text-start text-dark border-bottom pb-2">
                <i class="text-danger fas fa-shopping-cart me-2"></i>您的購物車
              </h5>
              <table class="table">
                <thead>
                  <th></th>
                  <th>品名</th>
                  <th>數量</th>
                  <th>單價</th>
                </thead>
                <tbody>
                  <tr v-for="item in cart.carts" :key="item.id">
                    <td class="align-middle">
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm"
                        @click="removeCartItem(item.id)"
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                    <td class="align-middle">
                      {{ item.product.title }}
                      <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
                    </td>
                    <td class="align-middle">
                      {{ item.qty }}/{{ item.product.unit }}
                    </td>
                    <td class="align-middle text-right">
                      {{ item.final_total }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{ cart.total }}</td>
                  </tr>
                  <tr v-if="cartSS.final_total != cart.total">
                    <td colspan="3" class="text-right text-success">折扣價</td>
                    <td class="text-right text-success">
                      {{ cart.final_total }}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div class="input-group mb-3 input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  v-model="coupon_code"
                  placeholder="請輸入優惠碼"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="addCouponCode"
                  >
                    套用優惠碼
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Loading from "@/main";
import { useStore } from "vuex";
export default {
  setup() {
    let store = useStore();
    return { store };
  },
  name: "NavBar",
  data() {
    return {
      Issignin: false,
      cart: [],
      cartSS: [],
      coupon_code:'',
      cart_count:0
    };
  },
  components: {
    Loading,
  },
  methods: {
    signout() {
      let loader = this.$loading.show();
      const api = process.env.VUE_APP_SIGNOUT_API;
      const vm = this;
      this.axios.post(api, vm.user).then((res) => {
        console.log(res.data);
        loader.hide();
        if (res.data.success) {
          swal("已登出", "點擊OK關閉", "success");
          this.store.state.Islogin = false;
          vm.$router.push("/login");
        }
      });
    },
    getCart() {
      let loader = this.$loading.show();
      let vm = this;
      const api = `https://vue-course-api.hexschool.io/api/heather/cart`;
      this.axios.get(api).then((res) => {
        console.log(res);
        vm.cart = res.data.data;
        vm.cart_count=vm.cart.carts.length
        console.log(vm.cart.carts.length);
        loader.hide();
      });
    },
    removeCartItem(id) {
      let vm = this;
      let loader = this.$loading.show();
      const api = `https://vue-course-api.hexschool.io/api/heather/cart/${id}`;
      this.axios
        .delete(api)
        .then((res) => {
          loader.hide();
          swal({
            title: "刪除成功!",
            text: "1秒後自動關閉",
            timer: 1000,
            showConfirmButton: false,
          });
        })
        .then(() => {
          this.getCart();
        });
    },
     addCouponCode() {
      let vm = this;
      let loader = this.$loading.show();
      const api = `https://vue-course-api.hexschool.io/api/heather/coupon`;
      const coupon ={
        code:vm.coupon_code
      }
      this.axios.post(api,{data:coupon }).then((res) => {
        console.log(res);
        vm.cartSS=res.data.data
        this.getCart()
        loader.hide();
        })
    },
  },
  created() {
    const api2 = process.env.VUE_APP_USERCHECK_API;
    this.axios.post(api2).then((res) => {
      if (res.data.success) {
        this.store.state.Islogin = true;
      } else {
        this.store.state.Islogin = false;
      }
    }).then(()=>{
       this.getCart()
    });
   
  },
};
</script>


<style lang="scss">
  .qq{
    position: fixed;
    z-index:3000;
    top:0;
    width: 100%;
  }

</style>
