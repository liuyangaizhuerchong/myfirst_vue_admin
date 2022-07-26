<template>
  <el-upload
    name="file"
    ref="uploadImg"
    class="avatar-uploader"
    :action="serverUpload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
  >
    <img v-if="imageUrl" :src="imageUrl | dalImg" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import { serverUpload } from '@/utils/request'
export default {
  name: 'UploadImg',
  props: ['imageUrl'],
  data() {
    return {
      serverUpload
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code === 1) {
        this.$message.success('上传成功！')
        this.$emit('changeImage', res.data)
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
  max-width: 178px;
  max-height: 178px;
  display: block;
}
</style>
