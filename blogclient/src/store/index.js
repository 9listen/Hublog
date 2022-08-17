import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
// const vuexLocal = new VuexPersistence({
//   storage: window.sessionStorage
// });
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    islogin: false,
    userinfo: {
      PK_userGuid: "",
      username: "",
      userheadimg: "",
      useraccount: ""
    },
    friendIslogin: true,
    friendInfo: {
      PK_userGuid: "af0b4dc0-f71c-11ea-8d33-734a3583358f",
      nickname: "萤火之森",
      userheadimg:
        "http://thirdqq.qlogo.cn/g?b=oidb&k=icCoFibWNBqaWzpicoQEYkZlg&s=40&t=1595259755"
    },
    socure: {}
  },
  mutations: {
    SET_ISLOGIN(state, info) {
      state.islogin = info;
    },
    SET_FRIENDISLOGIN(state, info) {//如果请求成功，info传过来=true
      state.friendIslogin = info;
    },
    SET_FRIENDUSERINFO(state, info) {
      state.friendInfo = {
        PK_userGuid: info.PK_userGuid,
        nickname: info.nickname,
        userheadimg: info.userheadimg
      };
    },
    SET_SCOURE(state, info) {
      state.socure = info;
    },
    SET_USERINFO(state, info) {
      state.userinfo = {
        PK_userGuid: info.PK_userGuid,
        username: info.username,
        userheadimg: info.userheadimg,
        useraccount: info.useraccount
      };
    }
  },
  // plugins: [vuexLocal.plugin]
});
