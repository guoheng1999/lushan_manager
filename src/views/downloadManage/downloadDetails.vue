/**
 * 下载日志 下载详情
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>下载详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="user-search">
      <el-form-item style="margin-bottom:0px">
        <el-button size="small" type="primary" icon="el-icon-document" @click="exportExcel()">导出为Excel</el-button>
      </el-form-item>
    </el-form>
    
    <!-- table -->
    <el-table
    height="600px"
    :data="downloadData.filter(data => !search || data.downloadUserId.toLowerCase().includes(search.toLowerCase()) || data.downloadIp.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%"
    highlight-current-row >
    <el-table-column
      align="center"
      width="250">
      <template slot="header">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入用户ID、用户IP或数据名搜索"/>
      </template>
      <el-table-column
        label="下载记录ID"
        prop="id"
        align="center"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        label="用户ID"
        prop="downloadUserId"
        align="center"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        label="用户IP"
        prop="downloadIp"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        label="数据名"
        prop="downloadFileName"
        align="center"
        sortable
        width="300">
      </el-table-column>
      <el-table-column
        label="下载时间"
        sortable
        prop="downloadTime"
        align="center"
        width="200">
      </el-table-column>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="downloadData.length">
    </el-pagination>
  </div>
  </div>
</template>
<script>
// 导入请求方法
import {
  downloadList
} from '../../api/downloadMG'
  export default {
    data() {
      return {
        currentPage: 1,
        pagesize:10,
        pagesizes:[10,50,100],
        downloadData: [],
        search: ''
      }
    },
    /**
    * 数据发生改变
    */
    watch: {},

    /**
    * 创建完毕
    */
    created() {
      this.getdata()
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      //分页功能
      handleSizeChange(val) {
        this.pagesize=val
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage=val
        console.log(`当前页: ${val}`);
      },
      // 获取数据方法
      getdata() {
        this.loading = true
        /***
        * 调用接口 获取用户列表
         */
        downloadList().then(res => {
          this.loading = false
          if (res.code == 2404) {
            this.$message({
              type: 'info',
              message: res.msg
           })
         } else {
            this.downloadData = res.data
          }
          console.log(this.downloadData)
        })
      },
      exportExcel(){}
    },
  }
</script>
<style scoped>
.user-search {
  margin-top: 20px;
}
</style>