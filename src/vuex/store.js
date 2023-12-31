import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 登录验证
export default new Vuex.Store({
    state: {
        user: false
    },
    mutations: {
        // 登录
        login(state, user) {
            state.user = user;
            sessionStorage.setItem("userdata", user);

            // sessionStorage.setItem("userInfo", user);
        },
        // 退出
        logout(state, user) {
            state.user = "";
          sessionStorage.setItem("userdata", "");
            // sessionStorage.setItem("userInfo", "");
        }
    }
})
