<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>轮播图列表</span>
        <el-button style="float: right" type="danger" size="mini"
          ><i class="el-icon-delete"></i
        ></el-button>
        <el-button
          style="float: right; margin-right: 10px"
          size="mini"
          type="primary"
          @click="newAdd"
          ><i class="el-icon-plus"></i
        ></el-button>
      </div>
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="轮播图名称:">
          <el-input
            v-model="formSearch.name"
            placeholder="输入轮播图名称"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        class="main"
        :header-cell-style="header_style"
        v-loading="loading"
        :data="data"
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column type="index" label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column label="创建日期" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createdAt | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="轮播图名称" align="center">
        </el-table-column>
        <el-table-column label="轮播图图片" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.coverImage | dalImg"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button size="mini" @click="handleEdit(scope.row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        background
        layout="prev, pager, next"
        align="center"
        @current-change="loadData"
      >
      </el-pagination>
    </el-card>
    <add-banner ref="newBanner" :bannerDialog="newAdd" />
    <edit-banner ref="eidtBanner" :editBanner="handleEdit" />
  </div>
</template>

<script>
import { delProductApi } from '@/api/bannerCategory'
import addBanner from './Add.vue'
import editBanner from './Edit.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ListBanner',
  components: { addBanner, editBanner },
  data() {
    return {
      header_style: {
        backgroundColor: '#f3f5f9'
      }
    }
  },
  computed: {
    ...mapState('bannercategory', ['data', 'total', 'formSearch', 'loading'])
  },
  created() {
    this.loadData(1)
  },
  methods: {
    ...mapActions('bannercategory', ['loadData']),
    handleEdit(row) {
      this.$refs.eidtBanner.dialogFormVisible = true
      this.$refs.eidtBanner.loadOneDetail(row.id)
    },
    handleDelete(row) {
      this.$confirm('确定删除该轮播图？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delProductApi(row.id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadData(1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    newAdd() {
      this.$refs.newBanner.dialogFormVisible = true
    },
    onSubmit() {
      this.loadData(1)
    }
  }
}
</script>

<style scoped>
.clearfix {
  font-size: 20px;
  font-weight: 900;
  line-height: 28px;
}
</style>
