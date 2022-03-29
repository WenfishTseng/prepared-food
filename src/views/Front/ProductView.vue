<template>
  <Loading v-model:active="isLoading">
    <div class="text-center">
      <div class="fa-3x text-primary">
        <i class="fa-solid fa-champagne-glasses fa-bounce"></i>
      </div>
      <div class="text-primary">Loading</div>
    </div>
  </Loading>

  <div class="container-fluid bg-light">
    <div class="container py-6 py-lg-8">
      <div class="row justify-content-center">
        <div class="col-lg-5" data-aos="fade-left" data-aos-duration="1600">
          <div class="border border-1 border-primary rounded-3 p-1">
            <img
              class="img-fluid rounded-1"
              :src="product.imageUrl"
              :alt="product.title"
            />
          </div>
        </div>
        <div
          class="offset-lg-1 col-lg-5"
          data-aos="fade-right"
          data-aos-duration="1800"
        >
          <h2 class="h3 my-3 my-lg-4">{{ product.title }}</h2>
          <div class="h5" v-if="product.price === product.origin_price">
            {{ product.price }} 元
          </div>
          <div v-else>
            <div class="h5 text-danger fw-bold">
              <span class="h6 text-dark text-decoration-line-through me-3">
                原價 {{ product.origin_price }} 元
              </span>
              現在只要 {{ product.price }} 元
            </div>
          </div>
          <p>{{ product.description }}</p>
          <p class="mb-0">
            <a
              class="btn btn-link px-0 mb-0"
              data-bs-toggle="collapse"
              href="#collapseExample"
            >
              詳細資訊
            </a>
          </p>
          <div class="collapse" id="collapseExample">
            <div class="card card-body border-0 px-0 bg-light">
              {{ product.content }}
            </div>
          </div>
          <div class="my-3">
            <div class="input-group">
              <input
                type="number"
                class="form-control"
                v-model.number="qty"
                min="1"
              />
              <button
                type="button"
                class="btn btn-danger link-light"
                @click="addCartQty"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
        <!-- col-sm-6 end -->
      </div>
    </div>
    <div class="container pb-3 pb-lg-5">
      <h2 class="h4" data-aos="fade-left" data-aos-duration="2000">相關商品</h2>
      <swiper
        data-aos="fade-right"
        data-aos-duration="2200"
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
        <template v-for="item in swiperProducts" :key="item.id">
          <swiper-slide
            v-if="item.category === product.category"
            class="pt-3 pb-5"
          >
            <router-link
              :to="`/products/${item.id}`"
              class="card border-0 position-relative h-100 bg-light"
            >
              <img
                :src="item.imageUrl"
                style="height: 200px; object-fit: cover"
                :alt="item.title"
              />
              <div class="position-absolute top-10 start-0">
                <div class="card-title text-white bg-primary px-2 py-1">
                  {{ item.category }}
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-start mt-2"
              >
                <h3 class="h5 text-dark fw-bold mb-0">
                  {{ item.title }}
                </h3>
                <span class="badge rounded-pill bg-info">{{ item.unit }}</span>
              </div>
              <div class="d-flex justify-content-between align-items-end mt-0">
                <span class="mb-0 text-decoration-line-through text-dark"
                  >NT$ {{ item.origin_price }}</span
                >
                <span class="text-primary h5 mb-0"
                  >特價：NT$ {{ item.price }}</span
                >
              </div>
            </router-link>
          </swiper-slide>
        </template>
      </swiper>
    </div>
  </div>
  <CouponModal ref="couponModal"></CouponModal>
</template>

<script>
// import emitter from '@/libs/emitter.js'
import CouponModal from '@/components/CouponModal.vue'
import { Autoplay, Navigation, Pagination, Thumbs, FreeMode } from 'swiper'

import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/thumbs/thumbs.min.css'
import 'swiper/modules/free-mode/free-mode.min.css'
import AOS from 'aos'

export default {
  data () {
    return {
      isLoading: false,
      product: {},
      swiperProducts: {},
      qty: 1,
      modules: [Autoplay, Navigation, Pagination, Thumbs, FreeMode]
    }
  },
  components: { CouponModal },
  watch: {
    $route (to) {
      this.id = to.params?.id
      this.getProduct()
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
        .catch(() => {})
    },
    getProducts () {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((response) => {
          this.swiperProducts = response.data.products
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          alert(error.data.message)
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
    AOS.init({})
  },
  mounted () {
    this.getProduct()
    this.getProducts()
    this.$refs.couponModal.openModal()
  }
}
</script>
