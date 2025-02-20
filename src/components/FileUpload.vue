<template>
  <el-upload
    class="upload-demo"
    action="/api/upload"
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
export default {
  name: 'FileUpload',  // 1. 添加多单词组件名
  methods: {
    handleSuccess() {  // 2. 删除未使用的参数
      this.$message.success('文件上传成功')
    },
    handleError() {  // 3. 删除未使用的参数
      this.$message.error('文件上传失败')
    },
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10  // 修改为 10MB
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
      }
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
