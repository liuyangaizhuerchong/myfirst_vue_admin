<template>
  <div class="el-dialog">
    <el-dialog
      title="编辑轮播图"
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
        <el-form-item label="轮播图名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入轮播图名称" />
        </el-form-item>
        <el-form-item label="轮播图分类" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择轮播图分类">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="轮播图图片" prop="coverImage">
          <upload-url
            :imageUrl="ruleForm.coverImage"
            @changeImage="changeHandleImage"
          />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input
            type="textarea"
            v-model="ruleForm.desc"
            placeholder="请输入轮播图描述"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { putProductApi, oneProductIdApi } from '@/api/banner'
import { mapActions, mapState } from 'vuex'
import UploadUrl from '@/components/UploadImg'
export default {
  name: 'EditBanner',
  components: { UploadUrl },
  props: ['editBanner'],
  data() {
    return {
      destroyonclose: true,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      ruleForm: {
        name: '',
        desc: '',
        id: '',
        coverImage: '',
        category: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入轮播图名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入轮播图简述', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择轮播图分类', trigger: 'blur' }
        ]
      }
    }
  },
  computed: { ...mapState('banner', ['categories']) },
  async created() {
    this.loadCategory()
  },
  methods: {
    ...mapActions('banner', ['loadData', 'loadCategory']),
    async loadOneDetail(id) {
      const res = await oneProductIdApi(id)
      this.ruleForm = res
      this.ruleForm.category = res.category === null ? '' : res.category.id
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await putProductApi(this.ruleForm.id, { ...this.ruleForm })
          this.$message.success('编辑成功')
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

<style></style>
