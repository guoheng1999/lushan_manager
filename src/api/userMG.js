import axios from 'axios';
import { reset } from 'echarts/lib/visual/seriesColor';
import { loginreq, req, postRequest,getRequest,putRequest,deleteRequest,fileDownloadRequest } from './axiosFun';

// 登录接口
export const login = (params) => { return postRequest("/manager/login", params) };
// // 获取用户菜单
// export const menu = (params) => { return axios.get("/api/menu?&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };
// // 退出接口
// export const loginout = () => { return axios.delete("/api/login?&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 用户管理
 **/
// 用户管理-用户审核-获取待审核用户列表
export const auditUserList = (params) => { return getRequest("user/reviewed/all", params) };
// 用户管理-用户审核-获取用户审核资料
export const userProofList = (params) => { return getRequest("userProof/user/"+params) };
// 用户管理-用户审核-下载
export const downloadUserProofData = (params) => { return fileDownloadRequest("file/download/user/proof", params) };
// 用户管理-用户审核-给用户发送邮件
export const seedMessage = (params) => { return postRequest("/email",params) };
// 用户管理-用户信息-获取用户列表
export const userList = (params) => { return getRequest("user/all", params) };
// 用户管理-用户信息-保存（修改）
export const userEdit = (params,userData) => { return putRequest("user/"+params,userData) };
// 用户管理-用户信息-添加
export const userAdd = (userData) => { return postRequest("user/",userData) };
// 用户管理-删除用户  警告！！！  这里的接口已经改为了物理删除
export const userDeleteLogical = (params) => { return deleteRequest("/user/physics/" + params)};
// 审核不通过
export const userDeletePhysics = (params) => { return deleteRequest("/user/physics/" + params)};
// 用户管理-用户审核-设置权限-通过审核
export const userAuditPass = (userData) => { return putRequest("user/authorization",userData) };
// // 用户管理-重置密码
// export const userPwd = (params) => { return req("post", "/api/User/pwd", params) };
// // 用户管理-修改状态
// export const userLock = (params) => { return axios.get("/api/User/lock?userId=" + params.userId + "&lock=" + params.lock + "&token=" + sessionStorage.getItem('logintoken')) };
// // 用户管理-数据权限
// export const UserDeptTree = (params) => { return axios.get("/api/UserDept/tree/" + params + "?token=" + sessionStorage.getItem('logintoken')) };
// // 用户管理-数据权限保存
// export const UserDeptSave = (params) => { return req("post", "/api/UserDept/save", params) };
// // 用户管理-获取部门设置
// export const UserDeptdeptTree = (params) => { return axios.get("/api/UserDept/deptTree/" + params + "?token=" + sessionStorage.getItem('logintoken')) };
// // 用户管理-保存部门设置
// export const UserChangeDept = (params) => { return req("post", "/api/User/change/dept", params) };
// // 用户管理-用户下线
// export const userExpireToken = (params) => { return req("get", "/api/User/expireToken/" + params, {}) };
// // 用户管理-刷新缓存
// export const userFlashCache = (params) => { return req("get", "/api/User/flashCache/" + params, {}) };

// /**
//  * 菜单管理
//  **/
// // 菜单管理-获取菜单Module/list
// export const ModuleList = () => { return req("post", "/api/Module/list") };
// // 菜单管理-根据菜单获取数据
// export const ModuleGet = (params) => { return axios.get("/api/Module/get/" + params + "?token=" + sessionStorage.getItem('logintoken')) };
// // 菜单管理-获取父级菜单Module/nodes
// export const ModuleNodes = (params) => { return req("post", "/api/Module/nodes", params) };
// // 菜单管理-修改菜单
// export const ModuleSave = (params) => { return req("post", "/api/Module/save", params) };
// // 菜单管理-删除菜单
// export const ModuleDelete = (params) => { return axios.delete("/api/Module/delete?ids=" + params + "&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };

// /**
//  * 角色管理
//  **/
// // 角色管理-获取角色列表
// export const roleList = (params) => { return req("post", "/api/Role/list", params) };
// // 角色管理-保存（添加编辑）
// export const roleSave = (params) => { return req("post", "/api/Role/save", params) };
// // 角色管理-删除角色
// export const roleDelete = (params) => { return axios.delete("/api/Role/delete?ids=" + params + "&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };
// // 角色管理-菜单权限（获取）
// export const RoleRightTree = (params) => { return axios.get("/api/RoleRight/tree/" + params + "?token=" + sessionStorage.getItem('logintoken')) };
// // 角色管理-菜单权限（保存）
// export const RoleRightSave = (params) => { return req("post", "/api/RoleRight/save", params) };

// /**
//  * 公司管理
//  **/
// // 公司管理-获取公司列表
// export const deptList = (params) => { return req("post", "/api/Dept/list", params) };
// // 公司管理-保存（添加编辑）
// export const deptSave = (params) => { return req("post", "/api/Dept/save", params) };
// // 公司管理-删除公司
// export const deptDelete = (params) => { return axios.get("/api/Dept/delete?ids=" + params + "&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };

// /**
//  * 系统环境变量
//  **/
// // 系统环境变量-获取系统环境变量列表
// export const variableList = (params) => { return req("post", "/api/Variable/list", params) };
// // 系统环境变量-保存（添加编辑）
// export const variableSave = (params) => { return req("post", "/api/Variable/save", params) };
// // 系统环境变量-删除系统环境变量
// export const variableDelete = (params) => { return axios.delete("/api/Variable/delete?ids=" + params + "&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };

// /**
//  * 权限管理
//  **/
// // 权限管理-获取权限列表
// export const permissionList = (params) => { return req("post", "/api/Permission/list", params) };
// // 权限管理-保存权限
// export const ermissionSave = (params) => { return req("post", "/api/Permission/save", params) };
// // 权限管理-删除权限
// export const ermissionDelete = (params) => { return axios.delete("/api/Permission/delete?ids=" + params + "&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };
// // 权限管理-获取权限
// export const roleDropDown = () => { return axios.get("/api/Role/dropDown/all?&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };
// // 权限管理-配置权限
// export const RolePermission = (params) => { return req("post", "/api/RolePermission/save", params) };
