import Vue from 'vue';
import VueRouter from 'vue-router';
import UserLogin from '@/components/UserLogin.vue'; // 登录组件
import UserRegister from '@/components/UserRegister.vue'; // 注册组件
import FileUpload from '@/components/FileUpload.vue'; // 上传组件
import ReportView from '@/components/ReportView.vue'; // 报告组件
import Dashboard from '@/components/UserDashboard.vue'; // 主页组件

Vue.use(VueRouter);

// 定义路由
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
    meta: { requiresAuth: false } // 不需要登录
  },
  {
    path: '/register',
    name: 'Register',
    component: UserRegister,
    meta: { requiresAuth: false } // 不需要登录
  },
  {
    path: '/upload',
    name: 'Upload',
    component: FileUpload,
    meta: { requiresAuth: true } // 需要登录
  },
  {
    path: '/report',
    name: 'Report',
    component: ReportView,
    meta: { requiresAuth: true } // 需要登录
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } // 需要登录
  },
  {
    path: '/',
    redirect: '/dashboard', // 默认重定向到主页
  },
  {
    path: '*', // 404 页面
    redirect: '/dashboard' // 重定向到主页
  }
];

// 创建路由实例
const router = new VueRouter({
  mode: 'history',
  routes,
});

// 路由守卫：检查用户是否登录
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // 检查是否有 token

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果目标路由需要登录
    if (!isAuthenticated) {
      // 如果未登录，重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 保存目标路径，登录后跳转
      });
    } else {
      // 如果已登录，继续导航
      next();
    }
  } else {
    // 如果目标路由不需要登录，直接继续导航
    next();
  }
});

export default router;