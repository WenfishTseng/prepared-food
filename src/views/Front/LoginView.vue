<template>
  <div class="bg-light vh-100">
    <main class="container py-5" id="app">
      <div class="row justify-content-center">
        <div class="col-lg-4">
          <p class="h2 text-center"><i class="bi bi-wrench-adjustable-circle-fill"></i></p>
          <h2 class="h4 text-center mb-3">管理者登入</h2>
          <form class="bg-white p-5">
            <div class="form-floating mb-3">
              <input
                v-model="user.username"
                type="email"
                class="form-control"
                id="emailInput"
                placeholder="travel@example.com"
                required
                autofocus
              />
              <label for="emailInput">Email address</label>
            </div>
            <div class="form-floating">
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                id="passwordInput"
                placeholder="Abcdefg"
                required
              />
              <label for="passwordInput">Password</label>
            </div>
            <button
              @click="login"
              class="btn btn-lg btn-primary w-100 mt-3"
              type="button"
            >
              登入
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((response) => {
          const { token, expired } = response.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          // 跳轉頁面
          this.$router.push('/admin/products')
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
  }
}
</script>
