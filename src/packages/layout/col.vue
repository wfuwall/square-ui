<template>
  <div class="s-col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 's-col',
  props: {
    // 栅格占据的列数
    span: {
      type: Number,
      default: 24
    },
    // 栅格左侧的间隔格数
    offset: {
      type: Number,
      default: 0
    },
    // <768px
    xs: [Number, Object],
    // ≥768px
    sm: [Number, Object],
    // ≥992px
    md: [Number, Object],
    // ≥1200px
    lg: [Number, Object],
    // ≥1920px
    xl: [Number, Object]
  },
  data () {
    return {
      gutter: 0 // 栅格间隔
    }
  },
  computed: {
    // 类名的数组
    colClass () {
      const classes = []
      classes.push(`s-col-${this.span}`)
      this.offset && classes.push(`s-col-offset-${this.offset}`);
      ['xs', 'sm', 'md', 'lg', 'xl'].forEach(type => {
        if (typeof this[type] === 'object') {
          const { span, offset } = this[type]
          span && classes.push(`s-col-${type}-${span}`)
          offset && classes.push(`s-col-offset-${type}-${offset}`)
        } else {
          this[type] && classes.push(`s-col-${type}-${this[type]}`)
        }
      })
      return classes
    },
    // 样式集合
    colStyle () {
      let styles = {}
      styles = {
        ...styles,
        paddingLeft: `${this.gutter / 2}px`,
        paddingRight: `${this.gutter / 2}px`
      }
      return styles
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/_var.scss';
.s-col{
  overflow: hidden;
}
@for $i from 1 through 24 {
  .s-col-#{$i} {
    width: $i/24 * 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .s-col-offset-#{$i} {
    margin-left: $i/24 * 100%;
  }
}

@include res(xs) {
  @for $i from 1 through 24 {
    .s-col-xs-#{$i} {
      width: $i/24 * 100%;
    }
    .s-col-xs-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}

@include res(sm) {
  @for $i from 1 through 24 {
    .s-col-sm-#{$i} {
      width: $i/24 * 100%;
    }
    .s-col-sm-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}

@include res(md) {
  @for $i from 1 through 24 {
    .s-col-md-#{$i} {
      width: $i/24 * 100%;
    }
    .s-col-md-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}

@include res(lg) {
  @for $i from 1 through 24 {
    .s-col-lg-#{$i} {
      width: $i/24 * 100%;
    }
    .s-col-lg-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}

@include res(xl) {
  @for $i from 1 through 24 {
    .s-col-xl-#{$i} {
      width: $i/24 * 100%;
    }
    .s-col-xl-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
</style>
