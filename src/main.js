// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// 引入element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
// 引入路由
import router from './router';
// 引入状态管理
import store from './vuex/store';
// 引入icon
import './assets/icon/iconfont.css'
//

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// 使用element UI
Vue.use(ElementUI);
// 过滤器
import * as custom from './utils/util'

Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})

// 路由拦截器
 router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.matched.length != 0) {
      if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
            if (Boolean(sessionStorage.getItem("userdata"))) { // 通过vuex state获取当前的user是否存在
                next();
            } else {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        } else {
        if (Boolean(sessionStorage.getItem("userdata"))) { // 判断是否登录
            if (to.path != "/" && to.path != "/login") { //判断是否要跳到登录界面
                next();
            } else {
                //
                 // 防刷新，如果登录，修改路由跳转到登录页面，修改路由为登录后的首页
                 //
                next({
                    path: '/user/userMessage'
                })
            }
        } else {
                next();
            }
        }
    } else {
        next({
            path: '/login',
            query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
})
//
//
// const whiteList = ['/login']// 免登录白名单
//
// router.beforeEach((to, from, next) => {
//   if (cookieGetToken()) { // determine if there has token
//     /* has token*/
//     if (to.path === '/login') {
//       next({ path: '/' })
//     }
//     next()
//   } else {
//     /* has no token*/
//     if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//       next()
//     } else {
//       next('/login') // 否则全部重定向到登录页
//     }
//   }
// })
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store, //使用store vuex状态管理
    components: { App },
    template: '<App/>',
    data: {
        // 空的实例放到根组件下，所有的子组件都能调用
        Bus: new Vue()
    }

})
