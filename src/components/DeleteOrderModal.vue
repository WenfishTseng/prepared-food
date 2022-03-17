<template>
  <div class="modal fade" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            @click="hideModal"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger"></strong> 訂單(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="hideModal"
          >
            取消
          </button>
          <button type="button" @click="deleteProduct" class="btn btn-danger">
            確認刪除
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
      tempProduct: { product: {}, user: {} }
    }
  },
  props: {
    product: { type: Object }
  },
  watch: {
    product () {
      this.tempProduct = JSON.parse(JSON.stringify(this.product)) // 深拷貝
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
    deleteProduct () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempProduct.id}`
      this.$http
        .delete(url)
        .then((response) => {
          this.$emit('get-data')
          this.hideModal()
          alert(response.data.message)
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
  }
}
</script>
