<template>
  <Loading v-model:active="isLoading">
    <div class="text-center">
      <div class="fa-3x text-primary">
        <i class="fa-solid fa-champagne-glasses fa-bounce"></i>
      </div>
      <div class="text-primary">Loading</div>
    </div>
  </Loading>

  <div
    class="container mt-5"
    style="
      background-image: 'https://images.unsplash.com/photo-1564352969642-6eed54e55309?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80';
    "
  >
    <div class="row justify-content-center">
      <div class="col-md-5 offset-md-1">
        <div class="border border-1 border-primary rounded-3 p-2">
          <img
            class="img-fluid rounded-1"
            :src="product.imageUrl"
            :alt="product.title"
          />
        </div>
      </div>
      <div class="col-md-5">
        <h2 class="h4">{{ product.title }}</h2>
        <p>商品描述：{{ product.description }}</p>
        <p>商品內容：{{ product.content }}</p>
        <div class="h5" v-if="product.price === product.origin_price">
          {{ product.price }} 元
        </div>
        <div v-else>
          <div class="h6 text-decoration-line-through">
            原價 {{ product.origin_price }} 元
          </div>
          <div class="h5 text-danger fw-bold">
            現在只要 {{ product.price }} 元
          </div>
        </div>
        <div>
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              v-model.number="qty"
              min="1"
            />
            <button type="button" class="btn btn-danger" @click="addCartQty">
              加入購物車
            </button>
          </div>
        </div>
      </div>
      <!-- col-sm-6 end -->
    </div>
  </div>
</template>

<script>
// import emitter from '@/libs/emitter.js'

export default {
  data () {
    return {
      isLoading: false,
      product: {},
      qty: 1
    }
  },
  methods: {
    getProduct () {
      this.isLoading = true
      const { id } = this.$route.params
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
        )
        .then((response) => {
          this.product = response.data.product
          this.isLoading = false
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    },
    addCartQty () {
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data: { product_id: this.product.id, qty: this.qty } }
        )
        .then((response) => {
          this.cartData = response.data.data
          // emitter.emit('get-cart')
          alert(response.data.message)
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
  },
  created () {
    this.getProduct()
  }
}
</script>
