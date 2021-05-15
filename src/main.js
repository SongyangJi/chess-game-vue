import Vue from 'vue'
import App from './App.vue'


// 导入 ElementUI组件
import ElementUI from 'element-ui'
// 样式需要单独导入
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
