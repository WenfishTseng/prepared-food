<template>
  <div class="container">
    <div class="row justify-content-lg-center">
      <div class="col-lg-12">
        <div class="text-end mt-4">
          <button type="button" class="btn btn-primary" @click="openProductModal('add', '')">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="150">單位</th>
              <th width="120">是否啟用</th>
              <th width="180">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.category }}</td>
              <td>{{ product.title }}</td>
              <td>{{ product.origin_price }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.unit }}</td>
              <td>
                <span class="text-info fw-bold" v-if="product.is_enabled">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-dark btn-sm me-2"
                    @click="openProductModal('edit', product)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    @click="openProductModal('delete', product)"
                    class="btn btn-outline-danger btn-sm"
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
  <!-- Edit Modal -->
  <EditModal
    ref="productModal"
    @get-data="getData"
    :product="tempProduct"
    :state-new="isNew"
  ></EditModal>
  <DeleteModal
    ref="deleteProductModal"
    @get-data="getData"
    :product="tempProduct"
  ></DeleteModal>
</template>

<script>
import PaginationView from '@/components/PaginationView.vue'
import EditModal from '@/components/EditModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'

export default {
  data () {
    return {
      products: [],
      tempProduct: { imagesUrl: [] },
      isNew: false,
      // page
      pagination: {}
    }
  },
  components: { PaginationView, EditModal, DeleteModal },
  mounted () {
    this.getData()
  },
  methods: {
    getData (page = 1) {
      // 預設第1頁
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
        )
        .then((response) => {
          if (response.data.success) {
            this.products = response.data.products
            this.pagination = response.data.pagination
          }
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    },
    openProductModal (state, item) {
      switch (state) {
        case 'edit':
          this.tempProduct = JSON.parse(JSON.stringify(item))
          this.isNew = false
          this.$refs.productModal.openModal()
          console.log('openProductModal', this.tempProduct)
          break

        case 'add':
          this.tempProduct = { imagesUrl: [] }
          this.isNew = true
          this.$refs.productModal.openModal()
          break

        case 'delete':
          this.tempProduct = JSON.parse(JSON.stringify(item))
          this.$refs.deleteProductModal.openModal()
          break
      }
    }
  }
}
</script>
