<template>
  <el-table :data="reportData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="status" label="状态" />
  </el-table>
</template>

<script>
export default {
  name: 'ReportView',  // 1. 添加多单词组件名
  data() {
    return {
      reportData: []
    }
  },
  created() {
    this.fetchReport()
  },
  methods: {
    async fetchReport() {  // 2. 使用 async/await 优化异步操作
      try {
        const { data } = await this.$axios.get('/api/report')
        this.reportData = data
      } catch (error) {
        console.error('获取报告失败:', error)
        this.$message.error('获取报告失败，请稍后重试')  // 3. 添加用户友好提示
      }
    }
  }
}
</script>

<style scoped>
/* 可以添加自定义样式 */
.el-table {
  margin: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>