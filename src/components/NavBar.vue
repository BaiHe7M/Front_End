<template>
  <el-header class="navbar">
    <div class="nav-left">
      <span class="logo">系统名称</span>
    </div>
    <div class="nav-right" v-if="isLoggedIn">
      <el-dropdown>
        <span class="user-info">
          <i class="el-icon-user"></i>
          {{ username }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
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
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.$message.success('已退出登录');
      this.$router.push('/login');
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