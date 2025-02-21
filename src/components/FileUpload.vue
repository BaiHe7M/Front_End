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
    <el-button type="primary">点击上传</el-button>
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
    handleSuccess() {
      this.$message.success('文件上传成功')
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
