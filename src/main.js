import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import fastClick from "fastclick"
import lazyLoad from "vue-lazyload";
import toast from 'components/common/toast'

Vue.config.producationTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)

//解决移动端点击延迟问题
fastClick.attach(document.body)
//图片懒加载
Vue.use(lazyLoad)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
