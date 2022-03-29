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
      <div class="col bg-dark text-light border border-2 border-white">
        <p class="mb-0 px-3 py-4 h5">1. 放入購物車</p>
      </div>
      <div class="col d-none d-lg-block bg-light border border-2 border-white">
        <p class="mb-0 px-3 py-4 h5">2. 資料確認</p>
      </div>
      <div class="col d-none d-lg-block bg-light border border-2 border-white">
        <p class="mb-0 px-3 py-4 h5">3. 完成購物</p>
      </div>
    </div>

    <div class="row my-3">
      <div class="col-12 text-end">
        <button
          class="btn btn-outline-dark"
          type="button"
          @click="removeAllCarts"
          :disabled="cartData.total === 0"
        >
          清空購物車
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table align-middle mt-3">
          <thead>
            <tr>
              <th width="200"></th>
              <th width="500">商名</th>
              <th width="200" class="text-end">數量</th>
              <th width="100" class="text-end">單價</th>
              <th width="100" class="text-end">小計</th>
              <th width=100 class="text-end">刪除</th>
            </tr>
          </thead>
          <tbody>
            <!-- 確認購物車資料有沒有存在 -->
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
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <select
                        name="cartNum"
                        id="cart"
                        class="form-select"
                        v-model="item.qty"
                        @change="updateCart(item)"
                      >
                        <option v-for="i in 20" :value="i" :key="i + 'cart'">
                          {{ i }}
                        </option>
                      </select>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  {{ item.product.price }}
                </td>
                <td class="text-end">
                  {{ item.product.price * item.qty }}
                </td>
                <td class="text-end">
                  <button
                    type="button"
                    @click="removeCartItem(item.id)"
                    class="btn btn-outline-danger btn-sm"
                  >
                    x
                  </button>
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

    <div class="row mb-3">
      <div class="col-6">
        <p class="text-primary fw-bold">試營運20日天天免運</p>
      </div>
      <div class="col-md-12 text-end">
        <p>
          應付金額
          <span class="h4 fw-bold text-dark"> NT$ {{ cartData.total }}</span>
        </p>
      </div>
      <div class="col-12">
        <div class="row justify-content-end">
          <div class="col-lg-3 mb-3">
            <button
              class="btn btn-outline-dark w-100"
              @click="goProductsPage"
              type="button"
            >
              繼續購物
            </button>
          </div>
          <div class="col-lg-3">
            <button
              class="btn btn-primary w-100"
              type="button"
              @click="goOrderPage"
              :disabled="cartData.total === 0"
            >
              確認訂單，結帳
            </button>
          </div>
        </div>
      </div>
    </div>
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
      isLoading: false
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
        })
        .catch((error) => {
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
          alert(error)
        })
    },
    removeCartItem (id) {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then((response) => {
          this.getCarts()
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
    goProductsPage () {
      this.$router.push('/products')
    },
    goOrderPage () {
      this.$router.push('/order')
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
