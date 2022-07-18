<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
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
        <el-form-item label="用户名:">
          <el-input
            v-model="formSearch.userName"
            placeholder="输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item label="昵称:">
          <el-input
            v-model="formSearch.nickName"
            placeholder="输入昵称"
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
        <el-table-column prop="userName" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" align="center">
        </el-table-column>
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.coverImage | dalImg"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="账户是否锁定" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.isLocked ? '是' : '否' }}</span>
          </template>
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
            <el-button size="mini" @click="handleLocked(scope.row)"
              ><i class="fa fa-lock" aria-hidden="true"></i
            ></el-button>
            <!-- fa fa-unlock-alt -->
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
  </div>
</template>

<script>
import { listUserApi, delUserApi } from '@/api/user'
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
        userName: '',
        nickName: ''
      }
    }
  },
  created() {
    this.loadData(1)
  },
  methods: {
    async loadData(page) {
      this.list = []
      const res = await listUserApi({ page, ...this.formSearch })
      console.log(res)
      this.loading = true
      this.list = res.data
      this.total = res.total
      this.loading = false
    },
    handleEdit(row) {
      this.$router.push({
        name: 'UserEdit',
        query: {
          id: row.id
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确定删除该用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delUserApi(row.id)
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
        name: 'UserAdd'
      })
    },
    onSubmit() {
      this.loadData(1)
    },
    handleLocked(row) {
      console.log(row)
    }
  }
}
</script>

<style scoped></style>
