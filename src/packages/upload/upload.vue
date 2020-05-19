<template>
  <div class="s-upload">
    <drag-upload v-if="drag" @click.native="handleClick" :accept="accept" @file="uploadFiles"></drag-upload>
    <div @click="handleClick" class="s-upload-text" v-else>
      <slot></slot>
    </div>
    <input
      type="file"
      class="s-upload-input"
      ref="input"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange"
    >
    <div class="s-upload-tip">
      <slot name="tip"></slot>
    </div>
    <ul class="s-upload-list">
      <li class="s-upload-list-item" v-for="item in files" :key="item.uid">
        <img :src="item.url" alt="" class="s-upload-list-item-image">
        <span class="s-upload-list-item-name">{{item.name}}</span>
        <s-progress :percentage="item.percentage" v-if="item.status === 'uploading'"></s-progress>
        <div class="s-upload-list-item-icon">
          <s-icon icon="success" v-if="item.status === 'success'"></s-icon>
          <s-icon icon="close" @click="handleRemove(item)"></s-icon>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import dragUpload from './drag-upload'
import ajax from './ajax'
export default {
  name: 's-upload',
  components: {
    dragUpload
  },
  props: {
    // 原生 name 属性
    name: {
      type: String,
      default: 'file'
    },
    // 必选参数，上传的地址
    action: {
      type: String,
      required: true
    },
    // 请求上传的请求头部
    headers: {
      type: Object,
      default: () => ({})
    },
    // 是否支持多选文件
    multiple: {
      type: Boolean,
      default: false
    },
    // 接受上传的文件类型
    accept: {
      type: String,
      default: ''
    },
    // 最大允许上传个数
    limit: {
      type: Number,
      default: 0
    },
    // 上传的文件列表
    fileList: {
      type: Array,
      default: () => ([])
    },
    // 是否显示已上传的列表
    showFileList: {
      type: Boolean,
      default: true
    },
    // 是否开启拖拽上传
    drag: {
      type: Boolean,
      default: false
    },
    // 文件超出个数限制时的钩子
    onExceed: Function,
    // 文件上传失败时的钩子
    onError: Function,
    // 文件上传成功时的钩子
    onSuccess: Function,
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange: Function,
    // 文件上传时的钩子
    onProgress: Function,
    // 文件移除操作
    onRemove: Function,
    // 上传之前
    beforeUpload: Function,
    httpRequest: {
      type: Function,
      default: ajax
    }
  },
  data () {
    return {
      tempIndex: 1, // 图片列表的id值
      files: [], // 存储要展示的列表
      reqs: {} // 保存正在上传的请求，方便取消操作
    }
  },
  watch: {
    // 处理父元素传过来的 fileList 成自己要的格式
    fileList: {
      handler (fileList) {
        this.files = fileList.map(item => {
          item.uid = Date.now() + this.tempIndex++
          item.status = 'success'
          return item
        })
      },
      immediate: true
    }
  },
  methods: {
    // 处理点击
    handleClick () {
      // 在点击之前，要先还原输入框
      this.$refs.input.value = ''
      this.$refs.input.click()
    },
    // 上传文件改变时
    handleChange (event) {
      // 获取选中的文件
      const files = event.target.files
      // 多个文件上传，就多创建几个 ajax，一起上传就行
      this.uploadFiles(files)
    },
    // 上传文件
    uploadFiles (files) {
      // 限制上传是否达到了最大的限制个数
      if (this.limit && this.fileList.length + files.length > this.limit) {
        return this.onExceed && this.onExceed(files, this.fileList)
      }
      [...files].forEach(rawFile => {
        // 用户的文件，需要做一些处理，可能用户在频繁上传同一个文件
        // 将文件格式化成我想要的结果
        this.handleStart(rawFile) // 上传之前处理
        this.upload(rawFile) // 正式上传
      })
    },
    // 上传之前处理
    handleStart (rawFile) {
      // 给文件生成一个唯一的 id 标识
      rawFile.uid = Math.random() + this.tempIndex++
      const file = {
        status: 'ready', // 上传状态, 默认准备上传
        percentage: 0, // 上传的进度
        uid: rawFile.uid, // 上传文件的唯一标识
        name: rawFile.name, // 上传的文件名
        size: rawFile.size, // 上传的文件大小
        raw: rawFile // 上传的源文件
      }
      // 将当前用户上传的文件 push 到列表中，显示用
      file.url = URL.createObjectURL(rawFile) // 通过源文件创建一个路径 即可
      this.files.push(file)
      this.onChange && this.onChange(file)
    },
    // 正式上传
    upload (rawFile) {
      // 上传之前先判断是否能够上传，没有任何限制直接上传即可
      if (!this.beforeUpload) {
        return this.postAjax(rawFile)
      }
      // 否则调用用户传入的上传之前的函数，获取返回值,返回 true 则直接上传
      const flag = this.beforeUpload(rawFile)
      if (flag) {
        return this.postAjax(rawFile)
      }
    },
    // 调用 ajax 上传文件
    postAjax (rawFile) {
      const uid = rawFile.uid // 保存上传的 uid，中断 ajax 请求的时候会用到
      const options = {
        file: rawFile,
        filename: this.name,
        action: this.action,
        onProgress: (event) => {
          this.handleProgress(event, rawFile)
        },
        onSuccess: (res) => {
          this.handleSuccess(res, rawFile)
        },
        onError: (err) => {
          this.handleError(err, rawFile)
        }
      }
      // req 就是当前的请求， 将每个 ajax 请求保存起来
      const req = this.httpRequest(options)
      this.reqs[uid] = req
      // 说明是用户传入的 httpRequest 是 promise
      if (req && req.then) {
        req.then(options.onSuccess, options.onError)
      }
    },
    // 通过 uid 获取 files 中正在上传的格式化后的文件
    getFile (rawFile) {
      return this.files.find(file => file.uid === rawFile.uid)
    },
    // 上传中
    handleProgress (event, rawFile) {
      const file = this.getFile(rawFile)
      file.status = 'uploading'
      file.percentage = event.percent || 0
      this.onProgress && this.onProgress(event, rawFile)
    },
    // 上传成功
    handleSuccess (res, rawFile) {
      const file = this.getFile(rawFile)
      file.status = 'success'
      this.onSuccess && this.onSuccess(res, rawFile)
      this.onChange(file)
    },
    // 上传失败
    handleError (res, rawFile) {
      const file = this.getFile(rawFile)
      file.status = 'fail'
      this.onError && this.onError(res, rawFile)
      this.onChange(file)
      // 已经失败的 ajax，不需要后续请求的中断操作
      delete this.reqs[file.uid]
    },
    // 移除已经上传的文件
    handleRemove (file) {
      if (!this.onRemove) {
        this.files = this.files.filter(item => item.uid !== file.uid)
        return
      }
      const flag = this.onRemove(file, this.files)
      flag && (this.files = this.files.filter(item => item.uid !== file.uid))
    }
  }
}
</script>
<style lang="scss" scoped>
.s-upload{
  display: inline;
  &-tip{
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
  }
  &-input{
    display: none;
  }
  &-list{
    display: flex;
    flex-direction: column;
    &-item{
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      cursor: pointer;
      color: #606266;
      transition: all 0.1s;
      &-name{
        height: 30px;
        line-height: 30px;
        margin-right: 40px;
        overflow: hidden;
        padding-left: 4px;
      }
      &-image{
        width: 100px;
        height: auto;
      }
      &:hover {
        .icon-success {
         display: none;
        }
        .icon-close{
          display: block;
        }
        background: #f5f7fa;
        color: #66b1ff;
      }
      &-icon{
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        .icon-success{
          color: #67c23a;
          font-size: 16px;
        }
        .icon-close{
          display: none;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
