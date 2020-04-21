<template>
  <svg class="s-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>
<script>
import '../style/icon'
export default {
  name: 's-icon',
  props: {
    // icon 的名字
    icon: {
      type: String,
      default: '',
      required: true
    }
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
