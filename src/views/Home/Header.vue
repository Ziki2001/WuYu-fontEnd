<template>
    <div >
      <div class="nav">
          <div class="tittle">素拓仓库</div>
          <el-menu class="el-menu-demo" mode="horizontal"
            router :default-active="$route.path" exact>
            <el-menu-item index="/index">素拓材料</el-menu-item>
            <el-menu-item index="/manager" @click="checkUser">数据管理</el-menu-item>
            <el-menu-item el-menu-item index="/login" v-if="login">登录</el-menu-item>
            <el-menu-item index="/register" v-if="login">注册</el-menu-item>
            <el-menu-item v-if="!login">{{user}}</el-menu-item>
            <el-menu-item v-if="!login" @click="open()">退出登录</el-menu-item>
          </el-menu>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      login: !(localStorage.getItem('user')),
      user: localStorage.getItem('user')
    }
  },
  methods: {
    open () {
      this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$router.push('/index')
        localStorage.removeItem('user')
        this.$router.go(0)
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    checkUser () {
      if (!localStorage.getItem('user')) {
        this.$message.warning('请登录后使用')
      }
    }
  }
}
</script>
<style scoped>
.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.tittle {
  height: 60px;
  line-height: 60px;
  margin-left: 50px;
  color: rgb(163, 197, 240);
  font-size:20px
}
</style>
