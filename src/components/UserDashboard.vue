<template>
  <div class="dashboard">
    <NavBar />
    <div class="main-content">
      <div class="upload-container">
        <FileUpload /> <!-- 引用上传文件组件 -->
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import FileUpload from '@/components/FileUpload.vue'; // 引用上传文件组件

export default {
  name: 'UserDashboard',
  components: { NavBar, FileUpload }
};
</script>

<style scoped>
.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>