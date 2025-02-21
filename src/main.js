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

Vue.config.productionTip = false;

// 确保未登录时重定向到登录页面
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token');
  if (to.path !== '/login' && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

// 创建 Vue 实例（移除 store）
new Vue({
  router,       // 保留路由
  render: h => h(App),
}).$mount('#app');

