<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分类编辑</span>
      </div>
      <div class="text item">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入商品名称" />
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
          <el-form-item label="分类描述" prop="desc">
            <el-input
              type="textarea"
              v-model="ruleForm.desc"
              placeholder="请输入分类描述"
            />
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
import { modelModifyApi, modelOneCategoryApi } from '@/api/category'
import { serverUpload } from '@/utils/request'
export default {
  data() {
    return {
      serverUpload,
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
  created() {
    this.loadCategory()
  },
  methods: {
    async loadCategory() {
      const resOneDetail = await modelOneCategoryApi(this.$route.query.id)
      console.log(resOneDetail)
      this.ruleForm = resOneDetail
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await modelModifyApi(this.$route.query.id, this.ruleForm)
          this.$message.success('编辑成功')
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

<style></style>
