<template>
  <div id="app" class="app">
    <h2 class="app-title">✨small-ui✨</h2>
    <h3 class="app-subtitle">😝按钮组件</h3>
    <div class="app-button">
      <s-button type="default">默认按钮</s-button>
      <s-button type="primary">主要按钮</s-button>
      <s-button type="danger">危险按钮</s-button>
      <s-button type="success" disabled>成功按钮</s-button>
      <s-button type="info" disabled>信息按钮</s-button>
      <s-button type="warning" disabled>警告按钮</s-button>
      <s-button type="danger" icon='search'>危险按钮</s-button>
      <s-button type="warning" icon='like' @click="bindClick"></s-button>
      <s-button type="success" icon="share">成功按钮</s-button>
      <s-button type="info" icon="star" icon-position="right">信息按钮</s-button>
      <s-button type="warning" icon="close" @click="bindClick"></s-button>
      <s-button type="primary" :loading="isLoading" icon-position="right" @click="bindSubmit">主要按钮</s-button>
      <s-button-group class="app-button-group">
        <s-button icon="edit" type="default"></s-button>
        <s-button icon="delete" type="default"></s-button>
        <s-button icon="like" type="default"></s-button>
        <s-button icon="message" type="default"></s-button>
        <s-button icon="setting" type="default"></s-button>
      </s-button-group>
    </div>
    <h3 class="app-subtitle">😁图标组件</h3>
    <ul class="app-icon">
      <li class="app-icon-item" v-for="item in iconList" :key="item">
        <s-icon :icon="item"></s-icon>
      </li>
    </ul>
    <h3 class="app-subtitle">😢布局组件</h3>
    <div class="app-row">
      <s-row>
        <s-col :span="24"><div class="grid-content bg-purple-dark"></div></s-col>
      </s-row>
      <s-row>
        <s-col :span="12"><div class="grid-content bg-purple"></div></s-col>
        <s-col :span="12"><div class="grid-content bg-purple-light"></div></s-col>
      </s-row>
      <s-row>
        <s-col :span="4"><div class="grid-content bg-purple"></div></s-col>
        <s-col :span="4"><div class="grid-content bg-purple-light"></div></s-col>
        <s-col :span="4"><div class="grid-content bg-purple"></div></s-col>
        <s-col :span="4"><div class="grid-content bg-purple-light"></div></s-col>
        <s-col :span="4"><div class="grid-content bg-purple"></div></s-col>
        <s-col :span="4"><div class="grid-content bg-purple-light"></div></s-col>
      </s-row>
      <s-row :gutter="20">
        <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
        <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
        <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
        <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
      </s-row>
      <s-row :gutter="20">
        <s-col :span="4"><div class="grid-content bg-purple"></div></s-col>
        <s-col :span="16"><div class="grid-content bg-purple"></div></s-col>
        <s-col :span="4"><div class="grid-content bg-purple"></div></s-col>
      </s-row>
      <s-row :gutter="20">
        <s-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></s-col>
        <s-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></s-col>
      </s-row>
      <s-row justify="center">
        <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
        <s-col :span="6"><div class="grid-content bg-purple-light"></div></s-col>
        <s-col :span="6"><div class="grid-content bg-purple"></div></s-col>
      </s-row>
      <s-row :gutter="10">
        <s-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></s-col>
        <s-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></s-col>
        <s-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></s-col>
        <s-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></s-col>
      </s-row>
    </div>
    <h3 class="app-subtitle">😞容器组件</h3>
    <div class="app-container">
      <s-container>
        <s-header>Header</s-header>
        <s-main>Main</s-main>
        <s-footer>Footer</s-footer>
      </s-container>

      <s-container>
        <s-header>Header</s-header>
        <s-container>
          <s-aside width="200px">Aside</s-aside>
          <s-container>
            <s-main>Main</s-main>
            <s-footer>Footer</s-footer>
          </s-container>
        </s-container>
      </s-container>
    </div>
    <h3 class="app-subtitle">😐输入框组件</h3>
    <div class="app-input">
      <s-input v-model="input.text1" type="number" placeholder="请输入手机号"></s-input> {{input.text1}}
      <s-input :disabled="true"></s-input>
      <s-input clearable v-model="input.text2"></s-input> {{input.text2}}
      <s-input show-password v-model="input.text3"></s-input> {{input.text3}}
      <s-input prefix-icon="edit"></s-input>
      <s-input suffix-icon="search"></s-input>
    </div>
    <h3 class="app-subtitle">🙂上传组件</h3>
    <!-- <div class="app-upload">
      <s-upload
        name="avatar"
        action="http://localhost:3000/upload"
        :file-list="fileList"
        :limit="3"
        accept="image/jpg, image/jpeg"
        :multiple="true"
        :on-exceed="handleExceed"
        :on-error="handleError"
        :on-success="handleSuccess"
        :on-progress="handleProgress"
        :on-change="handleChange"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
      >
        <s-button type="primary" icon="">点击上传</s-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </s-upload>
    </div> -->
    <div class="app-upload">
      <s-upload
        name="avatar"
        action="http://localhost:3000/upload"
        :file-list="fileList1"
        :show-file-list="false"
        :limit="3"
        accept="image/jpg, image/jpeg"
        :multiple="true"
        :drag="true"
        :on-exceed="handleExceed"
        :on-error="handleError"
        :on-success="handleSuccess"
        :on-progress="handleProgress"
        :on-change="handleChange"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
      >
      <img :src="fileList1[0].url" class="avatar" v-if="fileList1.length">
      <div class="upload-avatar" v-else>
        <s-icon icon='plus'></s-icon>
      </div>
      </s-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      iconList: ['arrow-left', 'arrow-right', 'view_off', 'message', 'search', 'loading', 'share', 'star', 'like', 'close', 'delete', 'password', 'user', 'notice', 'setting'],
      isLoading: false, // 是否开启按钮的 loading 状态呢
      input: {
        text1: '',
        text2: '',
        text3: ''
      },
      fileList: [
        { url: 'xxx', name: 'avatar1' },
        { url: 'xxx', name: 'avatar2' }
      ], // 上传的列表
      fileList1: []
    }
  },
  methods: {
    // 按钮点击事件
    bindClick () {
      alert('🚀💗🚀')
    },
    // 带 loading 效果的按钮事件
    bindSubmit () {
      if (this.isLoading) return
      this.isLoading = true
      this.count = 0
      this.timer = setInterval(() => {
        this.count++
        console.log('🚀')
        if (this.count === 5) {
          clearInterval(this.timer)
          this.isLoading = false
        }
      }, 1000)
    },
    // 处理上传超出个数限制
    handleExceed () {

    },
    // 处理上传失败
    handleError () {

    },
    // 处理上传成功
    handleSuccess (res) {
      // console.log(res, 'handleSuccess')
      // this.fileList1 = JSON.parse(res) // 这里获得的结果不能重新赋值给 fileList1
    },
    // 上传过程中
    handleProgress (event, file) {
      // console.log(event, file, 'handleProgress')
    },
    // 上传文件改变时
    handleChange (file) {
      // console.log(file, '改变的文件')
    },
    // 上传之前
    beforeUpload (file) {
      // console.log(file, '上传之前')
      if (file.size / 1024 > 500) {
        console.log('文件最大不能超过500kb')
        return false
      }
      if (!['jpg', 'jpeg'].includes(file.name.split('.')[1])) {
        console.log('上传的图片必须是jpg或者jpeg格式的')
        return false
      }
      return true
    },
    // 删除操作
    handleRemove (file, fileList) {
      return confirm(`确定删除${file.name}?`)
    }
  }
}
</script>

