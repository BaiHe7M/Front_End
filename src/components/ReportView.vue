<template>
  <el-table :data="reportData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="status" label="状态" />
  </el-table>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReportView',
  data() {
    return {
      reportData: []
    }
  },
  created() {
    this.fetchReport()
  },
  methods: {
    async fetchReport() {
      try {
        const { data } = await axios.get('/api/contractFiles/1/report', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.reportData = data;
      } catch (error) {
        console.error('获取报告失败:', error);
        this.$message.error('获取报告失败，请稍后重试');
      }
    }
  }
}
</script>

<style scoped>
.el-table {
  margin: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>