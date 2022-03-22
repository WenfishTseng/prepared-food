<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-12">
        <p class="my-5 h5">三秒後重新回到產品列表喔~</p>
        <img src="./../../assets/images/not-found.svg" alt="404" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    setTimeout(() => {
      this.$router.push('/products')
    }, 3000)
  }
}
</script>
