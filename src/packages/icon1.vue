<template>
  <svg class="s-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>
<script>
import '../style/icon.js'
export default {
  name: 's-icon',
  props: {
    // icon 的名字
    icon: {
      type: String,
      default: '',
      required: true
    }
  },
  mounted () {
    // 这样引入打包会多出很多文件
    // import('../style/icon').then(icon => {})
  }
}
</script>
<style lang="scss" scoped>
.s-icon{
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
</style>
