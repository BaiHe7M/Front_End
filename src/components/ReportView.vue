<template>
  <el-table :data="reportData" style="width: 100%">
    <el-table-column prop="originalName" label="文件名" width="180" />
    <el-table-column prop="uploadTime" label="上传时间" width="180" />
    <el-table-column prop="status" label="状态" />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button 
          v-if="scope.row.status === '检测完成'" 
          type="primary" 
          @click="downloadReport(scope.row.id)"
        >
          下载报告
        </el-button>
      </template>
    </el-table-column>
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
        console.log('Fetching report data'); // 添加调试信息
        const { data } = await axios.get('/api/contractFiles/userFiles', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Report data fetched:', data); // 添加调试信息
        this.reportData = data;
      } catch (error) {
        console.error('获取报告失败:', error);
        this.$message.error('获取报告失败，请稍后重试');
      }
    },
    async downloadReport(fileId) {
      try {
        const response = await axios.get(`/api/contractFiles/${fileId}/report`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          responseType: 'blob' // 确保响应类型为 blob
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('下载报告失败:', error);
        this.$message.error('下载报告失败，请稍后重试');
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