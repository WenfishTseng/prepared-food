<template>
<div class="modal fade" id="checkModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">貼心提示</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>為什麼要登出？確定要登出嗎？</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">再想一下</button>
        <button type="button" class="btn btn-primary" @click="logout" data-bs-dismiss="modal">對，我就是要登出</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CheckModal',
  methods: {
    logout () {
      this.$emit('logout')
    }
  }
}
</script>
