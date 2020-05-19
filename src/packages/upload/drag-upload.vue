<template>
  <div class="s-drag-upload" @drop.prevent="handleDrop" @dragover.prevent @dragleave.prevent>
    <s-icon icon="upload"></s-icon>
    <p class="s-drag-upload-txt">将文件拖到此处，或<span>点击上传</span></p>
  </div>
</template>
<script>
export default {
  name: 's-drag-upload',
  props: {
    // 接受上传的文件类型
    accept: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 处理拖动
    handleDrop (event) {
      const files = event.dataTransfer.files
      if (this.accept) {
        // 这里可以对不属于accept里的文件类型进行过滤
        const acceptArr = this.accept.split(',').map(item => item.trim())
        const flag = [...files].every(file => acceptArr.includes(file.type))
        if (flag) {
          this.$emit('file', files)
        } else {
          // eslint-disable-next-line
          console.error(`拖拽上传的文件类型必须是${this.accept}中的其中一种`)
        }
        return
      }
      this.$emit('file', files)
    }
  }
}
</script>
<style lang="scss" scoped>
.s-drag-upload{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .icon-upload{
    font-size: 40px;
    color: #c0c4cc;
  }
  &-txt{
    margin-top: 20px;
    color: #606266;
    font-size: 14px;
    & > span{
      color: #66b1ff;
    }
  }
}
</style>
