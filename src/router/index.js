// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */
// 用户管理
import userAudit from '@/views/user/userAudit'
import userMessage from '@/views/user/userMessage'
//数据集管理
import dataManage from '@/views/dataManage/dataManage'
//数据集管理
import dataFeedBack from '@/views/dataFeedBack/dataFeedBack'

//下载管理
import downloadDetails from '@/views/downloadManage/downloadDetails'
import downloadMessage from '@/views/downloadManage/downloadMessage';



// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [{
            path: '/user/userAudit',
            name: '用户审核',
            component: userAudit,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/user/userMessage',
            name: '用户信息',
            component: userMessage,
            meta: {
                requireAuth: true
            }
        },{
            path: '/dataManage/dataManage',
            name: '数据集管理',
            component: dataManage,
            meta: {
                requireAuth: true
            }
        },{
            path: '/dataFeedBack/dataFeedBack',
            name: '数据反馈',
            component: dataFeedBack,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/downloadManage/downloadMessage',
            name: '下载总览',
            component: downloadMessage,
            meta: {
                requireAuth: true
            }
        },{
            path: '/downloadManage/downloadDetails',
            name: '下载详情',
            component: downloadDetails,
            meta: {
                requireAuth: true
            }
        }]
    }]
})