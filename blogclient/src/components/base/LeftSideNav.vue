<template>
  <div class="left-side-nav" :style="[{ height: CHeight + 'px' }]">
    <!-- 点击了x，侧边栏消失 -->
    <i @click="headleNavState()" class="iconfont icon-jianqu nav-close-btn"></i>
    <div class="left-side-nav-cover">
      <div class="left-side-nav-user"></div>
      <div class="blog-name-username">Thezero</div>
      <div class="blog-motto">点点星光</div>
    </div>
    <div class="menu-list">
      <router-link tag="div" to="/" class="muen-item">首页</router-link>
      <router-link tag="div" to="/classifiednotes" class="muen-item"
        >分类笔记</router-link
      >
      <router-link tag="div" to="/personalproject" class="muen-item"
        >博主项目</router-link
      >
      <router-link tag="div" to="/photoshare" class="muen-item"
        >图片分享</router-link
      >
      <router-link tag="div" to="/linkfirends" class="muen-item"
        >隔壁村子</router-link
      >
      <router-link tag="div" to="/messageboard" class="muen-item"
        >留言板</router-link
      >
      <router-link tag="div" to="/fragmentlanguage" class="muen-item"
        >碎语</router-link
      >
      <router-link tag="div" to="/aboutme" class="muen-item"
        >关于博主</router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "left-side-nav",
  props: {
    CHeight: {
      type: Number,
      default: 0
    }
  },
  methods: {
    headleNavState () {
      this.$emit("headleNavState");
    }
  },
  mounted () {
    document.documentElement.style.overflowY = "hidden"; //禁止屏幕滚动
  },
  beforeDestroy () {
    document.documentElement.style.overflowY = "scroll"; //屏幕可滚动
  }
};
</script>
<style lang="scss" scoped>
  .left-side-nav {
    position: fixed;
    top: 0;
    width: 300px;
    z-index: 99;
    background-color: rgb(29, 40, 42);
    .left-side-nav-cover {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-top: 40px;
      height: 215px;
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url("./../../../static/images/nav1.jpg");
      background-position: center;
      .left-side-nav-user {
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
        color: #fff;
        cursor: pointer;
      }
      .blog-motto {
        margin-top: 10px;
        font-size: 14px;
        color: #fff;
      }
    }
    .menu-list {
      .muen-item {
        margin-bottom: 20px;
        height: 35px;
        width: 100%;
        color: #fff;
        padding: 0 20px;
        line-height: 35px;
        background-color: #696969;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.5s;
        border-radius: 2px;
        &:hover {
          transform: translate(10px, -4px);
        }
      }
    }
    .nav-close-btn {
      position: absolute;
      top: 5px;
      right: 10px;
      padding: 10px;
      font-size: 30px;
      cursor: pointer;
    }
  }
</style>
