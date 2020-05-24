import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from './components/common/toast'

Vue.use(toast)

Vue.config.productionTip = false

//往原型中添加一个Vue实例变量，用于自定义监听事件 $emit()发送事件  $on()监听(接收)事件
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
