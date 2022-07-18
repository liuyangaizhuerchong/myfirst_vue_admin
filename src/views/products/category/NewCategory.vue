<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增分类</span>
      </div>
      <div class="text item">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入分类名称" />
          </el-form-item>
          <el-form-item label="分类主图">
            <el-upload
              class="avatar-uploader"
              :action="serverUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="ruleForm.coverImage"
                :src="ruleForm.coverImage | dalImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品描述" prop="desc">
            <el-input
              type="textarea"
              v-model="ruleForm.desc"
              placeholder="请输入商品描述"
            />
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
import { modelAddApi } from '@/api/category'
import { serverUpload } from '@/utils/request'
export default {
  data() {
    return {
      serverUpload,
      categories: [],
      ruleForm: {
        name: '',
        desc: '',
        coverImage: ''
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        desc: [{ required: true, message: '商品简述', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await modelAddApi(this.ruleForm)
          this.$message.success('新增成功')
          this.$router.push({
            name: 'Category'
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
    handleAvatarSuccess(res, file) {
      if (res.code === 1) {
        this.$message.success('上传成功！')
        this.ruleForm.coverImage = res.data
      } else {
        this.$message.error('上传失败，请重新上传！')
      }
      /* this.imageUrl = URL.createObjectURL(file.raw)
      console.log(res) */
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
