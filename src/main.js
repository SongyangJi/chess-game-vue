import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局 css
import './assets/theme/container.css'
import './assets/theme/chess.css'
import './assets/theme/scrollbar.css'

// 导入 ElementUI组件
import ElementUI from 'element-ui'
// 样式需要单独导入
import 'element-ui/lib/theme-chalk/index.css'

router.beforeEach((to, from, next) => {
    const path = to.path
    let uid = sessionStorage.getItem('store') == null ? null : JSON.parse(sessionStorage.getItem('store')).user.uid
    let hasUid = uid || store.getters.uid
    if (to.meta.requiredAuth) {
        if (path.match('/home/*') && hasUid) {
            next()
        } else {
            // 在登录成功后自动路由到目标位置
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next();
    }
})


Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
