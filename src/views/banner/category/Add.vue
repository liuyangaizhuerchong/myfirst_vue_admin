<template>
  <div class="el-dialog">
    <el-dialog
      title="新增分类"
      :visible.sync="dialogFormVisible"
      :destroy-on-close="destroyonclose"
      @close="resetFile"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="分类主图">
          <upload-url
            :imageUrl="ruleForm.coverImage"
            @changeImage="changeHandleImage"
          />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input
            type="textarea"
            v-model="ruleForm.desc"
            placeholder="请输入分类描述"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即新增</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { newAddProductApi } from '@/api/bannerCategory'
import { mapActions } from 'vuex'
import UploadUrl from '@/components/UploadImg'
export default {
  name: 'AddBanner',
  components: { UploadUrl },
  props: ['bannerDialog'],
  data() {
    return {
      destroyonclose: true,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      ruleForm: {
        name: '',
        desc: '',
        coverImage: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入轮播图名称', trigger: 'blur' }
        ],
        desc: [{ required: true, message: '轮播图简述', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions('bannercategory', ['loadData']),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await newAddProductApi(this.ruleForm)
          this.$message.success('新增成功')
          this.dialogFormVisible = false
          this.loadData(1)
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    cancle() {
      this.dialogFormVisible = false
    },
    changeHandleImage(img) {
      this.ruleForm.coverImage = img
    },
    resetFile() {
      this.ruleForm = {}
    }
  }
}
</script>

<style>
.el-icon-close:before {
  content: '\e6db';
  color: orange;
}
.el-dialog__headerbtn {
  font-size: 15px;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  top: 17px;
  color: orange;
}
.el-dialog__header {
  background-color: #f3f5f9;
  padding: 20px;
}
</style>
