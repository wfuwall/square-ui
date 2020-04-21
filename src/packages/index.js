// 所有组件的入口
import Vue from 'vue'
import Button from './Button'
import Icon from './Icon'
import ButtonGroup from './ButtonGroup'

const install = (Vue) => {
  Vue.component(Button.name, Button)
  Vue.component(Icon.name, Icon)
  Vue.component(ButtonGroup.name, ButtonGroup)
}

// 有可能组件会通过 script 标签的形式引入，是不会默认调用 install 方法的
// 如果是 script 标签的方式引入，会先引入 vue ，这时候会把 vue 挂载到 window 上
if (typeof window === 'object' && typeof window.vue !== 'undefined') {
  install(Vue)
}
export default {
  install
}
