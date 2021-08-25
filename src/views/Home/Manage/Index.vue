<template>
    <div>
      <div class = "zk-educationItem">
        <div class = "zk-educationItem-top">
          <div class = "zk-educationItem-text">
            <div class="zk-educationItem-add">
              <span style="margin-bottom: 10px; font-size:13px; color: rgb(144,147,153); font-weight: bold;">材料类型</span>
              <el-input class = "zk-educationItem-type" v-model="input_type" placeholder="如：班会材料/获奖材料/座谈会材料/其他材料"></el-input>
            </div>
            <div class="zk-educationItem-add">
              <span style="margin-bottom: 10px; font-size:13px; color: rgb(144,147,153); font-weight: bold;">材料内容</span>
              <el-input class = "zk-educationItem-content" v-model="input_content" placeholder="如：XX班会/xx奖/xx座谈会"></el-input>
            </div>
            <div class="zk-educationItem-add">
              <span style="margin-bottom: 10px; font-size:13px; color: rgb(144,147,153); font-weight: bold;">日期</span>
              <el-input class = "zk-educationItem-date" v-model="input_date" placeholder="如：2021.8.7"></el-input>
            </div>
          </div>
          <div class = "zk-educationItem-upload">
            <el-upload
              class="upload-demo"
              ref="upload"
              accept=".jpg, .jpeg, .png"
              action=""
              list-type="picture"
              :before-upload="beforeUpload"
              :file-list="fileList"
              :auto-upload="false"
              :limit="1">
              <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传<i class="el-icon-upload"></i></el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过2mb</div>
            </el-upload>
          </div>
        </div>
        <div class="zk-educationItem-edit">
          <el-table
          :data="tableData"
          v-loading="loading"
          stripe
          style="width: 100%">
          <el-table-column
              label="类型"
              width="180"
              prop="type">
            <template template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.type }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="内容"
            width="320"
            prop="content">
            <template template slot-scope="scope">
              <span style="margin-left: 10px;">{{ scope.row.content }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="日期"
            width="180"
            prop="date">
            <template template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="showEditDialog(scope.row.type, scope.row.content, scope.row.date)"><i class="el-icon-edit"></i>
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"><i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="图片">
            <template template slot-scope="scope">
              <el-image
                style="height:40px; width:70px"
                :src="`/api/educationItem/image/2021/?&time=${queryString}&type=${scope.row.type}&content=${scope.row.content}&date=${scope.row.date}.jpeg`">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template template slot-scope="scope">
              <el-upload
                action = ""
                accept=".jpg, .jpeg, .png"
                :limit="1"
                :before-upload="chageUpload">
                <el-button size="mini" @click="chageDataController(scope.row)">更换图片<i class="el-icon-upload"></i></el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
        </div>
          <el-dialog title="修改资料信息"
            :visible.sync="editDialogVisible" width="50%"
            @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules"
              ref="editFormRef" label-width="100px">
              <el-form-item label="材料类型" prop="type">
                <el-input v-model="editForm_type"></el-input>
              </el-form-item>
              <el-form-item label="材料内容" prop="content">
                <el-input v-model="editForm_content"></el-input>
              </el-form-item>
              <el-form-item label="日期" prop="date">
                <el-input v-model="editForm_date"></el-input>
              </el-form-item>
            </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="editParams()">确定</el-button>
              </span>
            </el-dialog>
    </div>
    <div>

    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      input_type: '',
      input_content: '',
      input_date: '',
      editForm_type: '',
      editForm_content: '',
      editForm_date: '',
      fileList: [],
      tableData: [],
      editDialogVisible: false,
      queryString: '0',
      chageData: {
        type: '',
        content: '',
        date: ''
      },
      loading: true,
      // 修改的表单数据对象
      editForm: {
        type: '',
        content: '',
        date: ''
      },
      // 修改表单的验证规则对象
      editFormRules: {
        type: [{ message: '请输入材料类型', trigger: 'blur' }],
        content: [{ message: '请输入材料详细信息', trigger: 'blur' }],
        date: [{ message: '请输入日期', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.gettableData()
    setTimeout(() => {
      this.loading = false
    }, 700)
  },
  methods: {
    async gettableData () {
      const { data: res } = await this.$http({
        method: 'GET',
        url: '/api/getAllItems'
      })
      this.tableData = res.reverse()
    },
    beforeUpload (file) {
      const msgExtension = file.name.substring(file.name.lastIndexOf('.') + 1)
      const pngExtension = msgExtension === 'png'
      const jpgExtension = msgExtension === 'jpg'
      const jpegExtension = msgExtension === 'jpeg'
      if (pngExtension === false && jpgExtension === false && jpegExtension === false) {
        this.$message.error('图片格式错误')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('文件大于2MB')
        return false
      }
      const resultContent = this.tableData.findIndex((v) => { return v.content === this.input_content })

      if (resultContent === -1) {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('type', this.input_type)
        fd.append('content', this.input_content)
        fd.append('date', this.input_date)
        this.$http({
          method: 'POST',
          url: '/api/educationItem/createNewItem',
          data: fd
        }).then(res => {
          const { code, msg } = res.data
          if (code === 200) {
            this.$message.success(msg)
            this.loading = true
            this.tableData.unshift({ date: this.input_date, type: this.input_type, content: this.input_content })
            setTimeout(() => {
              this.loading = false
            }, 300)
          } else {
            this.$message.error('录入失败，请检查详细信息是否重复')
          }
        })
        return true
      } else {
        this.$message.error('录入失败，请检查详细信息是否重复')
      }
    },
    chageDataController (row) {
      this.chageData.type = row.type
      this.chageData.content = row.content
      this.chageData.date = row.date
    },
    chageUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (isJPEG === false && isPNG === false && isJPG === false) {
        this.$message.error('图片格式错误')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      const fd = new FormData()
      fd.append('file', file)
      fd.append('type', this.chageData.type)
      fd.append('content', this.chageData.content)
      fd.append('date', this.chageData.date)
      this.$http({
        method: 'put',
        url: '/api/educationItem/changeImg',
        data: fd
      }).then(res => {
        const { code, msg } = res.data
        if (code === 200) {
          this.loading = true
          this.$message.success(msg)
          setTimeout(() => {
            this.loading = false
          }, 700)
          this.queryString = new Date().getTime()
        }
      })
      return isJPG && isLt2M && isPNG && isJPEG
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    async handleDelete (row) {
      const confirmResult = await
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除操作')
      }
      const { data: res } = await this.$http({
        method: 'delete',
        url: 'api/educationItem/:admin',
        data: { type: row.type, content: row.content, date: row.date }
      })
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.loading = true
        this.$message.success(res.msg)
        setTimeout(() => {
          this.loading = false
        }, 300)
        this.gettableData()
      }
    },
    showEditDialog (type, content, date) {
      this.editForm.type = type
      this.editForm_type = type
      this.editForm.content = content
      this.editForm_content = content
      this.editForm.date = date
      this.editForm_date = date
      this.editDialogVisible = true
    },
    // 重置修改的表单
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editParams () {
      const oldtype = this.editForm.type
      const oldcontent = this.editForm.content
      const olddate = this.editForm.date
      const newtype = this.editForm_type
      const newcontent = this.editForm_content
      const newdate = this.editForm_date
      if (newtype.length === 0 || newcontent.length === 0 || newdate.length === 0) {
        this.$message.error('信息不能为空')
        return false
      }
      const resultContent = this.tableData.findIndex((v) => { return v.content === this.editForm_content })
      if (resultContent !== -1) {
        this.$message.error('详细信息重复')
        return false
      }
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const editfd = new FormData()
        editfd.append('newType', newtype)
        editfd.append('newContent', newcontent)
        editfd.append('newDate', newdate)
        editfd.append('oldType', oldtype)
        editfd.append('oldContent', oldcontent)
        editfd.append('oldDate', olddate)
        const { data: res } = await this.$http({
          method: 'put',
          url: 'api/educationItem/:admin',
          data: editfd
        })
        if (res.code !== 200) {
          return this.$message.error('修改信息失败')
        } else {
          this.$message.success(res.msg)
          this.gettableData()
          this.editDialogVisible = false
          this.loading = true
          setTimeout(() => {
            this.loading = false
          }, 300)
        }
      })
    }
  }
}
</script>
<style scoped>
.zk-educationItem {
  position: relative;
  top:100px;
  padding-top:50px;
  width:80%;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow:2px 2px 10px #909090;
  margin-bottom: 50px;
}
.zk-educationItem-top {
  display: flex;
  height: 280px;
  padding-top: 40px;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
}
.zk-educationItem-text {
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
}
.zk-educationItem-type {
  width: 300px;
  margin-right: 10px;
}.zk-educationItem-content {
  width: 400px;
  margin-right: 10px;
}
.zk-educationItem-date {
  width: 130px;
}
.zk-educationItem-add {
  display: flex;
  flex-direction: column;
}
.zk-educationItem-upload {
  width: 40%;
  margin-top: 30px;
  margin: 0 auto;
  margin-top: 20px;
}
.zk-educationItem-edit {
  width: 94%;
  margin: 0 auto;
  margin-bottom: 200px;
}
</style>
