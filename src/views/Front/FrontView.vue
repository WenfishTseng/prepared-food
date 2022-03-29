<template>
  <!-- sticky-top -->
  <div class="bg-primary text-light container-fluid">
    <ul
      class="list-unstyled d-flex justify-content-center align-content-center mb-0"
    >
      <li class="my-1">
        <a class="link-light" href="#"><i class="bi bi-facebook"></i></a>
      </li>
      <li class="mx-3 my-1">
        <a class="link-light" href="#"><i class="bi bi-instagram"></i></a>
      </li>
      <li class="my-1">
        <a class="link-light" href="#"><i class="bi bi-twitter"></i></a>
      </li>
    </ul>
  </div>
  <FrontNavbar></FrontNavbar>
  <!-- <main> -->
    <router-view />
  <!-- </main> -->
  <footer class="bg-dark text-light">
    <div class="container py-5">
      <ul class="list-unstyled text-center">
        <li class="mb-3">
          <router-link class="nav-link logo navbar-brand" to="/">
            <h3>加熱煮藝</h3>
          </router-link>
        </li>
        <li class="mb-3">
          <router-link class="nav-link link-light hvr-icon-spin" to="/login"
            >後台管理<i class="fa fa-cog hvr-icon ms-1"></i>
          </router-link>
        </li>
        <li class="mb-1"><small>Wenfish © 2022 All Rights Reserved.</small></li>
        <li>本網站僅供個人作品使用，不提供商業用途</li>
      </ul>
    </div>
  </footer>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'

export default {
  components: { FrontNavbar }
}
</script>
