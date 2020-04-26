<template>
  <div :class="['s-container', { 'vertical' : isVertical}]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 's-container',
  data () {
    return {
      // 默认水平排列，当检测到子元素有 s-header 或 s-footer 时为 vertical
      isVertical: false
    }
  },
  mounted () {
    this.isVertical = this.$children.some(child => ['s-header', 's-footer'].includes(child.$options.name))
  }
}
</script>
<style lang="scss" scoped>
.s-container{
  display: flex;
  flex-direction: row;
  width: 100%;
  &.vertical{
    flex-direction: column;
  }
}
</style>
