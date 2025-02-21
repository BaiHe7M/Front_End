<template>
  <el-upload
    class="upload-demo"
    :action="uploadUrl"
    :headers="headers"
    :data="uploadData"
    :on-success="handleSuccess"
    :on-error="handleError"
    :before-upload="beforeUpload"
  >
    <el-button type="primary" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        请上传小于 10MB 的文件
      </div>
    </template>
  </el-upload>
</template>

<script>
import { getAuthToken } from '../api'

export default {
  name: 'FileUpload',
  data() {
    const token = getAuthToken();
    console.log('Authorization Token:', token); // 添加调试信息
    return {
      uploadUrl: '/api/contractFiles/upload',
      headers: {
        Authorization: `Bearer ${token}`
      },
      uploadData: {
        originalName: '' // 初始化 originalName
      }
    }
  },
  methods: {
    handleMouseOver() {
      console.log('Mouse over upload button'); // 鼠标悬停在上传按钮上
    },
    handleMouseLeave() {
      console.log('Mouse left upload button'); // 鼠标离开上传按钮
    },
    handleSuccess(response) {
      this.$message.success('文件上传成功，ID: ' + response); // 显示文件上传成功信息
    },
    handleError() {
      this.$message.error('文件上传失败')
    },
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
      }
      this.uploadData.originalName = file.name; // 设置 originalName 为文件名
      return isLt10M
    }
  }
}
</script>

<style scoped>
.upload-demo {
  margin: 20px;
}

.el-upload__tip {
  margin-top: 10px;
  font-size: 12px;
  color: #606266;
}
</style>
