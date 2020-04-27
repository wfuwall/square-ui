<template>
  <div class="s-input" :class="classes">
    <s-icon :icon="prefixIcon" v-if="prefixIcon"></s-icon>
    <input
      class="s-input__inner"
      :name="name"
      :placeholder="placeholder"
      :type="showPassword ? (isPasswordType ? 'password': 'text') : type"
      :disabled="disabled"
      :value="value"
      @input="$emit('input', $event.target.value)"
      ref="input"
    >
    <s-icon :icon="suffixIcon" v-if="suffixIcon"></s-icon>
    <s-icon icon="close" v-if="clearable && value" @click="$emit('input', '')" @mousedown.native.prevent></s-icon>
    <s-icon :icon="isPasswordType ? 'view_off' : 'view'" v-if="showPassword && value" @click="bindViewIcon"></s-icon>
  </div>
</template>
<script>
export default {
  name: 's-input',
  props: {
    // 原生 name 属性
    name: {
      type: String,
      default: ''
    },
    // 输入框的值
    value: {
      type: String,
      default: ''
    },
    // 输入框描述
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    // 输入框类型
    type: {
      type: String,
      default: 'text'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否显示密码输入框
    showPassword: {
      type: Boolean,
      default: false
    },
    // 输入框头部图标
    prefixIcon: {
      type: String,
      default: ''
    },
    // 输入框尾部图标
    suffixIcon: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 是否是密码输入框
      isPasswordType: false
    }
  },
  computed: {
    classes () {
      const classes = []
      if (this.clearable || this.showPassword || this.suffixIcon) {
        classes.push('s-input-suffix')
      }
      if (this.prefixIcon) {
        classes.push('s-input-prefix')
      }
      return classes
    }
  },
  methods: {
    // 点击查看图标
    bindViewIcon () {
      this.isPasswordType = !this.isPasswordType
      // 点击后让输入框再次获取焦点
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.s-input{
  display: inline-flex;
  position: relative;
  font-size: 14px;
  &__inner{
    border: 1px solid #dcdfe6;
    padding: 0 15px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-radius: 4px;
    box-sizing: border-box;
    background: #fff;
    color: #606266;
    font-size: inherit;
    outline: none;
    cursor: pointer;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    // 隐藏 PC 端 type=number 时的上下箭头
    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button{
      -webkit-appearance: none;
    }
    &[type="number"] {
      -moz-appearance: textfield;
    }
    &:hover{
      border-color: #c0c4cc;
    }
    &:focus{
      outline: none;
      border-color: #409eff;
    }
    &::-webkit-input-placeholder {
      font-size: 14px;
      color: #999;
    }
    &[disabled]{
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
  &.s-input-suffix{
    .s-input__inner{
      padding-right: 34px;
    }
    .s-icon{
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      color: #666;
      font-size: 18px;
    }
    .icon-close, .icon-view, .icon-view_off{
      cursor: pointer;
    }
  }
  &.s-input-prefix{
    .s-input__inner{
      padding-left: 34px;
    }
    .s-icon{
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      color: #666;
      font-size: 18px;
    }
  }
}
</style>
