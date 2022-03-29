<template>
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
    class="swiper-container"
  >
    <template v-for="product in products" :key="product.id">
      <swiper-slide v-if="product.category === newCate" class="pt-3 pb-5">
        <router-link
          :to="`/products/${product.id}`"
          class="card border-0 position-relative h-100"
        >
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
            <h3 class="h5 text-dark fw-bold mb-0">{{ product.title }}</h3>
            <span class="badge rounded-pill bg-info">{{ product.unit }}</span>
          </div>
          <div class="d-flex justify-content-between align-items-end mt-0">
            <span class="mb-0 text-decoration-line-through text-dark">NT$ {{product.origin_price}}</span>
            <span class="text-primary h5 mb-0">特價：NT$ {{product.price}}</span>
          </div>
        </router-link>
      </swiper-slide>
    </template>
  </swiper>
</template>

<script>
import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/pagination/pagination.min.css'

export default {
  data () {
    return {
      modules: [Autoplay, Navigation, Pagination],
      newCate: ''
    }
  },
  props: ['products', 'filterCate'],
  mounted () {
    this.newCate = this.filterCate
  }
}
</script>
