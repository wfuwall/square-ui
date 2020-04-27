<template>
  <i :class="['iconfont', 's-icon', iconClass]" @click="$emit('click')"></i>
</template>
<script>
import '../style/icon.css'
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
  computed: {
    iconClass () {
      return `icon-${this.icon}`
    }
  }
}
</script>
<style lang="scss" scoped>
.s-icon{
  font-size: 20px;
  vertical-align: middle;
}
</style>
