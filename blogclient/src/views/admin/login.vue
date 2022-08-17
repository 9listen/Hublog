<template>
  <div class="login">
    <div class="bg"></div>
    <div class="drog"></div>
    <div class="content">
      <div class="header">
        <div class="title">萤火之森管理端</div>
        <div class="logintext">SIGN IN</div>
      </div>
      <div class="bodyer">
        <input
          v-model="account"
          placeholder="账户"
          class="account"
          type="text"
          v-focus
          v-on:keyup.enter="login()"
        />
        <input
          v-model="password"
          placeholder="密码"
          class="password"
          type="password"
          v-on:keyup.enter="login()"
        />
        <el-button
          class="loginbtn"
          type="success"
          v-on:keyup.enter="login()"
          @click="login()"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { LOGIN } from "@/apis/admin/index.js";
const BASE_URL = "api/";
export default {
  name: "login",
  data () {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    login () {
      if (this.account === "" || this.password === "") {
        this.$message.error("账号密码不能为空");
        return;
      }
      // if (/[\u4e00-\u9fa5\d]/.test(this.account)) {
      //   this.$message.error('不能输入中文')
      //   return
      // }
      LOGIN({
        account: this.account,
        password: this.password
      }).then(res => {
        if (res.status === 200) {
          this.$store.commit("SET_USERINFO", {
            PK_userGuid: res.data.PK_userGuid,
            username: res.data.username,
            userheadimg: BASE_URL + res.data.userheadimg,
            useraccount: res.data.useraccount
          });
          this.$store.commit("SET_ISLOGIN", true);
          this.$router.push({
            path: "/admin"
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    }
  }
};
</script>
<style>
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -2;
    background-image: url("./../../assets/bg.jpg");
  }
  .drog {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .content {
    margin: 0 auto;
    width: 40%;
    padding: 20px;
    min-width: 800px;
    margin-top: 20vh;
    /* background-color: #fff; */
  }
  .content .header {
    text-align: center;
  }
  .content .bodyer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content .bodyer input::-webkit-input-placeholder {
    /* WebKit browsers 适配谷歌 */
    color: #f4f4f4;
  }
  .content .bodyer .account {
    -webkit-appearance: none;
    background-image: none;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    line-height: 1;
    outline: none;
    padding: 0 15px;
    margin: 15px 0;
    width: 300px;
    height: 40px;
    border: none;
    color: #fff;
    font-weight: 700;
    background-color: rgba(255, 255, 255, 0.4);
  }
  .content .bodyer .password {
    -webkit-appearance: none;
    background-image: none;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    line-height: 1;
    outline: none;
    padding: 0 15px;
    margin: 15px 0;
    width: 300px;
    height: 40px;
    border: none;
    color: #fff;
    font-weight: 700;
    background-color: rgba(255, 255, 255, 0.4);
  }
  .content .bodyer .loginbtn {
    margin-top: 40px;
    width: 300px;
    font-weight: 700;
    margin: 15px 0;
  }
  .content .header .title {
    font-size: 30px;
    font-weight: 600;
    color: #ddd;
    letter-spacing: 8px;
  }
  .content .header .logintext {
    color: #3cb371;
    font-size: 18px;
    margin-top: 20px;
  }
</style>
