import axios from "axios";
import store from "@/store/index";
import router from "./../router";
import { Message } from "element-ui";
const errorHandler = errMessage => {
  Message.warning(errMessage);
};

var instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 600000
});
// defaults是axios的默认配置项
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
//请求拦截器
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    //对请求错误做些什么
    return Promise.reject(error);
  }
);
//响应拦截器
instance.interceptors.response.use(
  function (response) {
    if (response.data.status === 403) {
      store.commit("SET_USERINFO", {
        PK_userGuid: "",
        username: "",
        userheadimg: "",
        useraccount: ""
      });
      store.commit("SET_ISLOGIN", false);
      router.push("/login");
    }
    if (response.data.status === 401) {
      store.commit("SET_FRIENDUSERINFO", {
        PK_userGuid: "",
        nickname: "",
        userheadimg: ""
      });
      store.commit("SET_FRIENDISLOGIN", false);
      errorHandler(response.msg);
    }
    return response.data;
  },
  function (error) {
    //对响应错误做点什么
    return Promise.reject(error);
  }
);
export default function (method, url, data = "", config = "") {
  method = method.toLowerCase();
  if (method === "post") {
    if (config != "") {
      return instance.post(url, data, config);
    } else {
      return instance.post(url, data);
    }
  } else if (method === "get") {
    return instance.get(url, { params: data });
  } else if (method === "delete") {
    return instance.delete(url, { params: data });
  } else if (method === "put") {
    return instance.put(url, data);
  } else {
    console.error("未知的method" + method);
    return false;
  }
}
