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

    <div class="row">
      <div class="col-6">
        <p class="text-primary fw-bold">試營運20日天天免運</p>
      </div>
      <div class="col-12">
        <p class="text-end">
          應付金額
          <span class="h4 fw-bold text-danger"> NT$ {{ cartData.total }}</span>
        </p>
      </div>
      <div class="offset-lg-9 col-lg-3 text-end mb-3">
        <button
          class="btn btn-outline-dark w-100"
          @click="goBackPage"
          type="button"
        >
          回上一頁
        </button>
      </div>
    </div>

    <Form v-slot="{ errors }" ref="form" @submit="onSubmit" class="row">
      <div class="col-12">
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
          <error-message name="email" class="invalid-feedback"></error-message>
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
      </div>
      <div class="offset-lg-9 col-lg-3 text-end mb-3">
        <button
          class="btn btn-primary w-100"
          :disabled="Object.keys(errors).length > 0 || cartData.total === 0"
          type="submit"
        >
          送出訂單
        </button>
      </div>
    </Form>
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
    }
  },
  created () {
    this.getCarts()
  }
}
</script>
