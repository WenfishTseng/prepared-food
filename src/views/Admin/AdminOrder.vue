<template>
  <div class="container">
    <div class="row justify-content-lg-center">
      <div class="col-lg-12">
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">購買時間</th>
              <th width="120">購買人 / Email</th>
              <th width="120">訂單編號</th>
              <th>訂單明細</th>
              <th width="100">訂單金額</th>
              <th width="100">總金額</th>
              <th width="100">是否付款</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in orders" :key="product.id">
              <td>{{ $filters.date(product.create_at) }}</td>
              <td>
                {{ product.user.name }}
                <div>{{ product.user.email }}</div>
              </td>
              <td>{{ product.id }}</td>
              <td>
                <ul
                  class="list-unstyled"
                  v-for="item in product.products"
                  :key="item.id"
                >
                  <li>{{ item.product.title }}</li>
                </ul>
              </td>
              <td>
                <ul
                  class="list-unstyled"
                  v-for="item in product.products"
                  :key="item.id"
                >
                  <li>{{ item.total }}</li>
                </ul>
              </td>
              <td>{{ product.total }}</td>
              <td>
                <a class="text-decoration-none" href="#" @click.prevent="switchPaid(product.id)">
                <span class="text-success" v-if="product.is_paid"><i class="bi bi-check-circle-fill me-1"></i>已付款</span>
                <span class="text-danger" v-else><i class="bi bi-x-circle-fill me-1"></i>未付款</span></a>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm me-2"
                    @click="openEditModal('edit', product)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openEditModal('delete', product)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <PaginationView
          :pages="pagination"
          @get-product="getData"
        ></PaginationView>
      </div>
    </div>
  </div>
  <CheckModal></CheckModal>
  <OrderModal
    ref="orderModal"
    @get-data="getData"
    :product="tempProduct"
  ></OrderModal>
  <DeleteOrderModal
  ref="deleteModal"
  @get-data="getData"
  :product="tempProduct"
></DeleteOrderModal>

</template>

<script>
import CheckModal from '@/components/CheckModal.vue'
import PaginationView from '@/components/PaginationView.vue'
import OrderModal from '@/components/OrderModal.vue'
import DeleteOrderModal from '@/components/DeleteOrderModal.vue'

export default {
  data () {
    return {
      orders: [],
      tempProduct: {},
      // page
      pagination: {}
    }
  },
  components: { CheckModal, PaginationView, OrderModal, DeleteOrderModal },
  mounted () {
    this.getData()
  },
  methods: {
    getData (page = 1) {
      // 預設第1頁
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`
        )
        .then((response) => {
          if (response.data.success) {
            this.orders = response.data.orders
            this.pagination = response.data.pagination
          }
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    },
    openEditModal (state, item) {
      switch (state) {
        case 'edit':
          this.tempProduct = JSON.parse(JSON.stringify(item))
          this.$refs.orderModal.openModal()
          break

        case 'add':
          this.tempProduct = {}
          this.$refs.orderModal.openModal()
          break

        case 'delete':
          this.tempProduct = JSON.parse(JSON.stringify(item))
          this.$refs.deleteModal.openModal()
          break
      }
    },
    switchPaid (id) {
      this.tempProduct.is_paid = !this.tempProduct.is_paid
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`
      console.log(url)
      const method = 'put'
      this.$http[method](url, { data: this.tempProduct })
        .then((response) => {
          alert(response.data.message)
          this.getData()
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
  }
}
</script>
