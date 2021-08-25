<template>
    <div>
      <el-container>
        <el-header><Header /></el-header>
        <el-main style="overflow-y:hidden; height:100%"><router-view /></el-main>
        <el-footer height="130px"><Footer /></el-footer>
      </el-container>
    </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  name: 'Index',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
.el-header {
  padding: 0;
  position: fixed;
  z-index: 100;
  width: 100%;
  background-color: white;
}
.el-footer {
  color: #333;
  height:200px;
  text-align: center;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  height: 100vh;
}
</style>
