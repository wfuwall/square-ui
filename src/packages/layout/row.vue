<template>
  <div class="s-row" :style="rowStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 's-row',
  props: {
    // 栅格间隔
    gutter: {
      type: Number,
      default: 0
    },
    // flex 布局下的水平排列方式
    justify: {
      type: String,
      default: 'start',
      validator (type) {
        const typeArr = ['start', 'end', 'center', 'space-around', 'space-between']
        if (type && !typeArr.includes(type)) {
          // eslint-disable-next-line
          console.error(`类型必须是${typeArr.join('、')}中的一种`)
        }
        return true
      }
    }
  },
  computed: {
    rowStyle () {
      let styles = {}
      styles = {
        ...styles,
        marginLeft: `-${this.gutter / 2}px`,
        marginRight: `-${this.gutter / 2}px`
      }
      if (this.justify) {
        const key = ['start', 'key'].includes(this.justify) ? `flex-${this.justify}` : this.justify
        styles = {
          ...styles,
          justifyContent: key
        }
      }
      return styles
    }
  },
  mounted () {
    this.$children.forEach(col => {
      col.gutter = this.gutter
    })
  }
}
</script>
<style lang="scss" scoped>
.s-row{
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
}
</style>
