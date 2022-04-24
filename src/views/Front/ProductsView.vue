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
    <div
      class="row row-cols-md-3 row-cols-lg-6 g-md-2 g-lg-3 d-none d-md-flex"
      data-aos="fade-top"
      data-aos-duration="1500"
    >
      <div class="category-hover col px-0">
        <div
          @click="getProducts"
          class="d-flex align-items-center justify-content-around border-end border-2 border-light"
        >
          <img
            src="./../../assets/images/steak.png"
            alt="icon"
            width="50"
            height="50"
          />
          <p class="mb-0 fw-bold">全部</p>
        </div>
      </div>
      <div class="category-hover col px-0">
        <div
          @click="renderProductsByCategory('肉類')"
          class="d-flex align-items-center justify-content-around border-end border-2 border-light"
        >
          <img
            src="./../../assets/images/meat.png"
            alt="icon"
            width="50"
            height="50"
          />
          <p class="mb-0 fw-bold">肉類</p>
        </div>
      </div>
      <div class="category-hover col px-0">
        <div
          @click="renderProductsByCategory('湯品')"
          class="d-flex align-items-center justify-content-around border-end border-2 border-light"
        >
          <img
            src="./../../assets/images/hot.png"
            alt="icon"
            width="50"
            height="50"
          />
          <p class="mb-0 fw-bold">湯品</p>
        </div>
      </div>
      <div class="category-hover col px-0">
        <div
          @click="renderProductsByCategory('飯類')"
          class="d-flex align-items-center justify-content-around border-end border-2 border-light"
        >
          <img
            src="./../../assets/images/rice.png"
            alt="icon"
            width="50"
            height="50"
          />
          <p class="mb-0 fw-bold">飯類</p>
        </div>
      </div>
      <div class="category-hover col px-0">
        <div
          @click="renderProductsByCategory('麵類')"
          class="d-flex align-items-center justify-content-around border-end border-2 border-light"
        >
          <img
            src="./../../assets/images/spaghetti.png"
            width="50"
            height="50"
            alt="icon"
          />
          <p class="mb-0 fw-bold">麵類</p>
        </div>
      </div>
      <div class="category-hover col px-0">
        <div
          @click="renderProductsByCategory('甜點')"
          class="d-flex align-items-center justify-content-around px-3"
        >
          <img
            src="./../../assets/images/lasagna.png"
            alt="icon"
            width="50"
            height="50"
          />
          <p class="mb-0 fw-bold">甜點</p>
        </div>
      </div>
    </div>
    <div
      class="row justify-content-center mb-3 my-md-5"
      data-aos="fade-left"
      data-aos-duration="1500"
    >
      <div class="col-md-8 col-lg-6">
        <form class="d-flex">
          <input
            v-model="inputKeyword"
            class="form-control me-auto"
            type="search"
            placeholder="今天要吃甚麼"
          />
          <button
            class="btn btn-outline-secondary"
            type="submit"
            @click.prevent="searchKeyword"
          >
            Search
          </button>
        </form>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div class="col" v-for="product in products" :key="product.id">
            <div class="card h-100 border-0 position-relative">
              <router-link class="card-img" :to="`/products/${product.id}`">
                <img
                  :src="product.imageUrl"
                  class="card-img-top"
                  alt="product"
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
                  <del class="h6 opacity-75">原價 {{ product.origin_price }} 元</del>
                  <div class="h5 fw-bold ms-1">
                    特價
                    <span class="text-danger">{{ product.price }}</span>
                    元
                  </div>
                </div>
              </div>
              <div class="card-footer bg-transparent border-top-0 px-0">
                <div class="row row-cols-md-2 g-2">
                  <div class="col">
                    <button
                      type="button"
                      class="btn btn-danger text-light w-100"
                      v-if="favoriteItem.includes(product.id)"
                      @click="toggleFavorite(product.id)"
                    >
                      <i class="bi bi-arrow-through-heart-fill me-1"></i>已收藏
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger w-100"
                      v-else
                      @click="toggleFavorite(product.id)"
                    >
                      <i class="bi bi-heart me-1"></i>收藏
                    </button>
                  </div>
                  <div class="col">
                    <button
                      type="button"
                      class="btn btn-primary w-100"
                      @click="addToCart(product.id)"
                    >
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
    <div class="row mt-3">
      <div class="col-12">
        <PaginationView
          :pages="pagination"
          @get-product="getProducts"
        ></PaginationView>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos'
import PaginationView from '@/components/PaginationView.vue'

export default {
  name: 'Products',
  data () {
    return {
      isCartLoadingId: '',
      isLoading: false,
      products: [],
      allProductsList: [],
      favoriteItem: JSON.parse(localStorage.getItem('favors')) || [],
      inputKeyword: '',
      // page
      pagination: {}
    }
  },
  components: { PaginationView },
  methods: {
    getAllProductsList () {
      const apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(apiUrl)
        .then((response) => {
          this.allProductsList = response.data.products
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    searchKeyword () {
      this.products = this.allProductsList.filter((item) => {
        return item.title.match(this.inputKeyword.trim())
      })
      this.inputKeyword = ''
    },
    getProducts (page = 1) {
      this.renderProductsByCategory('all', page)
    },
    addToCart (id, qty = 1) {
      this.isLoading = true
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data: { product_id: id, qty: qty } }
        )
        .then((response) => {
          this.cartData = response.data.data
          this.isLoading = false
          alert(response.data.message)
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    },
    renderProductsByCategory (category, page = 1) {
      this.isLoading = true
      let apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}`
      if (category === 'all') {
        apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      }
      this.$http
        .get(apiUrl)
        .then((response) => {
          this.products = response.data.products
          this.pagination = response.data.pagination
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          alert(error.data.message)
        })
    },
    toggleFavorite (id) {
      const favorIndex = this.favoriteItem.findIndex((item) => item === id)
      if (favorIndex < 0) {
        this.favoriteItem.push(id)
      } else {
        this.favoriteItem.splice(id, 1)
      }
    }
  },
  watch: {
    favoriteItem: {
      handler () {
        localStorage.setItem('favors', JSON.stringify(this.favoriteItem))
      },
      deep: true
    }
  },
  created () {
    AOS.init({})
    this.getProducts()
    this.getAllProductsList()
  }
}
</script>
