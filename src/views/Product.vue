<template>
  <section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
      <div class="row gx-4 gx-lg-5 align-items-center">
        <div class="col-md-6">
          <img
            class="card-img-top mb-5 mb-md-0"
            :src="product.imageUrl"
            alt="..."
          />
        </div>
        <div class="col-md-6">
          <div class="small mb-1">SKU: a-{{ product.num }}</div>
          <h3 class="fw-bolder">{{ product.title }}</h3>
          <div class="fs-5 mb-5">
            <span class="text-decoration-line-through"
              >${{ product.origin_price }}</span
            >
            <p class="text-danger fs-3">${{ product.price }}</p>
          </div>
          <p class="lead mb-5" v-html="product.description"></p>
          <div class="d-flex justify-content-end">
            <!-- <input
              class="form-control text-center me-3"
              id="inputQuantity"
              type="num"
              value="1"
              style="max-width: 3rem"
            /> -->
            <select name="" id="" class="me-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
            <button
              @click="addtoCart(product.id, product.num)"
              class="btn btn-outline-dark flex-shrink-0"
              type="button"
            >
              <i class="bi-cart-fill me-1"></i>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Related items section-->
  <section class="py-5 bg-light">
    <div class="container px-4 px-lg-5 mt-5">
      <h2 class="fw-bolder mb-4">Related products</h2>
      <div
        class="
          row
          gx-4 gx-lg-5
          row-cols-2 row-cols-md-3 row-cols-xl-4
          justify-content-center
        "
      >
        <div class="col mb-5" v-for="item in products" :key="item">
          <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" :src="item.imageUrl" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">{{ item.title }}</h5>
                <!-- Product price-->
                {{ item.price }}
              </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <button
                  class="btn btn-outline-dark mt-auto"
                  @click="getProduct(item.id)"
                >
                  View options
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "product",
  setup() {
    let store = useStore();
    return { store };
  },
  data() {
    return {
      product: {},
      products: {},
      category: [],
    };
  },
  methods: {
    getProduct(id) {
      let loader = this.$loading.show();
      let vm = this;
      const api = `https://vue-course-api.hexschool.io/api/heather/product/${id}`;
      this.axios
        .get(api)
        .then((res) => {
          this.store.state.productId = id;
          vm.$router.push(`/product/${id}`);
        })
        .then(() => {
          const api2 = `https://vue-course-api.hexschool.io/api/heather/product/${this.store.state.productId}`;
          this.axios.get(api2).then((res) => {
            vm.product = res.data.product;

            loader.hide();
          });
        });
    },
    addtoCart(id, qty = 1) {
      let loader = this.$loading.show();
      const vm = this;
      const api = "https://vue-course-api.hexschool.io/api/heather/cart";
      const cart = {
        product_id: id,
        qty,
      };
      this.axios.post(api, { data: cart }).then((res) => {
        console.log(res);
        loader.hide();
        swal("成功加入購物車", "點擊繼續選購","success");
      });
    },
    
  },
  mounted() {
    let vm = this;
    let loader = this.$loading.show();
    const api = `https://vue-course-api.hexschool.io/api/heather/product/${this.store.state.productId}`;
    this.axios.get(api).then((res) => {
      vm.product = res.data.product;
      console.log(vm.product);
    });

    const api2 = "https://vue-course-api.hexschool.io/api/heather/products";
    this.axios.get(api2).then((res) => {
      vm.products = res.data.products.slice(6);
      loader.hide();
      console.log(vm.products);
    });
  },
};
</script>