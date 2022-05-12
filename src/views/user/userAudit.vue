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
    :data="userData.filter(data => !search || data.organization.toLowerCase().includes(search.toLowerCase()) || data.realName.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      width="250px">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入姓名或组织搜索用户"></el-input>
      </template>
      <template :display="isAudit" slot-scope="scope">
        <el-button
          size="mini"
          @click="auditSuccess(scope.$index, scope.row)">审核通过</el-button>
        <el-button
          size="mini"
          type="danger"
          style="margin-top:5px"
          @click="auditFail(scope.$index, scope.row)">审核不通过</el-button>
      </template>
      <template>
        <i class="el-icon-check"></i>
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
            prop=""
            label="编号"
            width="100px">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
            label="链接"
            width="300px">
            <template slot-scope="scope">
              <el-link @click="downloadAuditData(scope.row.filePathName)" :disabled="isdownloading" type="primary">{{scope.row.filePathName+'.'+scope.row.fileType}}</el-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="materialsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="materialsDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 不通过原因输入 -->
    <el-dialog
    title="请输入您审核不通过的原因"
    :visible.sync="causeDialogVisible"
    width="450px"
    :before-close="materialsClose">
      <template>
        <el-input type="textarea" rows="10" v-model="cause"></el-input>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="causeDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="seedCause(username)">发送</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  auditUserList,
  userProofList,
  downloadUserProofData,
  userAuditPass,
  seedMessage,
  userDeletePhysics
} from '../../api/userMG'
  export default {
    data() {
      return{
        isdownloading: false,
        search: '',
        currentPage: 1,
        pagesize:10,
        pagesizes:[10,50,100],
        causeDialogVisible: false,
        cause:'',
        materialsDialogVisible: false,//控制审核资料显示与隐藏
        materialsDialogTitle: '',
        isAudit: true,
        auditEdit:{
          email: '',
          accountStatus: 0,
          roleId: '',
        },
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
        username: '',
        userData: [],
        auditData: [],
        auditDataPath:'',
        auditFailRealName: '',
        causeEmail:'',
        causeMessage:{
          message:'',
          type: '',
          email: ''
        }
      }
    },
    /**
    * 数据发生改变
    */
    watch: {
    },

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
          this.auditEdit.email=row.email
          this.auditEdit.accountStatus=1
          this.auditEdit.roleId=row.roleId
          userAuditPass(this.auditEdit)
            .then(res => {
              if (res.code==2000) {
                this.$message({
                  type: 'success',
                  message: row.realName + '的注册账号已通过审核。'
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
              this.$message.error('审核提交失败，请稍后再试！')
            }),
            this.causeMessage.email=row.email
            this.causeMessage.type=0
            this.causeMessage.message=''
            seedMessage(this.causeMessage)
              .then(res => {
                if (res.code==2000) {
                  this.$message({
                    type: 'success',
                    message: '已给' + row.realName + '发送了注册账号成功的邮件。'
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
              this.$message.error('发送失败，请稍后重试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消对' + row.realName + '注册账号的审核。'
          })
        })
    },
      //分页功能
      handleSizeChange(val) {
        this.pagesize=val
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage=val
        // console.log(`当前页: ${val}`);
      },
      materialsClose(done) {
        this.$confirm('取消对该用户的操作？',{
          type:'warning'
        })
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      seedCause(username){
        // 发送审核不通过原因，并删除用户信息。
        //发送
        this.causeMessage.email=this.causeEmail
        this.causeMessage.type=1
        this.causeMessage.message=this.cause
        // console.log(this.causeMessage)
        seedMessage(this.causeMessage)
          .then(res => {
              if (res.code==2000) {
                this.$message({
                  type: 'success',
                  message: '已给用户邮箱' + username + '发送了注册账号不成功的原因。'
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
              this.$message.error('发送失败，请稍后重试！')
            })
        this.causeDialogVisible=false
        this.cause=''
        //删除
        userDeletePhysics(this.causeEmail)
            .then(res => {
              console.log(res)
              if (res.code==2000) {
                this.$message({
                  type: 'success',
                  message: '不通过' + this.auditFailRealName+'注册账号的审核，已将其注册账号删除。'
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
              console.log(err)
              this.loading = false
              this.$message.error('数据删除失败，请稍后再试！')
            })
      },
      auditFail(index, row){
        this.username = row.realName
        const tips=['该操作将删除该用户相关信息','如果确定,请输入您审核不通过的原因']
        const newDatas=[]
        const h=this.$createElement
        for (const i in tips) {
          newDatas.push(h('p', null, tips[i]))
        }
        this.$confirm( '提示', {
          message:h('div',null,newDatas),
          confirmButtonText: '填写原因',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.causeEmail=row.email
          this.auditFailRealName=row.realName
          this.causeDialogVisible=true
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消对' + row.realName + '注册账号的审核。'
          })
        })
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
      // 获取用户审核资料
      getauditdata(params) {
        this.loading = true
        /***
        * 调用接口 获取用户列表
        */
        userProofList(params).then(res => {
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
      downloadAuditData(params){
        //下载审核资料
        this.isdownloading = true
        const serverMessage = this.$message({
          type: 'success',
          message: '服务器正在准备数据，请您稍等。',
          duration: 0
        })
        downloadUserProofData(params).then(res => {
          let blob = new Blob([res.data])
					let contentDisposition = res.headers['content-disposition'] //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
					let patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
					let result = patt.exec(contentDisposition)
          console.log(result)
					let thename = decodeURI(result[1]) //使用decodeURI对名字进行解码
					let downloadElement = document.createElement('a')
					let href = window.URL.createObjectURL(blob) //创建下载的链接
					downloadElement.style.display = 'none'
					downloadElement.href = href
					downloadElement.download = thename //下载后文件名
					document.body.appendChild(downloadElement)
					downloadElement.click() //点击下载
					document.body.removeChild(downloadElement) //下载完成移除元素
					window.URL.revokeObjectURL(href) //释放掉blob对象
          serverMessage.close()
          this.isdownloading = false
        }).catch(err => {
          serverMessage.close()
          this.isdownloading = false
          this.$message({
            type: 'error',
            message: '系统出错，未找到该文件或文件已被删除！'
          })
        })
      }
    },
  }
</script>
