import Collapse from 'bootstrap/js/dist/collapse'

export default {
  methods: {
    closeMenu () {
      this.collapse.hide()
    },
    toggleMenu () {
      this.collapse.toggle()
    }
  },
  mounted () {
    this.collapse = new Collapse(this.$refs.collapse, {
      toggle: false
    })
  }
}
