<template>
  <aside class="s-aside" :style="{width}">
    <slot></slot>
  </aside>
</template>
<script>
export default {
  name: 's-aside',
  props: {
    // aside 的宽度
    width: {
      type: String,
      default: '300px'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
