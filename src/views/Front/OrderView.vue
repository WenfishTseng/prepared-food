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
    <div class="row row-cols-lg-4 g-3 align-items-center">
      <div class="col bg-dark text-light border border-2 border-white">
        <p class="mb-0 px-3 py-4 h5">購物車結帳流程</p>
      </div>
      <div class="col bg-light border border-2 border-white">
        <p class="mb-0 px-3 py-4 h5">1. 放入購物車</p>
      </div>
      <div class="col bg-dark text-light border border-2 border-white">
        <p class="mb-0 px-3 py-4 h5">2. 資料確認</p>
      </div>
      <div class="col bg-light border border-2 border-white"></div>
        <p class="mb-0 px-3 py-4 h5">3. 完成購物</p>
      </div>
    </div>
    <table class="table align-middle mt-3">
      <thead>
        <tr>
          <th width="150"></th>
          <th>商名</th>
          <th width="150">數量</th>
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
                :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
              ></div>
            </td>
            <td>
              <span>{{ item.product.title }}</span>
            </td>
            <td>
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
        <td width="200">
          <p class="text-primary fw-bold">試營運20日天天免運</p>
        </td>
      </tfoot>
    </table>
    <div class="row">
      <div class="col">
        <p class="text-end">
          應付金額
          <span class="h4 fw-bold text-danger"> NT$ {{ cartData.total }}</span>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <Form v-slot="{ errors }" ref="form" @submit="onSubmit">
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
            ></Field>
            <error-message
              name="email"
              class="invalid-feedback"
            ></error-message>
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
              rules="min:8||max:12||required"
              v-model="form.user.name"
            ></Field>
            <error-message name="姓名" class="invalid-feedback"></error-message>
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
            ></Field>
            <error-message name="電話" class="invalid-feedback"></error-message>
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
            ></Field>
            <error-message name="地址" class="invalid-feedback"></error-message>
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

          <div class="text-end my-3">
            <!-- 若有錯誤或購物車數量為0不可以送出表單 -->
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="Object.keys(errors).length > 0 || cartData.total === 0"
            >
              送出訂單
            </button>
          </div>
        </Form>
      </div>
    </div>
    <!-- <div class="row mb-3 align-items-center">
      <div class="col-md-12 text-end">
        <p>
          應付金額
          <span class="h4 fw-bold text-danger"> NT$ {{ cartData.total }}</span>
        </p>
      </div>
      <div class="col-12">
        <div class="row justify-content-end">
          <div class="col-3">
            <button
              class="btn btn-primary w-100"
              type="button"
              @click="goOrderPage"
              :disabled="cartData.total === 0"
            >
              結帳
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

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
      }
    }
  },
  components: { Loading },
  methods: {
    getCarts () {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((response) => {
          this.cartData = response.data.data
          emitter.emit('get-cart')
          this.isLoading = false
          console.log(this.cartData)
        })
        .catch((error) => {
          this.isLoading = false
          alert(error)
        })
    },
    updateCart (item) {
      this.isCartLoadingItem = item.id
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          { data: { product_id: item.id, qty: item.qty } }
        )
        .then((response) => {
          this.getCarts()
          this.isCartLoadingItem = ''
        })
        .catch((error) => {
          alert(error.data)
        })
    },
    removeCartItem (id) {
      this.isDeleteLoadingItem = id
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then((response) => {
          this.getCarts()
          // 讀完清空id
          this.isDeleteLoadingItem = ''
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    removeAllCarts () {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
        )
        .then((response) => {
          this.getCarts()
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    goOrderPage () {
      this.$router.go(-1)
    },
    goProductsPage () {
      this.$router.push('/products')
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
          this.$router.push('/products')
        })
        .catch((error) => {
          console.dir(error)
        })
    },
    goBackPage () {
      this.$router.go(-1)
    }
  },
  created () {
    this.getCarts()
  }
}
</script>
