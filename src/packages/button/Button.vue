<template>
  <button class="s-button" :class="btnClass" @click="$emit('click', $event)">
    <s-icon :icon="icon" v-if="icon && !loading" class="icon"></s-icon>
    <s-icon icon="loading" v-else-if="loading" class="icon"></s-icon>
    <!-- 这里加个判断是为了不传值的时候不显示 span 标签 -->
    <span v-if="this.$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: 's-button',
  props: {
    // 按钮的类型
    type: {
      type: String,
      default: 'default',
      validator (type) {
        const types = ['warning', 'success', 'danger', 'info', 'primary', 'default']
        if (type && !types.includes(type)) {
          // eslint-disable-next-line
          console.error(`type类型必须是${types.join('、')}其中一种`)
        }
        return true
      }
    },
    // 图标类名
    icon: {
      type: String,
      default: ''
    },
    // 是否禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 图标的位置
    iconPosition: {
      type: String,
      default: 'left',
      validator (type) {
        if (!['left', 'right'].includes(type)) {
          // eslint-disable-next-line
          console.error('iconPosition属性必须是 left 或 right')
        }
        return true
      }
    },
    // 是否是 loading 图标
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass () {
      const className = []
      if (this.type) {
        className.push(`s-button-${this.type}`)
      }
      if (this.disabled) {
        className.push('is-disabled')
      }
      if (this.iconPosition) {
        className.push(`s-button-${this.iconPosition}`)
      }
      if (this.loading) {
        className.push('is-disabled is-loading')
      }
      return className
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/_var.scss';
.s-button{
  position: relative;
  display: inline-flex;
  align-items: center;
  border: 1px solid $btn-border-color;
  padding: $btn-padding;
  line-height: 1;
  font-size: $font-size;
  color: $color;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  transition: .1s;
  background: $default;
  border-radius: $border-radius;
  user-select: none;
  &.is-disabled{
    cursor: not-allowed;
    color: $default-disabled-color;
    border-color: $default-disabled-border;
    background-color: #fff;
    &:hover, &:focus, &:active{
      color: $default-disabled-color;
      border-color: $default-disabled-border;
      background-color: #fff;
    }
  }
  &:hover, &:focus{
    color: $default-hover;
    border-color: $default-hover-border;
    background-color: $default-hover-background;
  }
  &:active{
    color: $default-active;
    border-color: $default-active;
    outline: none;
  }
  @each $type, $color in (primary: $primary, success: $success, info: $info, warning: $warning, danger: $danger) {
    &-#{$type} {
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
      fill: #FFFFFF;
    }
  }
  @each $type, $color in (primary: $primary-hover, success: $success-hover, info: $info-hover, warning: $warning-hover, danger: $danger-hover) {
    &-#{$type}:focus, &-#{$type}:hover{
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }
  @each $type, $color in (primary: $primary-active, success: $success-active, info: $info-active, warning: $warning-active, danger: $danger-active) {
    &-#{$type}:active{
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }
  @each $type, $color in (primary: $primary-disabled, success: $success-disabled, info: $info-disabled, warning: $warning-disabled, danger: $danger-disabled) {
    &-#{$type}.is-disabled{
      cursor: not-allowed;
      color: #fff;
      border-color: #{$color};
      background-color: #{$color};
      &:focus, &:active, &:hover{
        color: #fff;
        border-color: #{$color};
        background-color: #{$color};
      }
    }
  }
  .icon{
    width: 16px;
    height: 16px;
  }
  .icon+span{
    margin-left: 4px;
  }
  &-left{
    svg {
      order: 1;
    }
    span {
      order: 2;
    }
  }
  &-right{
    svg {
      order: 2;
    }
    span {
      order: 1;
    }
    .icon+span{
      margin-left: 0;
      margin-right: 4px;
    }
  }
  &.is-loading{
    .icon{
      transform-origin: center;
      animation: spin 1.8s infinite linear;
    }
  }
}
@keyframes spin {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
