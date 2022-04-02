/**
 * 用户管理 用户信息
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item style="margin-bottom:0px">
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <!-- @selection-change="selectChange" -->
    <el-table height="560px" size="small"
    :data="userData.filter(data => !search || data.realName.toLowerCase().includes(search.toLowerCase()) || data.organization.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row 
    v-loading="loading" border element-loading-text="拼命加载中" 
    style="width: 100%; font-size:14px">
      <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column align="center" sortable prop="realName" width="150px" label="姓名">
      </el-table-column>
      <el-table-column align="center" sortable prop="email" width="200px" label="邮件">
      </el-table-column>
      <el-table-column align="center" sortable prop="phone" width="150px" label="手机号">
      </el-table-column>
      <el-table-column align="center" sortable prop="organization" width="150px" label="组织">
      </el-table-column>
      <!-- <el-table-column align="center" sortable prop="AuditImg" width="150px" label="审核资料">
      </el-table-column> -->
      <el-table-column label="操作" align="center" width="250px">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入姓名或组织搜索用户"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
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
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="350px" @close='closeDialog("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="姓名" prop="realName">
          <el-input size="small" v-model="editForm.realName" auto-complete="off" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input size="small" v-model="editForm.email" placeholder="请输入您的邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input size="small" v-model="editForm.phone" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item label="组织" prop="organization">
          <el-input size="small" v-model="editForm.organization" placeholder="请输入您所在组织"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="small" v-model="editForm.password" :disabled="pwdDisabled" placeholder="请输入您的密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm(editEmail,editForm)">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入请求方法
import {
  userList,
  userEdit,
  userAdd,
  userDeleteLogical
} from '../../api/userMG'
export default {
  data() {
    return {
      currentPage: 1,
      pagesize:10,
      pagesizes:[10,50,100],
      search: '',
      loading: false, //是显示加载
      title: '添加用户',
      materialsDialogTitle: '',//审核资料title
      editFormVisible: false, //控制编辑页面显示与隐藏
      unitAccessshow: false, //控制所属单位隐藏与显示
      editEmail: '',
      pwdDisabled: true,
      // 编辑与添加
      editForm: {
        realName: '',
        phone: '',
        email: '',
        organization: '',
        password: '',
        token: sessionStorage.getItem('logintoken')
      },
      // 选择数据
      selectdata: [],
      // rules表单验证
      rules: {
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[1,7]))\d{8}$/,
            required: true,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            required: true,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ]
      },
      // 删除用户
      seletedata: {
        ids: '',
        token: sessionStorage.getItem('logintoken')
      },
      // 重置密码
      resetpsd: {
        userId: '',
        token: sessionStorage.getItem('logintoken')
      },
      // 用户下线
      offline: {
        token: sessionStorage.getItem('logintoken')
      },
      // 请求数据参数
      formInline: {
        token: sessionStorage.getItem('logintoken')
      },
      //用户数据
      userData: [],
      // 数据权限
      UserDept: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
    }
  },
  // 注册组件
  components: {
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

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取数据方法
    getdata() {
      this.loading = true
      /***
       * 调用接口 获取用户列表
       */
      userList().then(res => {
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
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.pwdDisabled=true
        this.title = '修改用户'
        this.editEmail=row.email
        this.editForm.realName = row.realName
        this.editForm.email= row.email
        this.editForm.phone = row.phone
        this.editForm.organization = row.organization
      } else {
        this.pwdDisabled=false
        this.title = '添加用户'
        this.editForm.realName = ''
        this.editForm.email= ''
        this.editForm.phone = ''
        this.editForm.organization = ''
        this.editForm.password = ''
      }
    },
    // 编辑、添加提交方法
    submitForm(params,editData) {
      console.log(params)
      console.log(editData)
      // 请求方法
      if(this.title=='修改用户'){
        userEdit(params,editData)
        .then(res => {
          this.editFormVisible = false
          this.loading = false
          if (res.code==2000) {
            this.getdata()
            this.$message({
              type: 'success',
              message: '用户信息修改成功！'
            })
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }else if(this.title=='添加用户'){
        userAdd(editData)
        .then(res => {
          this.editFormVisible = false
          this.loading = false
          if (res.code==2000) {
            this.getdata()
            this.$message({
              type: 'success',
              message: '用户新增成功！'
            })
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
        this.pwdDisabled=false
      }
      this.editForm={
        realName: '',
        phone: '',
        email: '',
        organization: '',
        token: sessionStorage.getItem('logintoken')
      }
    },
    handleClick(data, checked, node) {
      if (checked) {
        this.$refs.tree.setCheckedNodes([])
        this.$refs.tree.setCheckedNodes([data])
        this.unitparm.deptId = data.id
        this.unitparm.deptName = data.name
        //交叉点击节点
      } else {
      }
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if(this.title=="添加用户"){
        this.pwdDisabled==true
      }else{
        this.pwdDisabled==false
      }
      this.editFormVisible = false
      this.editForm={
        realName: '',
        phone: '',
        email: '',
        organization: ''
      }
    },
    // 删除用户
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          userDeleteLogical(row.email)
            .then(res => {
              if (res.code==2000) {
                this.$message({
                  type: 'success',
                  message: '用户'+row.realName+'已删除!'
                })
                this.getdata()
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('数据删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
    },
    // 重置密码
    resetpwd(index, row) {
      this.resetpsd.userId = row.userId
      this.$confirm('确定要重置密码吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // userPwd(this.resetpsd)
          //   .then(res => {
          //     if (res.success) {
          //       this.$message({
          //         type: 'success',
          //         message: '重置密码成功！'
          //       })
          //       this.getdata(this.formInline)
          //     } else {
          //       this.$message({
          //         type: 'info',
          //         message: res.msg
          //       })
          //     }
          //   })
          //   .catch(err => {
          //     this.loading = false
          //     this.$message.error('重置密码失败，请稍后再试！')
          //   })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消重置密码！'
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
      }
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>

 