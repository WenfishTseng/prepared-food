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
    <div class="row row-cols-6 g-0 mb-lg-5">
      <div class="col">
        <div
          @click="getProducts"
          class="d-flex align-items-center justify-content-around border-end border-2 border-light px-3"
        >
          <img src="./../../assets/images/steak.png" width="50" height="50" />
          <p class="mb-0 fw-bold">全部</p>
        </div>
      </div>
      <div class="col">
        <div
          @click="chooseCategory('肉類')"
          class="d-flex align-items-center justify-content-around border-end border-2 border-light px-3"
        >
          <img src="./../../assets/images/meat.png" width="50" height="50" />
          <p class="mb-0 fw-bold">肉類</p>
        </div>
      </div>
      <div class="col">
        <div
          @click="chooseCategory('湯品')"
          class="d-flex align-items-center justify-content-around border-end border-2 border-light px-3"
        >
          <img src="./../../assets/images/hot.png" width="50" height="50" />
          <p class="mb-0 fw-bold">湯品</p>
        </div>
      </div>
      <div class="col">
        <div
          @click="chooseCategory('飯類')"
          class="d-flex align-items-center justify-content-around border-end border-2 border-light px-3"
        >
          <img src="./../../assets/images/rice.png" width="50" height="50" />
          <p class="mb-0 fw-bold">飯類</p>
        </div>
      </div>
      <div class="col">
        <div
          @click="chooseCategory('麵類')"
          class="d-flex align-items-center justify-content-around border-end border-2 border-light px-3"
        >
          <img
            src="./../../assets/images/spaghetti.png"
            width="50"
            height="50"
          />
          <p class="mb-0 fw-bold">麵類</p>
        </div>
      </div>
      <div class="col">
        <div
          @click="chooseCategory('甜點')"
          class="d-flex align-items-center justify-content-around px-3"
        >
          <img src="./../../assets/images/lasagna.png" width="50" height="50" />
          <p class="mb-0 fw-bold">甜點</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-end mt-3 mb-4">
      <div class="col-md-4">
        <form class="d-flex">
          <input
            class="form-control me-auto"
            type="search"
            placeholder="今天要吃甚麼"
          />
          <button class="btn btn-outline-secondary" type="submit">Search</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-2">
        <ul class="list-group text-center list-group-flush">
          <li class="list-group-item">最新商品</li>
          <li class="list-group-item">熱銷好評</li>
          <li class="list-group-item">店長推薦</li>
        </ul>
      </div>
      <div class="col-lg-10">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div class="col" v-for="product in products" :key="product.id">
            <div class="card h-100 border-0 position-relative">
              <router-link class="card-img" :to="`/products/${product.id}`">
                <img
                  :src="product.imageUrl"
                  class="card-img-top"
                  :alt="product.title"
                />
              </router-link>
              <div
                class="badge rounded-pill bg-info mb-1 position-absolute top-10 end-10"
              >
                {{ product.category }}
              </div>
              <div class="card-body px-0 pt-1 pb-0">
                <h5 class="card-title">
                  {{ product.title }}
                </h5>
                <div
                  class="h5 mb-0"
                  v-if="product.price === product.origin_price"
                >
                  {{ product.price }} 元
                </div>
                <div class="d-flex align-items-center" v-else>
                  <del class="h6">原價 {{ product.origin_price }} 元</del>
                  <div class="h5 fw-bold ms-1">
                    特價
                    <span class="text-danger">{{ product.price }}</span>
                    元
                  </div>
                </div>
              </div>
              <div class="card-footer bg-transparent border-top-0 px-0">
                <div class="row row-cols-md-2 g-1">
                  <div class="col">
                    <button type="button" class="btn btn-outline-danger w-100">
                      <i class="bi bi-heart me-1"></i>收藏
                    </button>
                  </div>
                  <div class="col">
                    <button
                      type="button"
                      class="btn btn-primary w-100"
                      @click="addToCart(product.id)"
                    >
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-show="isCartLoadingItem === product.id"
                      ></i>
                      <i class="bi bi-cart me-1"></i>購買
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      isLoading: false,
      products: {}
    }
  },
  methods: {
    getProducts () {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((response) => {
          this.products = response.data.products
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          alert(error.data.message)
        })
    },
    addToCart (id, qty = 1) {
      this.isCartLoadingItem = id
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data: { product_id: id, qty: qty } }
        )
        .then((response) => {
          this.cartData = response.data.data
          // emitter.emit('get-cart')
          // 讀完清空id
          this.isCartLoadingItem = ''
          alert(response.data.message)
        })
        .catch((error) => {
          alert(error)
          console.dir(error)
        })
    },
    chooseCategory (category) {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}`
        )
        .then((response) => {
          this.products = response.data.products
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          alert(error.data.message)
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