<style lang="scss">
.app{
  display: flex;
  flex-direction: column;
  padding-bottom: 180px;
  width: 100%;
  min-height: 100vh;
  background: #fff;
  overflow: hidden;
  &-title{
    margin: 20px 0;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }
  &-subtitle{
    height: 45px;
    line-height: 45px;
    padding: 0 20px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    background: #f5f5f5;
    box-sizing: border-box;
  }
  &-button{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 20px;
    box-sizing: border-box;
    .s-button{
      margin-right: 10px;
      margin-bottom: 10px;
    }
    &-group{
      .s-button{
        margin-right: 0;
        margin-bottom: 0;
      }
    }
  }
  &-icon{
    display: flex;
    flex-wrap: wrap;
    &-item{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
      height: 10vh;
      border: 1px solid #f1f1f1;
      box-sizing: border-box;
      background: #ccc;
      color: #fff;
      cursor: pointer;
      &:hover{
        color: #409eff;
      }
    }
  }
  &-row{
    .s-row{
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .grid-content{
      height: 45px;
      border-radius: 4px;
    }
    .bg-purple-dark{
      background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
  }
  &-container{
    & > .s-container {
      margin-bottom: 40px;
    }
    .s-header, .s-footer {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
    .s-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }
    .s-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }
  }
  &-input{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    & > .s-input{
      margin-top: 20px;
    }
  }
  &-upload{
    padding-left: 20px;
    margin: 20px 0;
    width: 360px;
    border-bottom: 1px solid #f1f1f1;
    .s-upload-list{
      margin-top: 14px;
    }
    .upload-avatar{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 178px;
      height: 178px;
      border: 1px dashed #d9d9d9;
      cursor: pointer;
    }
    .avatar{
      width: 178px;
      height: 178px;
    }
    .icon-plus{
      font-size: 28px;
      color: #8c939d;
    }
  }
}
</style>
