<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品新增</span>
      </div>
      <div class="text item">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入商品名称" />
          </el-form-item>
          <el-form-item label="商品图片">
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
          <el-form-item label="分类" prop="category">
            <el-select v-model="ruleForm.category" placeholder="请选择分类">
              <el-option
                v-for="item in categories"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="商品售价" prop="price">
            <el-input
              v-model.number="ruleForm.price"
              placeholder="请输入商品售价"
            />
          </el-form-item>
          <el-form-item label="商品库存" prop="amount">
            <el-input
              v-model.number="ruleForm.amount"
              placeholder="请输入商品库存"
            />
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
import { modelListApi } from '@/api/category'
import { putProductApi, oneProductIdApi } from '@/api/products'
import { serverUpload } from '@/utils/request'
export default {
  data() {
    return {
      serverUpload,
      categories: [],
      ruleForm: {
        name: '',
        category: '',
        desc: '',
        price: '',
        amount: '',
        coverImage: ''
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        category: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        desc: [{ required: true, message: '商品简述', trigger: 'blur' }],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          {
            type: 'number',
            message: '商品价格必须为数子'
          }
        ],
        amount: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
          {
            type: 'number',
            message: '商品库存必须为数子'
          }
        ]
      }
    }
  },
  created() {
    this.loadCategory()
  },
  methods: {
    async loadCategory() {
      const res = await modelListApi()
      this.categories = res.data
      const resOneDetail = await oneProductIdApi(this.$route.query.id)
      // console.log(resOneDetail)
      this.ruleForm = resOneDetail
      this.ruleForm.category = resOneDetail.category.id
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await putProductApi(this.$route.query.id, this.ruleForm)
          this.$message.success('编辑成功')
          this.$router.push({
            name: 'List'
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
