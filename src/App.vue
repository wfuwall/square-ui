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
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      iconList: ['arrow-left', 'arrow-right', 'view_off', 'message', 'search', 'loading', 'share', 'star', 'like', 'close', 'delete', 'password', 'user', 'notice', 'setting'],
      isLoading: false // 是否开启按钮的 loading 状态呢
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
}
</style>
