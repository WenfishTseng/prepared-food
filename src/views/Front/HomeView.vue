<template>
  <section class="hero">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 text-light">
          <div class="text-left px-4 py-5">
            <h1
              class="logo h2 text-shadow mb-3"
              data-aos="fade-left"
              data-aos-duration="1300"
            >
              加熱煮藝
            </h1>
            <h2
              class="h5 mb-6 fw-bold logo text-dark text-nowrap text-shadow fst-italic"
              data-aos="fade-left"
              data-aos-duration="1300"
            >
              愜意生活也可以隨時保持滿滿的儀式感。
            </h2>
            <form
              class="row justify-content-start"
              data-aos="fade-left"
              data-aos-duration="1300"
            >
              <div class="col-6">
                <router-link class="btn btn-primary w-100" to="/products"
                  >立即購買</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container my-5 my-md-8">
    <div class="row align-items-center">
      <div class="col-md-6" data-aos="fade-left" data-aos-duration="1200">
        <img
          class="w-100 img-fluid"
          src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
          alt="cook"
        />
      </div>
      <div class="offset-md-1 col-md-5 col-lg-4">
        <h2
          class="h3 my-3 mb-md-4"
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          我們的故事
        </h2>
        <p class="mb-4 mb-md-5" data-aos="fade-left" data-aos-duration="1500">
          在家煮藝品牌創立是源自於媽媽的堅持，希望給家人吃安心美味的料理，我們全系列產品選用天然的產銷履歷食材，秉持著「做給家人吃」的精神，傳承媽媽一甲子的好味道。
        </p>
        <div class="row">
          <div class="col-6">
            <router-link
              to="/products"
              class="btn btn-outline-dark w-100"
              data-aos="fade-left"
              data-aos-duration="1300"
            >
              查看更多
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-light py-5 py-md-8">
    <div class="container">
      <div class="row align-items-center text-end">
        <div class="col-md-6 col-lg-4 offset-lg-1">
          <h2 class="h3 mb-4" data-aos="fade-left" data-aos-duration="1200">
            食在、輕鬆
          </h2>
          <p
            class="mb-5 text-end"
            data-aos="fade-right"
            data-aos-duration="1300"
          >
            雙手奉上每份即時料理，在家簡單加熱，就可以與家人、朋友享用我們用心提供的美味餐點，我們堅持分享好的食材，輕鬆的加熱方式，在家也能愜意的擁抱重要的每個時刻。
          </p>
          <div class="row mb-3" data-aos="fade-right" data-aos-duration="1500">
            <div class="col-6">
              <router-link class="btn btn-primary w-100" to="/products"
                >立即購買</router-link
              >
            </div>
            <div class="col-6">
              <router-link to="/products" class="btn btn-outline-dark w-100"
                >查看更多</router-link
              >
            </div>
          </div>
        </div>
        <div class="d-none d-lg-block offset-lg-1 col-lg-3">
          <div
            class="promotion-box"
            data-aos="fade-right"
            data-aos-duration="1200"
          >
            <img
              class="w-100"
              src="https://images.unsplash.com/photo-1593351372318-5129f1fc04f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=380&q=80"
              alt=""
            />
          </div>
        </div>
        <div class="col-md-5 col-lg-3">
          <div
            class="promotion-box"
            data-aos="fade-right"
            data-aos-duration="1200"
          >
            <img
              class="w-100"
              src="https://images.unsplash.com/photo-1576097449798-7c7f90e1248a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=380&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container py-5">
    <h2 class="h4 text-center" data-aos="fade-left" data-aos-duration="1200">
      熱銷好評
    </h2>
    <div class="row">
      <div class="col" data-aos="fade-top" data-aos-duration="1500">
        <SwiperProducts
          :products="products"
          filter-cate="肉類"
        ></SwiperProducts>
      </div>
    </div>
  </section>

  <section class="bg-light py-5 py-lg-6">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h3
            class="text-center mb-3 mb-md-5"
            data-aos="fade-right"
            data-aos-duration="1300"
          >
            請問你是哪一派？
          </h3>
          <div class="row">
            <div class="col-md-6 mb-md-5">
              <router-link
                data-aos="fade-right"
                data-aos-duration="1500"
                to="/products"
                class="d-flex justify-content-center justify-content-md-start align-items-center"
              >
                <img
                  class="circle-card rounded-circle"
                  src="https://images.unsplash.com/photo-1577303935007-0d306ee638cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1140&q=80"
                  alt=""
                />
                <p class="h5 ms-1">無肉不歡</p>
              </router-link>
            </div>
            <div class="col-md-6 offset-lg-1 col-lg-5 mb-md-5">
              <router-link
                data-aos="fade-left"
                data-aos-duration="1800"
                to="/products"
                class="d-flex justify-content-center justify-content-md-start align-items-center"
              >
                <p class="h5 me-1">甜蜜人生</p>
                <img
                  class="circle-card rounded-circle"
                  src="https://images.unsplash.com/photo-1602296751259-edfb8274b682?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt=""
                />
              </router-link>
            </div>
            <div class="col-md-6 mb-md-5">
              <router-link
                data-aos="fade-right"
                data-aos-duration="1600"
                to="/products"
                class="d-flex justify-content-center justify-content-md-start align-items-center"
              >
                <img
                  class="circle-card rounded-circle"
                  src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt=""
                />
                <p class="h5 ms-1">輕食慢活</p>
              </router-link>
            </div>
            <div class="col-md-6 offset-lg-1 col-lg-5">
              <router-link
                data-aos="fade-left"
                data-aos-duration="1600"
                to="/products"
                class="d-flex justify-content-center justify-content-md-start align-items-center"
              >
                <p class="h5 me-1">蔬食主義</p>
                <img
                  class="circle-card rounded-circle"
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt=""
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container py-5">
    <h2 class="h4 text-center" data-aos="fade-left" data-aos-duration="1200">
      店長推薦
    </h2>
    <div class="row">
      <div class="col" data-aos="fade-top" data-aos-duration="1500">
        <SwiperProducts
          :products="products"
          filter-cate="甜點"
        ></SwiperProducts>
      </div>
    </div>
  </section>
</template>

<script>
import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import SwiperProducts from '@/components/SwiperProducts.vue'
import AOS from 'aos'

export default {
  name: 'Home',
  data () {
    return {
      isLoading: false,
      products: {},
      modules: [Autoplay, Navigation, Pagination]
    }
  },
  components: { SwiperProducts },
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
          alert.dir(error.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
    AOS.init({})
  }
}
</script>
