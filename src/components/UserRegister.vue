<template>
  <el-form 
    :model="registerForm" 
    :rules="rules" 
    ref="registerForm" 
    label-width="100px" 
    class="register-form"
  >
    <h2 class="title">用户注册</h2>
    
    <el-form-item label="用户名" prop="username">
      <el-input v-model="registerForm.username" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="registerForm.password" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"></el-input>
    </el-form-item>

    <el-form-item label="确认密码" prop="checkPassword">
      <el-input type="password" v-model="registerForm.checkPassword" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="registerForm.email" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('registerForm')">立即注册</el-button>
      <el-button @click="goToLogin">已有账号？去登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserRegister',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      registerForm: {
        username: '',
        password: '',
        checkPassword: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
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
    submitForm(formName) {
      console.log('Submit button clicked'); // 添加调试信息
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post('/api/user/register', this.registerForm)
            .then(() => {
              this.$message.success('注册成功！');
              this.$router.push('/login');
            })
            .catch(err => {
              this.$message.error(`注册失败: ${err.response?.data?.message || '服务器错误'}`);
            });
        }
      });
    },
    goToLogin() {
      console.log('Go to login button clicked'); // 添加调试信息
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.register-form {
  width: 500px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
}
</style>
