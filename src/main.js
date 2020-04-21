import Vue from 'vue'
import App from './App.vue'
import smallui from './packages/index'
import './style/index.scss'

Vue.use(smallui)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
