<template>
  <el-form 
    :model="loginForm" 
    :rules="rules" 
    ref="loginForm" 
    label-width="100px" 
    class="login-form"
  >
    <h2 class="title">用户登录</h2>

    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      <el-button @click="goToRegister">没有账号？去注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLogin',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleMouseOver() {
      console.log('Mouse over input field'); // 鼠标悬停在输入框上
    },
    handleMouseLeave() {
      console.log('Mouse left input field'); // 鼠标离开输入框
    },
    goToRegister() {
      console.log('Go to register button clicked'); // 添加调试信息
      this.$router.push('/register');
    },
    submitForm(formName) {
      console.log('Submit button clicked'); // 添加调试信息
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post('/api/user/login', this.loginForm)
            .then(res => {
              localStorage.setItem('token', res.data.token); // 存储 token
              this.$message.success('登录成功！');
              this.$router.push('/dashboard'); // 登录成功后跳转到主页面
            })
            .catch(err => {
              this.$message.error(`登录失败: ${err.response?.data?.message || '服务器错误'}`);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
/* 仅对当前组件生效 */
.login-form {
  width: 400px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.el-input {
  width: 100%;
}
</style>