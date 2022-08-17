<template>
  <div class="about-me">
    <HomeTemplate :templateTitle="templateTitle" :banner="banner">
      <div class="userinfo">
        <div class="left-side-nav-user"></div>
        <div class="blog-name-username">Thezero</div>
        <div class="blog-motto">点点星光</div>
      </div>
      <el-divider content-position="left">基本信息</el-divider>
      <el-timeline>
        <el-timeline-item
          :hide-timestamp="true"
          placement="top"
          v-for="(author, index) in authorList"
          :key="index"
        >
          <el-card>
            <h4>{{ author }}</h4>
          </el-card>
        </el-timeline-item>
        <!-- <el-timeline-item :hide-timestamp="true" placement="top">
          <el-card>
            <h4>工作邮箱：Yonghu520@outlook.com</h4>
          </el-card>
        </el-timeline-item> -->
      </el-timeline>
    </HomeTemplate>
  </div>
</template>
<script>
import HomeTemplate from "@/components/template";
export default {
  name: "about-me",
  components: { HomeTemplate },
  data () {
    return {
      templateTitle: "关于博主",
      banner: require("@/../static/images/bg_min.jpg"),
      authorList: [
        'Thezero/男',
        '工作邮箱：Yonghu520@outlook.com',
        '个人博客：https://blog.xkongkeji.com/',
        'QQ:1846930039(注明来自博客)',
        '职业专长：web全栈',
        '无博客框架手敲个人博客（新手菜鸟一枚）',
      ]
    };
  },
};
</script>
<style lang="scss" scoped>
  .about-me {
    width: 100%;
    .userinfo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      margin: 10px 0;
      .left-side-nav-user {
        //博主头像
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url("./../../../static/images/logo.jpeg");
        background-position: center;
        border: 3px solid #fff;
        transition: all 1s;
        cursor: pointer;
        &:hover {
          transform: rotate(-45deg);
        }
      }
      .blog-name-username {
        margin-top: 20px;
        font-size: 16px;
        color: #333;
        cursor: pointer;
      }
      .blog-motto {
        margin-top: 10px;
        font-size: 14px;
        color: #333;
      }
    }
  }
</style>
