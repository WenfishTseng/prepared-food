<template>
  <div class="modal fade" id="productModal" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增產品</h5>
          <button type="button" class="btn-close" @click="hideModal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- 新增主要圖片 imageUrl-->
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" />
              </div>

              <h5>多圖上傳</h5>
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <template
                  v-for="(img, key) in tempProduct.imagesUrl"
                  :key="key + '123'"
                >
                  <input
                    type="text"
                    class="form-control my-2"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imagesUrl[key]"
                  />
                  <img class="img-fluid mb-2" :src="img" v-if="img" />
                </template>
                <button
                  v-if="
                    !tempProduct.imagesUrl.length ||
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                  "
                  @click="tempProduct.imagesUrl.push('')"
                  class="btn btn-outline-primary btn-sm d-block w-100 mt-2"
                >
                  新增圖片
                </button>
                <button
                  @click="tempProduct.imagesUrl.pop()"
                  class="btn btn-outline-danger btn-sm d-block w-100 my-3"
                >
                  刪除圖片
                </button>
              </div>
            </div>

            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="tempProduct.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  style="height: 100px"
                  v-model="tempProduct.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  style="height: 100px"
                  v-model="tempProduct.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-dark"
            @click="closeProductModal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="editProduct">
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
      tempProduct: { imagesUrl: [] },
      isNew: false
    }
  },
  // props: ['tempProduct', 'isNew'],
  props: {
    product: {
      type: Object
    },
    stateNew: {
      type: Boolean
    }
  },
  watch: {
    product () {
      this.tempProduct = JSON.parse(JSON.stringify(this.product)) // 深拷貝
      this.isNew = this.stateNew
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
    editProduct () {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      let method = 'put'
      if (this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
        method = 'post'
      }
      console.log('editProduct', method, this.tempProduct)
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
    closeProductModal () {
      this.hideModal()
    }
  }
}
</script>
