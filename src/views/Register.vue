<template>
  <div>
    <div class="reg-container">
      <div class="zk-reg">
    <h1 class="zk-reg-title">素拓仓库</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="zk-reg-item">
          <el-form-item label="用户名" prop="user">
            <el-input v-model="ruleForm.user" placeholder="必填"></el-input>
        </el-form-item>

        <el-form-item  label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="必填"></el-input>
        </el-form-item>

        <el-form-item label="邀请码" prop="code">
          <el-input  v-model="ruleForm.code"  placeholder="必填" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>

        <el-form-item label="学院" prop="aca">
            <el-input v-model="ruleForm.aca" placeholder="选填"></el-input>
        </el-form-item>

        <el-form-item label="班级" prop="clas">
            <el-input v-model="ruleForm.clas" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="选填"></el-input>
        </el-form-item>

        <el-form-item label="学号" prop="num">
            <el-input v-model="ruleForm.num" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="zk-reg-button" type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button class="zk-reg-button" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </div>
      </el-form>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        user: '',
        pass: '',
        checkPass: '',
        aca: '',
        clas: '',
        name: '',
        num: '',
        code: ''
      },
      rules: {
        user: [
          { message: '请输入用户名', trigger: 'blur' },
          { min: 10, max: 12, message: '长度在 10 到 12 个字符', trigger: 'blur' }
        ],
        pass: [
          { message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm () {
      const { user, name, pass, checkPass, aca, clas, num, code } = this.ruleForm
      if (user.length < 10 || user.length > 12) {
        this.$message.error('请输入10到12位用户名')
      } else if (pass.length < 6 || pass.length > 8) {
        this.$message.error('请再次确认密码')
      } else if (checkPass.length < 6 || checkPass.length > 8) {
        this.$message.error('请再次确认密码')
      } else if (code.length === 0) {
        this.$message.error('请填写邀请码')
      } else {
        this.$http({
          method: 'POST',
          url: '/api/register',
          data: { user: user, password: checkPass, name: name, aca: aca, clas: clas, num: num, code: code }
        }).then(res => { // res = 后端返回的信息
          console.log(res)
          const { code, msg } = res.data
          if (code === 200) {
            this.$message.success(msg)
            this.$router.push('/login')
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
.reg-container {
  height:100vh;
  padding-bottom: 50px;
}
.zk-reg {
  position: relative;
  top:100px;
  padding-top:50px;
  width:32%;
  height:685px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow:2px 2px 10px #909090;
}
.zk-reg-title {
  color: rgb(163, 197, 240);
  margin-bottom: 40px;
}
.zk-reg-item {
  position: relative;
  padding-right: 55px;
  width: 80%;
  margin:0 auto;
}
.zk-reg-button {
  width: 30%;
}
</style>
