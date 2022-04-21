<template>
  <Loading v-model:active="isLoading">
    <div class="text-center">
      <div class="fa-3x text-primary">
        <i class="fa-solid fa-champagne-glasses fa-bounce"></i>
      </div>
      <div class="text-primary">Loading</div>
    </div>
  </Loading>
  <div class="container my-5 my-lg-6">
    <div class="row row-cols-1 row-cols-lg-4 g-3 align-items-center">
      <div
        class="col d-none d-lg-block bg-dark text-light border border-2 border-white"
      >
        <p class="mb-0 px-3 py-4 h5">購物車結帳流程</p>
      </div>
      <div class="col d-none d-lg-block bg-light border border-2 border-white">
        <p class="mb-0 px-3 py-4 h5">1. 放入購物車</p>
      </div>
      <div class="col bg-dark text-light border border-2 border-white">
        <p class="mb-0 px-3 py-4 h5">2. 資料確認</p>
      </div>
      <div class="col d-none d-lg-block bg-light border border-2 border-white">
        <p class="mb-0 px-3 py-4 h5">3. 完成購物</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table align-middle mt-3">
          <thead>
            <tr>
              <th width="150"></th>
              <th width="300">商名</th>
              <th class="text-end">數量</th>
              <th width="120" class="text-end">單價</th>
              <th width="120" class="text-end">小計</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cartData.carts">
              <tr v-for="item in cartData.carts" :key="item.id">
                <td>
                  <div
                    style="
                      height: 100px;
                      background-size: cover;
                      background-position: center;
                    "
                    :style="{
                      backgroundImage: `url(${item.product.imageUrl})`
                    }"
                  ></div>
                </td>
                <td>
                  <span>{{ item.product.title }}</span>
                </td>
                <td class="text-end">
                  {{ item.qty }}
                </td>
                <td class="text-end">
                  {{ item.product.price }}
                </td>
                <td class="text-end">
                  {{ item.product.price * item.qty }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <td></td>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="row my-1">
      <div class="col-md-6">
        <p class="text-primary fw-bold">試營運20日天天免運</p>
      </div>
      <div class="offset-lg-3 col-lg-3">
        <div class="input-group mb-3">
          <input
            type="text"
            v-model="code"
            class="form-control"
            placeholder="優惠碼"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            @click.prevent="getCoupon"
          >
            確認
          </button>
        </div>
      </div>
      <div class="col-12 my-1" v-if="cartData.total === cartData.final_total">
        <p class="text-end mb-0">
          金額
          <span class="h5 fw-bold"> NT$ {{ cartData.total }}</span>
        </p>
      </div>
      <div class="col-12 my-2" v-else>
        <p class="text-end mb-0 text-decoration-line-through">
          原始金額
          <span class="h5"> NT$ {{ cartData.total }}</span>
        </p>
        <p class="text-end">
          <span class="alert alert-primary py-1 me-1" v-if="successCode"
            >已套用優惠碼: {{ successCode }}</span
          >
          折扣後金額
          <span class="h4 fw-bold text-danger ms-1 ms-lg-2">
            NT$ {{ Math.round(cartData.final_total) }}</span
          >
        </p>
      </div>
    </div>
    <Form
      v-slot="{ errors }"
      ref="form"
      @submit="onSubmit"
      class="row justify-content-center"
    >
      <div class="col-lg-8">
        <h1 class="h4 text-center fw-bold mb-3">收件資訊</h1>
        <div class="mb-3">
          <label for="email" class="form-label">收件人信箱</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          />
          <ErrorMessage name="email" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="max:12||required"
            v-model="form.user.name"
          />
          <ErrorMessage name="姓名" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人手機號碼</label>
          <Field
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            v-model="form.user.tel"
            :rules="isFormPhone"
          />
          <ErrorMessage name="電話" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          />
          <ErrorMessage name="地址" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
      </div>
      <div class="col-lg-8 text-end my-3 my-lg-4">
        <div class="row">
          <div class="col-lg-6 mb-3 my-lg-0">
            <button
              class="btn btn-outline-dark w-100"
              @click="goBackPage"
              type="button"
            >
              回上一頁
            </button>
          </div>
          <div class="col-lg-6 my-1 my-lg-0">
            <button
              class="btn btn-primary w-100"
              :disabled="Object.keys(errors).length > 0 || cartData.total === 0"
              type="submit"
            >
              送出訂單
            </button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'

export default {
  data () {
    return {
      // 購物車列表
      cartData: {},
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      code: '',
      successCode: ''
    }
  },
  methods: {
    getCarts () {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((response) => {
          this.cartData = response.data.data
          emitter.emit('get-cart')
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          alert(error)
        })
    },
    isFormPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    onSubmit () {
      const order = this.form
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`,
          { data: order }
        )
        .then((response) => {
          alert(response.data.message)
          this.$refs.form.resetForm()
          this.getCarts()
          this.$router.push('/result')
        })
        .catch((error) => {
          console.dir(error)
        })
    },
    goBackPage () {
      this.$router.go(-1)
    },
    getCoupon () {
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`,
          {
            data: {
              code: this.code
            }
          }
        )
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message)
            this.cartData.final_total = Math.round(
              response.data.data.final_total
            )
            this.successCode = this.code
            this.code = ''
          }
        })
        .catch((error) => {
          alert(error.response.data.message)
          this.code = ''
        })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
