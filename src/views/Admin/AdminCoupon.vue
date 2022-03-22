<template>
  <div class="container py-3 py-lg-5">
    <div class="row">
      <div class="col-lg-5">
        <h1 class="text-center h4">製作優惠券</h1>
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="couponTitleInput" class="form-label">優惠券名稱</label>
            <input
              type="text"
              class="form-control"
              id="couponTitleInput"
              placeholder="請輸入優惠券名稱"
              v-model="coupon.title"
            />
          </div>
          <div class="mb-3">
            <label for="couponCodeInput" class="form-label">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="couponCodeInput"
              placeholder="EX. 雞不可失"
              v-model="coupon.code"
            />
          </div>
          <div class="mb-3">
            <label for="couponDiscountInput" class="form-label">折扣</label>
            <input
              type="number"
              class="form-control"
              placeholder="EX. 90"
              id="couponDiscountInput"
              v-model="coupon.percent"
            />
          </div>
          <div class="mb-3">
            <label for="couponDateInput" class="form-label">期限</label>
            <input
              type="date"
              class="form-control"
              id="couponDateInput"
              v-model="coupon.due_date"
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              :true-value="parseInt(1)"
              :false-value="parseInt(0)"
              class="form-check-input"
              id="useCheck"
              v-model="coupon.is_enabled"
            />
            <label class="form-check-label" for="useCheck">開始使用</label>
          </div>
          <button type="submit" class="btn btn-primary me-3">確認</button>
          <button type="button" class="btn btn-outline-info">清除</button>
        </form>
      </div>
      <div class="offset-lg-1 col-lg-6">
        <div class="row row-cols-2 g-3">
          <div class="col" v-for="item in coupons" :key="item.title + '123'">
            <div class="card text-center">
              <div class="card-header">
                {{ item.title }}
                <span class="text-success" v-if="true"
                  ><i class="bi bi-check-circle-fill me-1"></i>啟用</span
                >
                <span class="text-danger" v-else
                  ><i class="bi bi-x-circle-fill me-1"></i>不開放</span
                >
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ item.percent }} %</h5>
                <p class="card-text h4 my-3">{{ item.code }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row mt-3 mt-lg-5">
      <div class="col-12">
        <PaginationView
          :pages="pagination"
          @get-product="getData"
        ></PaginationView>
      </div>
    </div> -->
  </div>
</template>

<script>
// import PaginationView from '@/components/PaginationView.vue'

export default {
  data () {
    return {
      coupons: [],
      coupon: {},
      tempCoupon: {},
      // page
      pagination: {}
    }
  },
  // components: { PaginationView },
  mounted () {
    this.getCouponsData()
  },
  methods: {
    getCouponsData () {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`
        )
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.coupons)
            this.coupons = response.data.coupons
            // this.coupon.due_date = Math.floor(new Date(this.coupon.due_date) / 1000)
          }
        })
        .catch((error) => {
          console.dir(error)
        })
    },
    onSubmit () {
      this.coupon.due_date = Math.floor(new Date(this.coupon.due_date) / 1000)
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`,
          {
            data: this.coupon
          }
        )
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message)
            this.coupon = {}
            this.getCouponsData()
          }
        })
        .catch((error) => {
          console.dir(error)
        })
    }
  },
  created () {
    this.getCouponsData()
  }
}
</script>
