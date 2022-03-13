<template>
  <Loading v-model:active="isLoading">
    <div class="text-center">
      <div class="fa-3x text-primary">
        <i class="fa-solid fa-champagne-glasses fa-bounce"></i>
      </div>
      <div class="text-primary">Loading</div>
    </div>
  </Loading>
  <div class="bg-secondary">
    <div class="container mt-3">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        <div class="col" v-for="product in products" :key="product.id">
          <div class="card h-100 bg-secondary border-0">
            <router-link class="card-img" :to="`/products/${product.id}`">
              <img
                :src="product.imageUrl"
                class="card-img-top"
                :alt="product.title"
              />
            </router-link>
            <div class="card-body px-0 pt-1 pb-0">
              <div class="badge rounded-pill bg-success mb-1">
                {{ product.category }}
              </div>
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
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
