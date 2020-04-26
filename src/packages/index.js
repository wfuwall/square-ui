// 所有组件的入口
import Vue from 'vue'
import Button from './button/Button'
import Icon from './Icon'
import ButtonGroup from './button/ButtonGroup'
import Row from './layout/row'
import Col from './layout/col'

import Container from './container/Container'
import Main from './container/Main'
import Aside from './container/Aside'
import Header from './container/Header'
import Footer from './container/Footer'

const install = (Vue) => {
  Vue.component(Button.name, Button)
  Vue.component(Icon.name, Icon)
  Vue.component(ButtonGroup.name, ButtonGroup)
  Vue.component(Row.name, Row)
  Vue.component(Col.name, Col)

  Vue.component(Container.name, Container)
  Vue.component(Main.name, Main)
  Vue.component(Aside.name, Aside)
  Vue.component(Header.name, Header)
  Vue.component(Footer.name, Footer)
}

// 有可能组件会通过 script 标签的形式引入，是不会默认调用 install 方法的
// 如果是 script 标签的方式引入，会先引入 vue ，这时候会把 vue 挂载到 window 上
if (typeof window === 'object' && typeof window.vue !== 'undefined') {
  install(Vue)
}
export default {
  install
}
