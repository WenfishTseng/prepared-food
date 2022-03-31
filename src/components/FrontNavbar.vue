<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container">
      <a class="logo navbar-brand" href="#" @click="closeMenu"><h1 class="h4 mb-0">加熱煮藝</h1></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-target="#myNavbar"
        @click="toggleMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="myNavbar" ref="collapse">
        <ul class="navbar-nav mb-2 mb-lg-0 justify-content-end w-100">
          <li class="nav-item me-lg-3">
            <router-link class="nav-link" to="/products" @click="closeMenu">產品列表</router-link>
          </li>
          <li class="nav-item me-lg-3">
            <router-link class="nav-link" to="/cart" @click="closeMenu">購物車</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
import collapseMixin from '@/mixins/collapseMixin'

export default {
  name: 'FrontNavbar',
  mixins: [collapseMixin]
}
</script>
