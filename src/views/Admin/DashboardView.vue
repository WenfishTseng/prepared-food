<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
    <div class="container">
      <router-link class="navbar-brand logo" to="/admin/products" href="#">加熱煮藝</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products"
              >產品管理列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/order"
              >訂單列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupon">優惠券列表</router-link>
          </li>
          <!-- <li class="nav-item">
            <a
              type="button"
              class="nav-link"
              data-bs-toggle="modal"
              data-bs-target="#checkModal"
            >
              登出
            </a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
  <CheckModal @logout="logoutDashboard"></CheckModal>
  <RouterView v-if="checkLogin" />

</template>

<script>
import CheckModal from '@/components/CheckModal.vue'

export default {
  data () {
    return {
      checkLogin: false
    }
  },
  components: { CheckModal },
  mounted () {
    this.checkAdmin()
  },
  methods: {
    checkAdmin () {
      // 取得token
      const token = document.cookie.replace(
        // eslint-disable-next-line no-useless-escape
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        // post 傳 headers
        this.$http.defaults.headers.common.Authorization = token
        // 串api
        this.$http
          .post(`${process.env.VUE_APP_API}/api/user/check`)
          .then(() => {
            this.checkLogin = true
            this.$router.push('/admin/products')
          })
          .catch((error) => {
            this.$router.push('/login')
            alert(error.response.data.message)
          })
      }
    },
    logoutDashboard () {
      console.log(`${process.env.VUE_APP_API}/logout`)
      this.$http
        .post(`${process.env.VUE_APP_API}/logout`)
        .then((response) => {
          console.log(response)
          this.$toast.open({
            message: '登出成功!',
            type: 'success'
            // all of other options may go here
          })
          this.$router.push('/login')
        })
        .catch((error) => {
          console.dir(error)
        })
    }
  }
}
</script>
