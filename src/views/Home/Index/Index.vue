<template>
    <div >
      <div class='container' v-loading.fullscreen.lock="fullscreenLoading">
          <div v-for="value in tableData" :key="value.content" class="card">
            <el-image :src="`/api/educationItem/image/2021/?type=${value.type}&content=${value.content}&date=${value.date}.jpeg`" class="card-img">
            </el-image>
            <p >材料类型：{{value.type}}<i class="el-icon-document-copy" @click="copy(value.type)"></i></p>
            <p >材料内容：{{value.content}}<i class="el-icon-document-copy" @click="copy(value.content)"></i></p>
            <p >日期：{{value.date}}<i class="el-icon-document-copy" @click="copy(value.date)"></i></p>
          </div>
          <el-backtop></el-backtop>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      tableData: [],
      fullscreenLoading: true
    }
  },
  created () {
    this.gettableData()
    setTimeout(() => {
      this.fullscreenLoading = false
    }, 700)
  },
  methods: {
    async gettableData () {
      const { data: res } = await this.$http({
        method: 'GET',
        url: '/api/getAllItems'
      })
      console.log(res)
      this.tableData = res.reverse()
    },
    copy (value) {
      const input = document.createElement('input')
      input.value = value
      document.body.appendChild(input)
      input.select()
      document.execCommand('Copy')
      document.body.removeChild(input)
      this.$message.success('已经复制好啦')
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  padding-top: 100px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
}
.card {
  width: 30%;
  height: 370px;
  background-color: white;
  border-radius: 10px;
  box-shadow:2px 2px 10px #909090;
  /* margin: 0 20px 40px 20px; */
  margin-left: 3%;
  margin-bottom: 40px;
}
.card-img {
  margin-top: 10px;
  width: 90%;
  height: 250px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.card p {
  margin-top: 5px;
  margin-bottom: 2px;
  font-size:14px;
  color: rgb(144,147,153);
  font-weight: bold;
}
.el-icon-document-copy:hover {
  cursor: pointer;
}
</style>
