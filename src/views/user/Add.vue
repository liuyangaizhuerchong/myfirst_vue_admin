<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户新增</span>
      </div>
      <div class="text item">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名称" prop="nickName">
            <el-input
              v-model="ruleForm.nickName"
              placeholder="请输入用户名称"
            />
          </el-form-item>
          <el-form-item label="用户头像">
            <el-upload
              class="avatar-uploader"
              :action="serverUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="ruleForm.avatar"
                :src="ruleForm.avatar | dalImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item align="right">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即新增</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { newAddUserApi } from '@/api/user'
import { serverUpload } from '@/utils/request'
export default {
  data() {
    return {
      serverUpload,
      categories: [],
      ruleForm: {
        nickName: '',
        gender: '',
        desc: '',
        avatar: '',
        birthday: '',
        address: '',
        age: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await newAddUserApi(this.ruleForm)
          this.$message.success('新增成功')
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
    handleAvatarSuccess(res, file) {
      if (res.code === 1) {
        this.$message.success('上传成功！')
        this.ruleForm.coverImage = res.data
      } else {
        this.$message.error('上传失败，请重新上传！')
      }
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
