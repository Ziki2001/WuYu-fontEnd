<template>
  <div>
    <div class="login-container">
      <div class="zk-login">
      <h1 class="zk-login-title">素拓仓库</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="zk-login-item">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" @keyup.enter.native="login()"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="zk-login-button" type="primary" @click="login('ruleForm')">登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { message: '请输入用户名', trigger: 'blur' },
          { min: 10, max: 12, message: '长度在 10 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      const { name, password } = this.ruleForm
      if (password.length < 6 || password.length > 8) {
        this.$message.error('请输入6-8位密码')
      } else if (name.length < 10 || name.length > 12) {
        this.$message.error('请输入10-12位用户名')
      } else {
        this.$http({
          method: 'POST',
          url: '/api/login',
          data: { user: name, password: password }
        }).then(res => { // res = 后端返回的信息
          console.log(res)
          const { code, msg } = res.data
          if (code === 200) {
            localStorage.setItem('user', name)
            this.$message.success(msg)
            this.$router.push('/index')
            this.$router.go(0)
          } else {
            this.$message.error(msg)
          }
        })
      }
    }
  }

}
</script>

<style scoped>
.login-container {
  height: 100vh;
  padding-bottom: 50px;
}
.zk-login {
  position: relative;
  top:150px;
  padding-top:50px;
  width:32%;
  height:330px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow:2px 2px 10px #909090;
}
.zk-login-title {
  color: rgb(163, 197, 240);
  margin-bottom: 40px;
}
.zk-login-item {
  position: relative;
  padding-right: 55px;
  width: 80%;
  margin:0 auto;
}
.zk-login-button {
  position: relative;
  width: 50%;
  margin: 0 auto;
}
</style>
