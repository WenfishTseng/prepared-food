<template>
  <div class="modal fade" id="productModal" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">編輯訂單</h5>
          <button type="button" class="btn-close" @click="hideModal"></button>
        </div>
        <div class="modal-body">
          <!-- 總訂單資訊 -->
          <div class="row">
            <div class="col-lg-12">
              <div class="mb-3">
                <label for="orderId" class="form-label">產品編號</label>
                <input
                  id="orderId"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品編號"
                  :disabled="`${tempProduct.id}`"
                  v-model="tempProduct.id"
                />
              </div>
            </div>
          </div>
          <!-- 訂單內單項資訊 -->
          <div
            class="row bg-light py-3"
            v-for="(order, i, index) in tempProduct.products"
            :key="order.id"
          >
            <div class="col-12 mb-1">
              <h5>第 {{ index + 1 }} 筆訂單資訊</h5>
            </div>

            <div class="mb-3 col-lg-4">
              <label for="product-title" class="form-label">產品名稱</label>
              <input
                id="product-title"
                type="text"
                class="form-control"
                placeholder="請輸入產品名稱"
                v-model="order.product.title"
              />
            </div>

            <div class="mb-3 col-lg-4">
              <label for="final_total" class="form-label">產品售價</label>
              <input
                id="final_total"
                type="number"
                class="form-control"
                placeholder="請輸入產品售價"
                v-model="order.final_total"
              />
            </div>

            <div class="mb-3 col-lg-4">
              <label for="product-qty" class="form-label">產品數量</label>
              <input
                id="product-qty"
                type="number"
                min="0"
                class="form-control"
                placeholder="請輸入產品數量"
                v-model.number="order.qty"
              />
            </div>
            <!-- </div> -->
          </div>

          <!-- 總訂單資訊 -->
          <div class="row mt-3">
            <div class="col-lg-4">
              <div class="mb-3">
                <label for="orderTotal" class="form-label">訂單總金額</label>
                <input
                  id="orderTotal"
                  type="number"
                  class="form-control"
                  placeholder="請輸入訂單金額"
                  v-model="tempProduct.total"
                />
              </div>
            </div>
            <div class="col-lg-4">
              <div class="mb-3">
                <label for="orderTel" class="form-label">訂購人電話</label>
                <input
                  id="orderTel"
                  type="tel"
                  class="form-control"
                  placeholder="請輸入訂購人電話"
                  v-model="tempProduct.user.tel"
                />
              </div>
            </div>
            <div class="col-lg-4">
              <div class="mb-3">
                <label for="orderMail" class="form-label">訂購人郵件</label>
                <input
                  id="orderMail"
                  type="email"
                  class="form-control"
                  placeholder="請輸入訂購人郵件"
                  v-model="tempProduct.user.email"
                />
              </div>
            </div>
            <div class="col-lg-12">
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_paid"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempProduct.is_paid"
                  />
                  <label class="form-check-label" for="is_paid">是否付款</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="closeModal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="editModal">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  data () {
    return {
      modal: '',
      tempProduct: {
        product: {},
        user: {}
      }
    }
  },
  // props: ['tempProduct', 'isNew'],
  props: {
    product: {
      type: Object
    }
  },
  watch: {
    product () {
      this.tempProduct = JSON.parse(JSON.stringify(this.product)) // 深拷貝
      this.isNew = this.stateNew
      console.log('watch--tempProduct', this.tempProduct)
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    })
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    },
    editModal () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempProduct.id}`
      const method = 'put'
      this.$http[method](url, { data: this.tempProduct })
        .then((response) => {
          this.$emit('get-data')
          this.hideModal()
          alert(response.data.message)
        })
        .catch((error) => {
          alert(error.response.data.message)
          this.hideModal()
        })
    },
    closeModal () {
      this.hideModal()
    }
  }
}
</script>
