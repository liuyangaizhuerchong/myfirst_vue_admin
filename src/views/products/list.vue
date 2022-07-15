<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
        <el-button style="float: right" type="danger"
          ><i class="el-icon-delete"></i
        ></el-button>
        <el-button
          style="float: right; margin-right: 10px"
          type="primary"
          @click="newAdd"
          ><i class="el-icon-plus"></i
        ></el-button>
      </div>
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="商品名称:">
          <el-input
            v-model="formSearch.name"
            placeholder="输入商品名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="商品分类:">
          <el-select
            v-model="formSearch.category"
            placeholder="请选择商品分类"
            clearable
            ><el-option label="全选" value="" />
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in categories"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        class="main"
        :header-cell-style="header_style"
        v-loading="loading"
        :data="list"
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
        <el-table-column label="分类" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.category === null
                ? ''
                : scope.row.category.name
                ? scope.row.category.name
                : ''
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" align="center">
        </el-table-column>
        <el-table-column label="商品图片" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.coverImage | dalImg"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="售价"
          align="center"
        ></el-table-column>
        <el-table-column prop="amount" label="库存" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              size="normal"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button size="normal" @click="handleEdit(scope.row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button
              size="normal"
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
  </div>
</template>

<script>
import { listProductApi, delProductApi } from '@/api/products'
import { modelAllCategoryApi } from '@/api/category'
export default {
  data() {
    return {
      header_style: {
        backgroundColor: '#f3f5f9'
      },
      loading: false,
      list: [],
      total: 0,
      formSearch: {
        name: '',
        category: ''
      },
      categories: []
    }
  },
  created() {
    this.loadData(1)
  },
  methods: {
    async loadData(page) {
      const res = await listProductApi({ page, ...this.formSearch })
      const resCategory = await modelAllCategoryApi()
      this.list = []
      this.categories = []
      this.loading = true
      this.list = res.data
      this.total = res.total
      this.categories = resCategory.data
      this.loading = false
    },
    handleEdit(row) {
      this.$router.push({
        name: 'Edit',
        query: {
          id: row.id
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确定删除该商品？', '提示', {
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
      this.$router.push({
        name: 'Add'
      })
    },
    onSubmit() {
      this.loadData(1)
    }
  }
}
</script>

<style scoped></style>
