<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户新增</span>
      </div>
      <div class="text item">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName" :disabled="true" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="ruleForm.nickName" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item label="头像">
            <upload-img
              :imageUrl="ruleForm.avatar"
              @changeImage="avatarHandle"
            ></upload-img>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="ruleForm.gender" placeholder="请选择性别">
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="ruleForm.birthday"
              type="date"
              placeholder="出生日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item align="right">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >保存</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { putUserApi, oneUserApi } from '@/api/user'
import uploadImg from '@/components/UploadImg.vue'
export default {
  name: 'UserEdit',
  components: { uploadImg },
  data() {
    return {
      ruleForm: {
        userName: '',
        nickName: '',
        gender: '男',
        avatar: '',
        birthday: ''
      }
    }
  },
  created() {
    this.loadCategory()
  },
  methods: {
    async loadCategory() {
      const resOneDetail = await oneUserApi(this.$route.query.id)
      this.ruleForm = resOneDetail
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await putUserApi(this.$route.query.id, this.ruleForm)
          this.$message.success('编辑成功')
          this.$router.push({
            name: 'UserList'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    avatarHandle(img) {
      this.ruleForm.avatar = img
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
