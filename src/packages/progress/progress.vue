<template>
  <div class="s-progress">
    <div class="s-progress-bar" :style="{height: height + 'px'}">
      <div class="s-progress-bar-inner" :style="barStyle"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 's-progress',
  props: {
    // 进度条的高度
    height: {
      type: Number,
      default: 10
    },
    // 上传的百分比
    percentage: {
      type: Number,
      default: 0
    },
    // 进度条颜色
    color: {
      type: String,
      default: '#3a8ee6'
    }
  },
  computed: {
    barStyle () {
      const style = {}
      style.width = this.percentage + '%'
      style.background = this.color
      style.height = this.height + 'px'
      return style
    }
  }
}
</script>
<style lang="scss" scoped>
.s-progress{
  width: 70%;
  &-bar{
    position: relative;
    width: 100%;
    background: #fafafa;
    border-radius: 100px;
    overflow: hidden;
  }
  &-inner{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    transition: width 0.6s linear;
  }
}
</style>
