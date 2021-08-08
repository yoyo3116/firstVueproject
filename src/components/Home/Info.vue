<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-lg-12 mt-3">
        <div class="card ads" style='height:180px'>
          <img src="http://pic.51yuansu.com/backgd/cover/00/53/61/5c17b36bc80c4.jpg!/fw/780/quality/90/unsharp/true/compress/true" alt="" class='h-100'>
          <p class="fs-1 text-warning">-歡慶開幕- <br><span class="fs-5 fw-bolder text-success">輸入優惠碼:<span class="fs-5 fw-bold text-danger">{{code}}</span>即享9折優惠</span></p>
        </div>
      </div>
      <div
        class="
          d-flex
          justify-content-between
          flex-wrap flex-md-nowrap
          align-items-center
          py-2
          mb-3
          border-bottom
        "
      >
        <h4 class="fs-4 m-0">探索商品</h4>
        <div class="btn-toolbar mb-2 mb-md-0">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="WatchAll"
          >
            看全部
          </button>
          <div class="btn-group mx-2">
            <button
              type="button"
              class="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ selectCate }}
            </button>
            <ul class="dropdown-menu">
              <li
                v-for="item in filterCategory"
                :key="item"
                @click="filterCate(item.category)"
              >
                <a class="dropdown-item">{{ item.category }}</a>
              </li>
            </ul>
          </div>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-success dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ sortPrice }}
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" @click="sortPriceHtoL">由高到低</a>
              </li>
              <li>
                <a class="dropdown-item" @click="sortPriceLtoH">由低到高</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-md-2 py-2">
        <div class="card text-white bg-success mb-3" style="max-width: 18rem">
          <div class="card-header">Header</div>
          <div class="card-body">
            <h5 class="card-title">Success card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div> -->
      <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-3">
        <div class="row">
          <div
            v-show="item.is_enabled == 1"
            v-for="(item, index) in products"
            :key="index"
            class="col-md-3 mb-2 p-2"
          >
            <div class="card">
              <div class="card-body p-1">
                <img class="w-100" :src="item.imageUrl" alt="" />
                <h5 class="py-2 text-muted card-title">
                  {{ item.title }}
                </h5>
                <p class="card-text text-muted">
                  <span style="text-decoration: line-through"
                    >原價:{{ item.origin_price }}</span
                  >
                  <br />
                  <span class="fs-5 text-danger">特價:{{ item.price }}</span>
                </p>
                <div class="text-end">
                  <button
                    class="rounded-circle btn-outline-light btn text-danger"
                    @click="addtoCart(item.id)"
                  >
                    <i class="fas fa-heart"></i>
                  </button>
                  <button
                    @click="getProduct(item.id)"
                    class="text-success ms-1 rounded-pill btn btn-outline-light"
                  >
                    詳細內容
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template> 

<script>
import axios from "axios";
import { useStore } from "vuex";
export default {
  name: "Info",
  setup() {
    let store = useStore();
    return { store };
  },
  data() {
    return {
      products: [],
      // product:{}
      filterCategory: [],
      selectCate: "選取分類",
      sortPrice: "價錢排序",
      code:'HELLOWORLD'
    };
  },
  created() {
    let loader = this.$loading.show();
    const api = "https://vue-course-api.hexschool.io/api/heather/products/all";
    axios.get(api).then((res) => {
      console.log(res);
      this.products = res.data.products;
      loader.hide();

      const set = new Set();
      let result = this.products.filter((item) =>
        !set.has(item.category) ? set.add(item.category) : false
      );
      this.filterCategory = result;
      console.log(this.filterCategory);
    });
  },
  methods: {
    getProduct(id) {
      let loader = this.$loading.show();
      let vm = this;
      const api = `https://vue-course-api.hexschool.io/api/heather/product/${id}`;
      axios.get(api).then((res) => {
        this.store.state.productId = id;
        vm.$router.push(`/product/${id}`);
        loader.hide();

        const set = new Set();
        let result = this.products.filter((item) =>
          !set.has(item.category) ? set.add(item.category) : false
        );
        this.filterCategory = result;
        console.log(this.filterCategory);
      });
    },
    sortPriceHtoL() {
      let vm = this;
      this.products.sort(function (a, b) {
        vm.sortPrice = "由高到低";
        return b.price - a.price;
      });
    },
    sortPriceLtoH() {
      let vm = this;
      this.products.sort(function (a, b) {
        vm.sortPrice = "由低到高";
        return a.price - b.price;
      });
    },
    filterCate(e) {
      let loader = this.$loading.show();
      const api =
        "https://vue-course-api.hexschool.io/api/heather/products/all";
      axios.get(api).then((res) => {
        console.log(res);
        this.products = res.data.products;
        loader.hide();

        this.selectCate = e;

        let temp = this.products;
        return (this.products = temp.filter((x) => x.category == e));
      });
    },
    WatchAll() {
      let loader = this.$loading.show();
      const api =
        "https://vue-course-api.hexschool.io/api/heather/products/all";
      axios.get(api).then((res) => {
        console.log(res);
        this.products = res.data.products;
        loader.hide();
        this.selectCate = "選取分類";
        this.sortPrice = "價錢排序";
      });
    },
  },
};
</script>


<style scoped lang="scss">
.card-title {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ads{
  overflow: hidden;
  position: relative;
}
.ads::before{
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  left: 0;
  height: 100%;
}
.ads p{
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  height: 100%;
}
</style>