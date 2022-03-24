<template>
  <div class="modal fade" id="productModal" ref="modal">
    <div class="modal-dialog modal-dialog-centered modal" role="document">
      <div class="modal-content">
        <div class="modal-header border-0">
          <button
            type="button"
            class="btn-close"
            @click="hideModal"
          ></button>
        </div>
        <div class="modal-body">
          <img class="position-relative img-fluid" src="./../assets/images/coupon3.svg" />
          <div
            class="h2 mb-0 position-absolute top-40 start-30 translate-middle"
          >
            <p class="h5">優惠序號：</p>
            <p>我要吃雞</p>
          </div>
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
      modal: ''
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false
    })
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  }
}
</script>
