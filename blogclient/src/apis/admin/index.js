//主页api
import req from "../axios";
// let serverurl = process.env.BASE_URL;
//登录
export const LOGIN = params => req("post", "admin/login", params);
//获取文章列表分页
export const GETPAGEARTICLES = params =>
  req("post", "admin/getpagearticle", params);
//添加图片
export const CREATEPHOTO = params => req("post", "admin/createphoto", params);
//获取项目
export const GETPHOTOS = params => req("post", "admin/getphotos", params);
//修改图片
export const CHANGEPHOTO = params => req("post", "admin/changephoto", params);
//删除图片
export const DELETEPHOTO = params => req("post", "admin/deletephoto", params);
//创建项目
export const CREATEPROJECT = params =>
  req("post", "admin/createproject", params);
//修改项目状态
export const SETPROJECTSTATUS = params =>
  req("post", "admin/setprojectstatus", params);
//修改项目
export const CHANGEPROJECT = params =>
  req("post", "admin/changeproject", params);
//删除项目
export const DELETEPROJECT = params =>
  req("post", "admin/deleteproject", params);
//获取项目
export const GETPROJECTS = params => req("post", "admin/getprojects", params);

//获取友链
export const GETLINKFRIENDS = params =>
  req("post", "admin/getlinkfriends", params);
//修改友链
export const CHANGELINKFRIEND = params =>
  req("post", "admin/changelinkfriend", params);
//修改友链状态
export const SETLINKFRIENDSTATUS = params =>
  req("post", "admin/setlinkfriendstatus", params);
//删除友链
export const DELETELINKFRIEND = params =>
  req("post", "admin/deletelinkfriend", params);

//获取栏目
export const GETCOLUMNS = params => req("post", "admin/getcolumns", params);
//创建栏目
export const CREATECOLUMN = params => req("post", "admin/createcolumn", params);
//修改栏目
export const CHANGECOLUMN = params => req("post", "admin/changecolumn", params);
//修改栏目状态
export const SETCOLUMNSTATUS = params =>
  req("post", "admin/setcolumnstatus", params);
//删除栏目
export const DELETECOLUMN = params => req("post", "admin/deletecolumn", params);

//发布文章
export const CREATEARTICLE = params =>
  req("post", "admin/createarticle", params);
//删除文章
export const DELETEARTICLE = params =>
  req("post", "admin/deletearticle", params);
//修改文章状态
export const SETARTICLESTATUS = params =>
  req("post", "admin/setarticlestatus", params);
