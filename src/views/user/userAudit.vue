/**
 * 用户管理 用户审核
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户审核</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- table -->
    <el-table
    type=index
    height="600px"
    :data="userData.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.organization.toLowerCase().includes(search.toLowerCase()) || data.realName.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    highlight-current-row 
    >
    <el-table-column
      label="姓名"
      prop="realName"
      align="center"
      width="150px"
      sortable>
    </el-table-column>
    <el-table-column
      label="邮箱"
      prop="email"
      align="center"
      width="200px"
      sortable>
    </el-table-column>
    <el-table-column
      label="手机号"
      prop="phone"
      align="center"
      width="150px"
      sortable>
    </el-table-column>
    <el-table-column
      label="组织"
      prop="organization"
      align="center"
      width="150px"
      sortable>
    </el-table-column>
    <el-table-column
      label="审核资料"
      prop=""
      align="center"
      width="150px">
      <el-button
          size="mini"
          @click="checkOutMaterial(scope.$index, scope.row)"
           slot-scope="scope">查看</el-button>
    </el-table-column>
    <el-table-column
      label="用户权限"
      prop="roleId"
      align="center"
      width="200px">
       <template slot-scope="scope">
        <el-select v-model="scope.row.roleId" clearable placeholder="请配置用户权限">
          <el-option
            v-for="item in userRoots"
            :key="item.label"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      width="250px">
      <template slot="header">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入姓名或组织搜索用户"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="auditSuccess(scope.$index, scope.row)">审核通过</el-button>
        <el-button
          size="mini"
          type="danger"
          style="margin-top:5px"
          @click="handleDelete(scope.$index, scope.row)">审核不通过</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userData.length">
    </el-pagination>
  </div>
  <!-- 审核资料展示 -->
    <el-dialog
    :title="materialsDialogTitle"
    :visible.sync="materialsDialogVisible"
    width="450px"
    :before-close="materialsClose">
      <template>
        <el-table
          :data="auditData"
          style="width: 100%">
          <el-table-column
            prop="filePathName"
            label="相关资料"
            width="200px">
          </el-table-column>
          <el-table-column
            label="链接"
            width="200px">
            <template slot-scope="scope">
              <el-link :href="scope.row.filename" type="primary">{{scope.row.filePathName+'.'+scope.row.fileType}}</el-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="materialsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="materialsDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  auditUserList,
  userUserProofList
} from '../../api/userMG'
  export default {
    data() {
      return{
        currentPage: 1,
        pagesize:10,
        pagesizes:[10,50,100],
        editFormVisible: false,
        materialsDialogVisible: false,//控制审核资料显示与隐藏
        materialsDialogTitle: '',
        userRoots: [{
          value: 2,
          label: '管理员'
        }, {
          value: 1,
          label: '高级用户'
        }, {
          value: 0 ,
          label: '普通用户'
        }],
        userData: [],
        search: '',
        auditData: []
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
      // 审核通过
    auditSuccess(index, row) {
      this.$confirm('确定要通过审核吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 通过
          // userDelete(row.id)//不是userdelete
          //   .then(res => {
          //     if (res.success) {
          //       this.$message({
          //         type: 'success',
          //         message: '审核已通过!'
          //       })
          //       // this.getdata(this.formInline)
          //     } else {
          //       this.$message({
          //         type: 'info',
          //         message: res.msg
          //       })
          //     }
          //   })
          //   .catch(err => {
          //     this.loading = false
          //     this.$message.error('审核提交失败，请稍后再试！')
          //   })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消对该用户的审核！'
          })
        })
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
      materialsClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //查看审核资料
      checkOutMaterial(index, row){
        console.log(index,row)
        this.materialsDialogVisible=true
        this.materialsDialogTitle=this.userData[index].realName+'的审核资料'
        console.log(row.email)
        this.getauditdata(row.email)
      },
      // 获取数据方法
      getdata() {
        this.loading = true
        /***
        * 调用接口 获取用户列表
         */
        auditUserList().then(res => {
          this.loading = false
          if (res.code == 2404) {
            this.$message({
              type: 'info',
              message: res.msg
           })
         } else {
            this.userData = res.data
          }
          console.log(this.userData)
        })
      },
      // 获取数据方法
      getauditdata(params) {
        this.loading = true
        /***
        * 调用接口 获取用户列表
        */
        userUserProofList(params).then(res => {
          this.loading = false
          if (res.code == 2404) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.auditData = res.data
          }
          console.log(this.auditData)
        })
      },
    },
  }
</script>