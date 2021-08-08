<template>
  <div>
    <div class="text-end border-bottom pb-3">
      <button class="btn bg-primary text-white" @click="openModal(true)">
        建立新的產品
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th width="120">優惠卷名稱</th>
          <th>到期日</th>
          <th width="80">折扣率</th>
          <th width="80">是否啟用</th>
          <th width="120">序號</th>
          <th width="120">編輯</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.due_date }}</td>
          <td>{{ item.percent }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-if="!item.is_enabled">未啟用</span>
          </td>
          <td>
            {{item.code}}
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm me-2"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="delCoupon(item.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pagination="pagination" @changePage="getCoupons"></Pagination>
    <!-- model -->
    <div
      class="modal fade"
      id="couponsModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">新增產品</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempcoupon.title"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="percent">優惠百分比</label>
                    <input
                      type="number"
                      class="form-control"
                      id="percent"
                      placeholder="輸入1~100"
                      v-model="tempcoupon.percent"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="code">序號</label>
                    <input
                      type="text"
                      class="form-control"
                      id="code"
                      placeholder="請輸入序號"
                      v-model="tempcoupon.code"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="due_date">到期日</label>
                    <input
                      type="number"
                      class="form-control"
                      id="due_date"
                      placeholder="請輸入到期日"
                      v-model="tempcoupon.due_date"
                    />
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempcoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                class="btn btn-outline-secondary"
              >
                取消
              </button>
              <button
                data-bs-dismiss="modal"
                aria-label="Close"
                type="button"
                class="btn btn-primary"
                @click="updatecoupons"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "../../main";
import Pagination from './Pagination.vue';


export default {
  name: "coupon",
  data() {
    return {
      coupons: [],
      pagination: {},
      tempcoupon: {},
      isNew: false,
    };
  },
  components: {
    Loading,Pagination
  },
  methods: {
    getCoupons(page=1) {
      let loader = this.$loading.show();
      const api = `https://vue-course-api.hexschool.io/api/heather/admin/coupons?page=${page}`;
      const vm = this;
      this.axios.get(api).then((res) => {
        loader.hide();
       
        vm.coupons = res.data.coupons;
        vm.pagination = res.data.pagination;
         console.log(res)
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempcoupon = {};
        this.isNew = true;
      } else {
        this.tempcoupon = Object.assign({}, item);
        this.isNew = false;
      }
      var myModal = new bootstrap.Modal(
        document.getElementById("couponsModal"),
        { keyboard: false }
      );
      myModal.show();
    },
    updatecoupons() {
      let api = `https://vue-course-api.hexschool.io/api/heather/admin/coupon`;
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `https://vue-course-api.hexschool.io/api/heather/admin/coupon/${vm.tempcoupon.id}`;
        httpMethod = "put";
      }
      let loader = this.$loading.show();
      this.axios[httpMethod](api, { data: vm.tempcoupon }).then((res) => {
        if (res.data.success) {
          swal("產品更新成功!", "點擊OK關閉", "success");
          vm.getCoupons();
        } else {
          swal("產品更新失敗", "系統維修中", "error");
        }
        loader.hide();
      });
    },
    delCoupon(id){

      let api = `https://vue-course-api.hexschool.io/api/heather/admin/coupon/${id}`;
      const vm = this;
      let loader = this.$loading.show();
      this.axios.delete(api).then((res) => {
        if (res.data.success) {
          swal("已刪除", "點擊OK關閉", "error");
          vm.getCoupons();
        } else {
          swal("產品更新失敗", "系統維修中", "error");
        }
        loader.hide();
      });
    }
  },
  created() {
    this.getCoupons();
  },
};
</script>
