<template>
  <el-header class="navbar">
    <div class="nav-left">
      <span class="logo">系统名称</span>
    </div>
    <div class="nav-right" v-if="isLoggedIn">
      <el-dropdown @command="handleCommand">
        <span class="user-info" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
          <i class="el-icon-user"></i>
          {{ username }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="report">查看报告</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NavBar',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    },
    username() {
      return localStorage.getItem('username') || '用户';
    }
  },
  methods: {
    handleMouseOver() {
      console.log('Mouse over user info'); // 鼠标悬停在用户信息上
    },
    handleMouseLeave() {
      console.log('Mouse left user info'); // 鼠标离开用户信息
    },
    handleCommand(command) {
      if (command === 'report') {
        this.goToReport();
      } else if (command === 'logout') {
        this.logout();
      }
    },
    goToReport() {
      console.log('Go to report button clicked'); // 添加调试信息
      this.$router.push('/report');
    },
    async logout() {
      try {
        console.log('Logout button clicked'); // 鼠标点击了按钮
        console.log('Sending logout request'); // 发送登出请求
        const response = await axios.post('/api/user/logout'); // 移除 Authorization 头
        console.log('Logout response:', response); // 输出登出响应
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.$message.success('已退出登录');
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout error:', error); // 输出登出错误
        this.$message.error('退出登录失败，请稍后重试');
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #409EFF;
  color: white;
  padding: 0 40px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.user-info {
  cursor: pointer;
  padding: 0 15px;
}

.el-icon-user {
  margin-right: 5px;
}
</style>