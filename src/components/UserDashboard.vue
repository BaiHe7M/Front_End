<template>
  <div class="dashboard">
    <NavBar />
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'UserDashboard',
  components: { NavBar }
};
</script>

<style scoped>
.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>