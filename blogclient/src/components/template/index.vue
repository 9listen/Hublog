<template>
  <div ref="homeTemplate" class="home-template">
    <transition name="slide-fade">
      <!-- 侧边栏+menu -->
      <LeftSideNav
        v-if="blogNavState"
        :CHeight="CHeight"
        @headleNavState="headleNavState()"
      />
    </transition>
    <div
      v-if="!blogNavState"
      @click="headleNavState()"
      :class="['blog-menu', { 'blog-menu-fold': menuState }]"
    >
      <i class="iconfont icon-zhedie1 blog-title"></i>
      <span v-if="!menuState">MENU</span>
    </div>
    <!-- AboutMe.vue...关于博主等页面使用的顶部图片 -->
    <div
      class="link-banner"
      :style="{ backgroundImage: `url(${banner})` }"
    ></div>
    <!-- 内容区 -->
    <div class="link-content">
      <div class="link-title">{{ templateTitle }}</div>
      <slot></slot>
    </div>
    <BlogFooter />
    <transition name="slide-fade">
      <div v-if="menuState" @click="headleBackTop()" class="blog-top">
        <i class="iconfont icon-top top"></i>
      </div>
    </transition>
  </div>
</template>
<script>
import BlogFooter from '@/components/base/BlogFooter'
import LeftSideNav from '@/components/base/LeftSideNav'
export default {
  name: 'home-template',
  props: {//AboutMe,ClassifiedNotes等几个路由页面都是父组件
    templateTitle: {
      type: String,
      default: '',
    },
    banner: {
      type: String,
      default: require('./../../../static/images/bg12.jpg'),
    },
  },
  components: { LeftSideNav, BlogFooter },
  data () {
    return {
      blogNavState: false,
      menuState: false,
      CHeight: 0,
    }
  },
  // 内容和homePage差不多
  methods: {
    headleNavState () {//图标x触发该事件，侧边栏打开关闭
      this.blogNavState = !this.blogNavState
    },
    headleBackTop () {
      this.$refs.homeTemplate.scrollIntoView({ behavior: 'smooth' })
    },
    handleScroll (e) {
      if (e.target.documentElement.scrollTop > this.CHeight / 2) {
        this.menuState = true
      } else {
        this.menuState = false
      }
    },
  },
  mounted () {
    this.CHeight =
      document.documentElement.clientHeight || document.body.clientHeight
    this.$refs.homeTemplate.scrollIntoView({ behavior: 'auto' })
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll, true)
  },
}
</script>
<style lang="scss" scoped>
  // 关于博主等路由组件
  .home-template {
    width: 100%;
    overflow: hidden;
    .blog-menu {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 20px;
      left: 40px;
      border: 1px solid #fff;
      border-radius: 5px;
      color: #fff;
      box-shadow: 0 0 4px #ccc;
      cursor: pointer;
      padding: 6px 14px;
      z-index: 99;
      transition: all 1s;
      .blog-title {
        margin-right: 5px;
      }
    }
    .blog-menu-fold {
      padding: 6px;
      left: 0;
      background-color: #333;
    }
    .link-banner {
      width: 100%;
      height: 200px;
      transition: all 1s;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      animation: enterfromup 1s 0.5s ease-in-out;
      animation-iteration-count: 1; //定义动画播放次数
      animation-fill-mode: forwards; //动画不播放时候的样式
    }
    .blog-top {
      position: fixed;
      bottom: 30px;
      right: 10px;
      text-align: center;
      border-radius: 50%;
      cursor: pointer;
      padding: 10px;
      .top {
        color: #666;
        font-size: 20px;
      }
    }
    .link-content {
      margin: 0 auto;
      width: 100%;
      max-width: 1100px;
      min-width: 300px;
      min-height: 500px;
      padding: 0 8px;
      .link-title {
        width: 100%;
        color: #666;
        font-size: 30px;
      }
    }
  }
  // 底部星星+箭头
  @keyframes enterfromup {
    0% {
      height: 200px;
    }
    100% {
      height: 500px;
    }
  }
  @keyframes updownstar {
    0% {
      color: yellow;
    }
    50% {
      color: #ffc0cb;
    }
    100% {
      color: #00fa9a;
    }
  }
  // 侧边栏动画过度
  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }
</style>
