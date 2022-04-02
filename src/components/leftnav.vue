/**
* 左边菜单
*/ 
<template>
  <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#F1F7FD" text-color="#000000" active-text-color="#1977CC">
    <div class="logobox">
      <p>庐山云雾观测数据集<br />平台管理</p>
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.menuname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import { menu } from '../api/userMG'
export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: []
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 获取图形验证码
    let res = {
      success: true,
      data: [
        {
          menuid: 1,
          icon: 'icon-news-manage',
          menuname: '用户管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 12,
              icon: 'icon-cms-manage',
              menuname: '用户审核',
              hasThird: 'N',
              url: 'user/userAudit',
              menus: null
            },
            {
              menuid: 13,
              icon: 'icon-cus-manage',
              menuname: '用户信息',
              hasThird: 'N',
              url: 'user/userMessage',
              menus: null
            }
          ]
        },
        // {
        //   menuid: 33,
        //   icon: 'li-icon-dingdanguanli',
        //   menuname: '数据集管理',
        //   hasThird: null,
        //   url: null,
        //   menus: [
        //     {
        //       menuid: 34,
        //       icon: 'icon-order-manage',
        //       menuname: '数据集管理',
        //       hasThird: 'N',
        //       url: 'dataManage/dataManage',
        //       menus: null
        //     }
        //   ]
        // },
        {
          menuid: 44,
          icon: 'li-icon-dingdanguanli',
          menuname: '数据反馈',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 45,
              icon: 'icon-order-manage',
              menuname: '数据反馈',
              hasThird: 'N',
              url: 'dataFeedBack/dataFeedBack',
              menus: null
            }
          ]
        },
        // {
        //   menuid: 150,
        //   icon: 'li-icon-shujujiankong',
        //   menuname: '下载日志',
        //   hasThird: null,
        //   url: null,
        //   menus: [
        //     {
        //       menuid: 159,
        //       icon: 'li-icon-shujujiankong',
        //       menuname: '下载总览',
        //       hasThird: 'N',
        //       url: 'downloadManage/downloadMessage',
        //       menus: null
        //     },
        //     {
        //       menuid: 160,
        //       icon: 'icon-promotion-manage',
        //       menuname: '下载详情',
        //       hasThird: 'N',
        //       url: 'downloadManage/downloadDetails',
        //       menus: null
        //     }
        //   ]
        // }
      ],
      msg: 'success'
    }
          this.allmenu = res.data
    
    // menu(sessionStorage.getItem('logintoken'))
    //   .then(res => {
    //     console.log(JSON.stringify(res))
    //     if (res.success) {
    //       this.allmenu = res.data
    //     } else {
    //       this.$message.error(res.msg)
    //       return false
    //     }
    //   })
    //   .catch(err => {
    //     this.$message.error('菜单加载失败，请稍后再试！')
    //   })
    // 监听
    this.$root.Bus.$on('toggle', value => {
      this.collapsed = !value
    })
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 75px;
  line-height: 40px;
  color: #1977CC;
  font-size: 20px;
  text-align: center;
  /* padding: 20px 0px; */
}
.logoimg {
  height: 40px;
}
</style>