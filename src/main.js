import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';  // 保留路由
import axios from 'axios';      // 保留 axios

// 使用 Element UI
Vue.use(ElementUI);

// 将 axios 挂载到 Vue 原型
Vue.prototype.$axios = axios;

// 创建 Vue 实例（移除 store）
new Vue({
  router,       // 保留路由
  render: h => h(App),
}).$mount('#app');

