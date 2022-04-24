/**
 * 数据反馈
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据反馈</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- table -->
    <el-table
    type=index
    style="margin-top:15px;width: 100%"
    height="600px"
    :data="dataFeedBack.filter(data => !search || data.dataName.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
    highlight-current-row
    >
    <el-table-column
      align="center"
      width="250px">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入数据名称搜索相关数据"></el-input>
      </template>
        <el-table-column
            label="数据名称"
            prop="content"
            align="center"
            width="350px"
            sortable>
        </el-table-column>
        <el-table-column
            label="用户邮箱"
            prop="userEmail"
            align="center"
            width="350px">
        </el-table-column>
        <el-table-column
            label="具体反馈数据"
            prop="material"
            align="center"
            width="150px">
            <el-button
                size="mini"
                @click="checkMaterial(scope.$index, scope.row)"
                slot-scope="scope">查看</el-button>
        </el-table-column>
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
      :total="dataFeedBack.length">
    </el-pagination>
  </div>
  <!-- 数据反馈资料展示 -->
    <el-dialog
    :title="materialsDialogTitle"
    :visible.sync="materialsDialogVisible"
    width="600px"
    :before-close="materialsClose">
      <template>

        <el-table
          :data="material"
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
              <el-link @click="downloadMaterial(scope.row.filePathName)" type="primary">{{scope.row.filePathName+'.'+scope.row.fileType}}</el-link>
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
  feedbackDataList,
  feedbackFileList,
  downloadFeedbackFile,
  // auditUserList,
  // userProofList,
  // downloadUserProofData,
} from '../../api/dataFeedBack.js'
  export default {
    data() {
      return{
        search: '',
        currentPage: 1,
        pagesize:10,
        pagesizes:[10,50,100],
        materialsDialogVisible: false,//控制资料显示与隐藏
        materialsDialogTitle: '',
        dataFeedBack: [],
        material: [],
        auditDataPath:'',
        auditFailRealName: '',
        causeEmail:''
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
        this.$confirm('取消对该用户的操作？',{
          type:'warning'
        })
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //查看审核资料
      checkMaterial(index, row){
        console.log(index,row)
        this.materialsDialogVisible=true
        this.materialsDialogTitle=this.dataFeedBack[index].userEmail+'的反馈数据'
        console.log(row.id)
        this.getauditdata(row.id)
      },
      // 获取数据方法
      getdata() {
        this.loading = true
        /***
        * 调用接口 获取反馈数据列表
         */
        feedbackDataList().then(res => {
          this.loading = false
          if (res.code == 2404) {
            this.$message({
              type: 'info',
              message: res.msg
           })
         } else {
            this.dataFeedBack = res.data
          }
          console.log(this.dataFeedBack)
        })
      },
      // 获取具体反馈数据
      getauditdata(params) {
        this.loading = true
        /***
        * 调用接口 获取具体反馈数据
        */
        feedbackFileList(params).then(res => {
          this.loading = false
          if (res.code == 2404) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.material = res.data
          }
          console.log(this.material)
        })
      },
      downloadMaterial(params){
        //下载反馈数据文件
        downloadFeedbackFile(params).then(res => {
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
        })
      }
    },
  }
</script>
