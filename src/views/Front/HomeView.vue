<template>
  <section class="hero">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-4 text-light">
          <div class="text-center px-4 py-5">
            <h1 class="logo mb-4">加熱煮藝</h1>
            <div class="h4 text-primary text-shadow fw-bold">
              <span>無添加</span>
              <span class="mx-4">10min</span>
              <span>輕鬆生活</span>
            </div>
            <h2 class="h5 my-5 fw-bold">
              愜意生活也可以隨時保持滿滿的儀式感。
            </h2>
            <form class="row justify-content-center">
              <div class="col-6">
                <router-link
                  class="btn btn-primary text-light w-100"
                  to="/products"
                  >立即購買</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container my-8">
    <div class="row align-items-center">
      <div class="col-md-6">
        <img
          class="w-100 img-fluid"
          src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
          alt="cook"
        />
      </div>
      <div class="offset-md-1 col-md-4">
        <h2 class="h3 mb-4">我們的故事</h2>
        <p class="mb-5">
          在家煮藝品牌創立是源自於媽媽的堅持，希望給家人吃安心美味的料理，我們全系列產品選用天然的產銷履歷食材，秉持著「做給家人吃」的精神，傳承媽媽一甲子的好味道。
        </p>
        <div class="row">
          <div class="col-6">
            <button class="btn btn-outline-dark w-100">查看更多</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-light py-8">
    <div class="container">
      <div class="row align-items-center text-end">
        <div class="col-md-4 offset-md-1">
          <h2 class="h3 mb-4">食在、輕鬆</h2>
          <p class="mb-5 text-end">
            雙手奉上每份即時料理，在家簡單加熱，就可以與家人、朋友享用我們用心提供的美味餐點，我們堅持分享好的食材，輕鬆的加熱方式，在家也能愜意的擁抱重要的每個時刻。
          </p>
          <div class="row">
            <div class="col-6">
              <button class="btn btn-primary text-secondary w-100">
                立即購買
              </button>
            </div>
            <div class="col-6">
              <button class="btn btn-outline-dark w-100">查看更多</button>
            </div>
          </div>
        </div>
        <div class="offset-md-1 col-md-3">
          <div class="promotion-box">
            <img
              class="w-100"
              src="https://images.unsplash.com/photo-1593351372318-5129f1fc04f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=402&q=80"
              alt=""
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="promotion-box">
            <img
              class="w-100"
              src="https://images.unsplash.com/photo-1576097449798-7c7f90e1248a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container py-6">
    <h2 class="h4 text-center mb-4">熱銷好評</h2>
    <div class="row row-cols-4">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card border-0 position-relative">
          <img
            :src="product.imageUrl"
            class="img-fluid ratio ratio-4x3"
            :alt="product.title"
          />
          <div class="position-absolute top-10 start-0">
            <div class="card-title text-white bg-primary px-2 py-1">
              產地：台灣
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <h3 class="h5 mb-0">{{ product.title }}</h3>
            <span class="badge rounded-pill bg-primary">肉類</span>
          </div>
          <div class="d-flex justify-content-between align-items-end mt-0">
            <span class="mb-0 text-decoration-line-through">NT$ 1200</span>
            <span class="text-primary h4 mb-0">特價：NT$ 999</span>
          </div>
        </div>
      </div>

      <!-- <div class="col">
        <div class="card border-0 position-relative">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            class="img-fluid ratio ratio-4x3"
            alt="..."
          />
          <div class="position-absolute top-10 start-0">
            <div class="card-title text-white bg-primary px-2 py-1">
              產地：台灣
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <h3 class="h5 mb-0">巨無霸BBQ豬肋排</h3>
            <span class="badge rounded-pill bg-primary">肉類</span>
          </div>
          <div class="d-flex justify-content-between align-items-end mt-0">
            <span class="mb-0 text-decoration-line-through">NT$ 1200</span>
            <span class="text-primary h4 mb-0">特價：NT$ 999</span>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card border-0 position-relative">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            class="img-fluid ratio ratio-4x3"
            alt="..."
          />
          <div class="position-absolute top-10 start-0">
            <div class="card-title text-white bg-primary px-2 py-1">
              產地：台灣
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <h3 class="h5 mb-0">巨無霸BBQ豬肋排</h3>
            <span class="badge rounded-pill bg-primary">肉類</span>
          </div>
          <div class="d-flex justify-content-between align-items-end mt-0">
            <span class="mb-0 text-decoration-line-through">NT$ 1200</span>
            <span class="text-primary h4 mb-0">特價：NT$ 999</span>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card border-0 position-relative">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            class="img-fluid ratio ratio-4x3"
            alt="..."
          />
          <div class="position-absolute top-10 start-0">
            <div class="card-title text-white bg-primary px-2 py-1">
              產地：台灣
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <h3 class="h5 mb-0">巨無霸BBQ豬肋排</h3>
            <span class="badge rounded-pill bg-primary">肉類</span>
          </div>
          <div class="d-flex justify-content-between align-items-end mt-0">
            <span class="mb-0 text-decoration-line-through">NT$ 1200</span>
            <span class="text-primary h4 mb-0">特價：NT$ 999</span>
          </div>
        </div>
      </div> -->
    </div>
  </section>

  <section class="container">

  </section>

  <section class="bg-light py-8">
    <div class="container">
      <h3 class="text-center">請問你是哪一派？</h3>
      <div class="row">
        <div class="col-6"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
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
