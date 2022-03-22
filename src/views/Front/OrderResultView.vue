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
    <div class="row row-cols-1 row-cols-lg-4 g-3 align-items-center">
      <div
        class="col d-none d-lg-block bg-dark text-light border border-2 border-white"
      >
        <p class="mb-0 px-3 py-4 h5">購物車結帳流程</p>
      </div>
      <div class="col d-none d-lg-block bg-light border border-2 border-white">
        <p class="mb-0 px-3 py-4 h5">1. 放入購物車</p>
      </div>
      <div class="col d-none d-lg-block bg-light border border-2 border-white">
        <p class="mb-0 px-3 py-4 h5">2. 資料確認</p>
      </div>
      <div class="col bg-dark text-light border border-2 border-white">
        <p class="mb-0 px-3 py-4 h5">3. 完成購物</p>
      </div>
    </div>

    <div class="row justify-content-around align-items-center my-5">
      <div class="col-md-6 text-center">
        <p class="h3">謝謝您的訂購~~</p>
        <p>待我們確認訂單後，即刻會為您出貨</p>
      </div>
      <div class="col-md-6">
        <img class="img-fluid" src="./../../assets/images/order-confirmed.svg" alt="">
      </div>
    </div>

  </div>
</template>

<script>

export default {
  mounted () {
    setTimeout(() => {
      this.$router.push('/products')
    }, 6000)
  }
}
</script>
