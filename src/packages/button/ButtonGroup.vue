<template>
  <div class="s-button-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 's-button-group'
}
</script>
<style lang="scss" scoped>
.s-button-group{
  display: flex;
  align-items: center;
  .s-button{
    border-radius: 0;
    // 处理有边框中间多看起来多余的问题
    &:not(first-child) {
      margin-left: -1px;
    }
    &:hover,&:focus,&:active{
      z-index: 1;
    }
  }
  .s-button:first-child{
    border-radius: 4px 0 0 4px;
  }
  .s-button:last-child{
    border-radius: 0 4px 4px 0;
  }
}
</style>
