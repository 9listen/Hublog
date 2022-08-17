//主页api
import req from "../axios";
// let serverurl = process.env.BASE_URL;
//上传文件
export const UPLOADFILE = (params, config) =>
  req("post", "common/uploadfile", params, config);
//申请友链
export const CREATELINKFRIEND = params =>
  req("post", "client/createlinkfriend", params);
//获取友链
export const GETTELINKFRIENDS = params =>
  req("post", "client/getlinkfriends", params);
//获取文章列表分页
export const GETPAGEARTICLES = params => req("post", "client/getpagearticle", params);
//浏览量增加
export const ADDVIEWS = params => req("post", "client/addviews", params);
//获取项目
export const GETPROJECTS = params => req("post", "client/getprojects", params);
//留言
export const LEAVINGMSG = params => req("post", "client/leavingmsg", params);
//获取留言
export const GETMSGS = params => req("post", "client/getmsgs", params);
//获取重定向qq链接
export const GETQQLOGIN = params => req("post", "client/getqqlogin", params);
//检查朋友是否登录
export const FRIENDLOGIN = params => req("post", "client/friendlogin", params);
//朋友退出登录
export const FRIENDEXIT = params => req("post", "client/friendexit", params);
// 获取碎语
export const GETFRAGMENT = params => req("post", "client/getFragment", params); 
