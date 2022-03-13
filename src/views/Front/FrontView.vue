<template>
  <!-- sticky-top -->
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="logo navbar-brand" href="#">加熱煮藝</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#myNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end w-100">
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品列表</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <main>
    <router-view />
  </main>
</template>
