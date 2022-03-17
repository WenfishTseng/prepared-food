<template>
  <Loading v-model:active="isLoading">
    <div class="text-center">
      <div class="fa-3x text-primary">
        <i class="fa-solid fa-champagne-glasses fa-bounce"></i>
      </div>
      <div class="text-primary">Loading</div>
    </div>
  </Loading>
  <section class="hero">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 text-light">
          <div class="text-center px-4 py-5">
            <h1 class="logo text-shadow mb-3">加熱煮藝</h1>
            <h2
              class="h5 mb-6 fw-bold text-nowrap logo text-dark text-shadow fst-italic"
            >
              愜意生活也可以隨時保持滿滿的儀式感。
            </h2>
            <form class="row justify-content-center">
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
      <div class="col-md-6">
        <img
          class="w-100 img-fluid"
          src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
          alt="cook"
        />
      </div>
      <div class="offset-md-1 col-md-5 col-lg-4">
        <h2 class="h3 my-3 mb-md-4">我們的故事</h2>
        <p class="mb-4 mb-md-5">
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

  <section class="bg-light py-5 py-md-8">
    <div class="container">
      <div class="row align-items-center text-end">
        <div class="col-md-6 col-lg-4 offset-lg-1">
          <h2 class="h3 mb-4">食在、輕鬆</h2>
          <p class="mb-5 text-end">
            雙手奉上每份即時料理，在家簡單加熱，就可以與家人、朋友享用我們用心提供的美味餐點，我們堅持分享好的食材，輕鬆的加熱方式，在家也能愜意的擁抱重要的每個時刻。
          </p>
          <div class="row mb-3">
            <div class="col-6">
              <button class="btn btn-primary w-100">立即購買</button>
            </div>
            <div class="col-6">
              <button class="btn btn-outline-dark w-100">查看更多</button>
            </div>
          </div>
        </div>
        <div class="d-none d-lg-block offset-lg-1 col-lg-3">
          <div class="promotion-box">
            <img
              class="w-100"
              src="https://images.unsplash.com/photo-1593351372318-5129f1fc04f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=380&q=80"
              alt=""
            />
          </div>
        </div>
        <div class="col-md-5 col-lg-3">
          <div class="promotion-box">
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
    <h2 class="h4 text-center">熱銷好評</h2>
    <!-- Swiper -->
    <swiper
      :slidesPerView="1"
      :spaceBetween="10"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      :pagination="{
        clickable: true
      }"
      :breakpoints="{
        '640': {
          slidesPerView: 1,
          spaceBetween: 20
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 40
        },
        '1024': {
          slidesPerView: 4,
          spaceBetween: 50
        }
      }"
      :modules="modules"
      class="mySwiper"
    >
      <template v-for="product in products" :key="product.id">
        <swiper-slide v-if="product.category === '肉類'" class="pt-3 pb-5">
          <div class="card border-0 position-relative h-100">
            <img
              :src="product.imageUrl"
              style="height: 200px; object-fit: cover"
              :alt="product.title"
            />
            <div class="position-absolute top-10 start-0">
              <div class="card-title text-white bg-primary px-2 py-1">
                {{ product.category }}
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-start mt-2">
              <h3 class="h5 mb-0">{{ product.title }}</h3>
              <span class="badge rounded-pill bg-info">{{ product.unit }}</span>
            </div>
            <div class="d-flex justify-content-between align-items-end mt-0">
              <span class="mb-0 text-decoration-line-through">NT$ 1200</span>
              <span class="text-primary h5 mb-0">特價：NT$ 999</span>
            </div>
          </div>
        </swiper-slide>
      </template>
    </swiper>
  </section>

  <section class="bg-light py-5 py-lg-6">
    <div class="container">
      <h3 class="text-center mb-3 mb-md-5">請問你是哪一派？</h3>
      <div class="row">
        <div class="col-lg-4 offset-lg-2 mb-lg-5">
          <div
            class="d-flex justify-content-around align-items-center text-hover"
          >
            <img
              class="rounded-circle circle-card"
              src="https://images.unsplash.com/photo-1577303935007-0d306ee638cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1140&q=80"
              alt=""
            />
            <p class="h5">無肉不歡</p>
          </div>
        </div>
        <div class="col-lg-4 mb-lg-5">
          <div
            class="d-flex justify-content-around align-items-center text-hover"
          >
            <p class="h5">甜蜜人生</p>
            <img
              class="rounded-circle circle-card"
              src="https://images.unsplash.com/photo-1602296751259-edfb8274b682?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </div>
        </div>
        <div class="col-lg-4 offset-lg-2 mb-lg-5">
          <div
            class="d-flex justify-content-around align-items-center text-hover"
          >
            <img
              class="rounded-circle circle-card"
              src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
            <p class="h5">輕食慢活</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div
            class="d-flex justify-content-around align-items-center text-hover"
          >
            <p class="h5">蔬食主義</p>
            <img
              class="rounded-circle circle-card"
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container py-5">
    <h2 class="h4 text-center">店長推薦</h2>
    <swiper
      :slidesPerView="1"
      :spaceBetween="10"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      :pagination="{
        clickable: true
      }"
      :breakpoints="{
        '640': {
          slidesPerView: 1,
          spaceBetween: 20
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 40
        },
        '1024': {
          slidesPerView: 4,
          spaceBetween: 50
        }
      }"
      :modules="modules"
      class="mySwiper"
    >
      <template v-for="product in products" :key="product.id">
        <swiper-slide v-if="product.category === '飯類' || product.category ==='麵類'" class="pt-3 pb-5">
          <div class="card border-0 position-relative h-100">
            <img
              :src="product.imageUrl"
              style="height: 200px; object-fit: cover"
              :alt="product.title"
            />
            <div class="position-absolute top-10 start-0">
              <div class="card-title text-white bg-primary px-2 py-1">
                {{ product.category }}
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-start mt-2">
              <h3 class="h5 mb-0">{{ product.title }}</h3>
              <span class="badge rounded-pill bg-info">{{ product.unit }}</span>
            </div>
            <div class="d-flex justify-content-between align-items-end mt-0">
              <span class="mb-0 text-decoration-line-through">NT$ 1200</span>
              <span class="text-primary h5 mb-0">特價：NT$ 999</span>
            </div>
          </div>
        </swiper-slide>
      </template>
    </swiper>
  </section>

</template>

<script>
import { Autoplay, Navigation, Pagination } from 'swiper'

import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/pagination/pagination.min.css'

export default {
  name: 'Home',
  data () {
    return {
      isLoading: false,
      products: {},
      modules: [Autoplay, Navigation, Pagination]
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
