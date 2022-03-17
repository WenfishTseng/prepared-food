<template>
  <!-- sticky-top -->
  <div class="bg-primary text-light">
    <ul class="list-unstyled d-flex justify-content-center align-content-center mb-0">
      <li class="my-1"><a class="link-light" href="#"><i class="bi bi-facebook"></i></a></li>
      <li class="mx-3 my-1"><a class="link-light" href="#"><i class="bi bi-instagram"></i></a></li>
      <li class="my-1"><a class="link-light" href="#"><i class="bi bi-twitter"></i></a></li>
    </ul>
  </div>

  <FrontNavbar></FrontNavbar>

  <main>
    <router-view />
  </main>

  <footer class="container-fluid bg-dark text-light">
    <div class="container">
      <div class="row align-items-center" style="height:300px">
        <div class="col-6 my-5">
          <a class="logo navbar-brand" href="#">加熱煮藝</a>
        </div>
        <div class="col-6 text-end">
          <router-link class="nav-link" to="/login"
            >管理 <i class="bi bi-wrench-adjustable-circle-fill"></i>
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'

export default {
  components: { FrontNavbar }
}
</script>
