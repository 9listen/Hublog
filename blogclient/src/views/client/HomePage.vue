<template>
  <div ref="homePage" :class="['home-page']">
    <transition name="slide-fade">
      <LeftSideNav
        v-if="blogNavState"
        :CHeight="CHeight"
        @headleNavState="headleNavState()"
      />
    </transition>
    <!-- MENU -->
    <!-- methods定义：滚动高度>页面高度1/4时，menuState=true -->
    <div
      v-if="!blogNavState"
      @click="headleNavState()"
      :class="['blog-menu', { 'blog-menu-fold': menuState }]"
    >
      <i class="iconfont icon-zhedie1 blog-title"></i>
      <span v-if="!menuState">MENU</span>
    </div>
    <!--萤火之森  -->
    <div
      :class="['home-cover', { fade: blogNavState }]"
      :style="[{ height: CHeight + 'px' }]"
    >
      <!-- @/utils/mouse.js里面设置 -->
      <canvas :height="CHeight" :width="CWidth" id="star"></canvas>
      <div class="blog-content">
        <div class="blog-title">萤火之森</div>
        <div class="blog-descripe">{{ Line }}</div>
        <!-- <div class="blog-btn"></div> -->
      </div>
      <div class="blog-go">
        <i @click="headleClickGo()" class="iconfont icon-xiangxia icon"></i>
      </div>
    </div>
    <!-- 留言部分 -->
    <div ref="blogWraper" class="blog-wraper">
      <div
        v-for="item in articleList"
        :key="item.PK_articleGuid"
        @click="getArticleDetail(item)"
        class="blog-article"
      >
        <div class="article-title">
          <div>{{ item.title }}</div>
          <!-- <div class="article-top">置顶</div> -->
        </div>
        <div class="article-label-info">
          <div class="article-label">
            <i class="iconfont icon-biaoqian1"></i>
            <span v-for="tag in item.labellist" :key="tag.key" class="label">{{
              tag.key
            }}</span>
          </div>
          <div class="article-time">
            <i class="iconfont icon-shijian"></i>
            <!-- 过滤器 item.lasttime是参数，传给timeFitter，然后返回值替换掉{{ item.lasttime | timeFitter }} -->
            <span class="time">{{ item.lasttime | timeFitter }}</span>
          </div>
          <!-- <div class="article-comment">
            <i class="iconfont icon-taolun"></i>
            <span class="comment">{{ item.browsenum }}</span>
          </div> -->
          <div class="article-readnum">
            <i class="iconfont icon-liulanliang"></i>
            <span class="readnum">{{ item.browsenum }}</span>
          </div>
        </div>
        <!-- 用户留言 -->
        <div class="article-content">
          <div v-if="item.imagecover !== ''" class="article-content-cover">
            <img
              class="article-content-cover-img"
              v-lazy="BASE_URL + item.imagecover"
              alt="cover"
            />
          </div>
          <span class="article-content-descript">{{ item.description }}</span>
        </div>
        <div class="article-footer"></div>
      </div>
    </div>
    <!-- 分页器 -->
    <div v-if="articleTotal > 5" class="blog-paging">
      <el-pagination
        layout="prev, pager, next"
        :page-size="8"
        @current-change="changePage"
        :total="articleTotal"
      >
      </el-pagination>
    </div>
    <BlogFooter />
    <!-- 备案号后面的向上箭头 -->
    <transition name="slide-fade">
      <div v-if="menuState" @click="headleBackTop()" class="blog-top">
        <i class="iconfont icon-top top"></i>
      </div>
    </transition>
  </div>
</template>
<script>
const BASE_URL = "api/";
import { GETPAGEARTICLES, ADDVIEWS } from "@/apis/client/index";
import mouseLoading from "@/utils/mouse.js";
import BlogFooter from "@/components/base/BlogFooter";
import LeftSideNav from "@/components/base/LeftSideNav";
export default {
  name: "home-page",
  data () {
    return {
      BASE_URL: BASE_URL,
      CHeight: 0,
      CWidth: 0,
      blogNavState: false,
      menuState: false,
      articleList: [],
      articleTotal: 0
    };
  },
  components: {
    LeftSideNav,
    BlogFooter
  },
  computed: {
    Line () {
      let Lines = ["我已经等不到夏天了。就算拨开人群，也想去见你。", "一起长大的约定。", "小时候的梦我知道", "不要让萤火虫带着你逃跑"];
      return Lines[parseInt(Math.random() * 4)];
    }
  },
  methods: {
    async changePage (index) {//change函数调用，里面是一个请求GETPAGEARTICLES()，等待接口返回数据
      await GETPAGEARTICLES({ page: index - 1, limit: 8 }).then(res => {
        if (res.status === 200) {
          this.articleList = res.data.rows;
          this.articleTotal = res.data.count;
        }
        this.headleClickGo();
      });
    },
    headleClickGo () {
      this.$refs.blogWraper.scrollIntoView({ behavior: "smooth" });
    },
    headleNavState () {//控制侧边栏可见与否
      this.blogNavState = !this.blogNavState;
    },
    headleBackTop () {//平滑滚动到可视区
      this.$refs.homePage.scrollIntoView({ behavior: "smooth" });
    },
    handleScroll (e) {
      if (e.target.documentElement.scrollTop > this.CHeight / 4) {
        this.menuState = true;
      } else {
        this.menuState = false;
      }
    },
    async getArticleDetail (item) {//？
      await ADDVIEWS({ PK_articleGuid: item.PK_articleGuid });
      this.$router.push({
        name: "articleDetail",
        params: { articleInfo: item }
      });
    }
  },
  mounted () {
    window.addEventListener("scroll", this.handleScroll, true);
    this.$refs.homePage.scrollIntoView({ behavior: "auto" });
    this.CHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    this.CWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    //启用萤火
    mouseLoading("star", this.CWidth, this.CHeight);
    //一挂载数据就请求一次
    GETPAGEARTICLES({
      page: 0,
      limit: 8
    }).then(res => {
      if (res.status === 200) {
        console.log(res.data)
        this.articleList = res.data.rows;
        this.articleTotal = res.data.count;
      }
    });
  },
  beforeDestroy () {
    window.removeEventListener("scroll", this.handleScroll, true);
  }
};
</script>
<style lang="scss" scoped>
  .fade {
    filter: brightness(65%);
  }
  .home-page {
    width: 100%;
    background-color: #fff;
    overflow-x: hidden;
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
    .home-cover {
      position: relative;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("./../../../static/images/cover1_min.jpg");
      .blog-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        .blog-title {
          font-size: 45px;
          color: #fff;
          font-weight: 700;
          margin-bottom: 20px;
        }
        .blog-descripe {
          font-size: 22px;
          color: #fff;
        }
      }
      .blog-go {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        cursor: pointer;
        animation: updown 1s 0.5s ease-in-out infinite alternate;
        .icon {
          font-size: 80px !important;
          color: #fff;
        }
      }
    }
    .blog-wraper {
      width: 100%;
      max-width: 1100px;
      min-width: 300px;
      margin: 30px auto 0 auto;
      padding: 30px;
      .blog-article {
        width: 100%;
        padding: 20px;
        transition: all 0.5s;
        margin-bottom: 15px;
        .article-title {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          font-size: 20px;
          color: #333;
          cursor: pointer;
          .article-top {
            margin-left: 20px;
            background-color: red;
            color: #fff;
            font-size: 12px;
            padding: 4px 6px;
            border-radius: 4px;
          }
        }
        .article-label-info {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
          font-size: 14px;
          color: #666;
          line-height: 30px;
          .article-label {
            display: flex;
            align-items: center;
            margin-right: 20px;
            .label {
              margin-left: 8px;
            }
          }
          .article-readnum {
            margin-right: 20px;
            display: flex;
            align-items: center;
            .readnum {
              margin-left: 4px;
            }
          }
          .article-comment {
            margin-right: 20px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .comment {
              margin-left: 4px;
            }
          }
          .article-time {
            margin-right: 20px;
          }
        }
        .article-content {
          display: flex;
          flex-direction: column;
          margin-top: 10px;
          cursor: pointer;
          width: 100%;
          .article-content-descript {
            margin-top: 20px;
            font-size: 14px;
            color: #333;
            line-height: 20px;
            letter-spacing: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            text-indent: 2em;
            -webkit-box-orient: vertical;
          }
          .article-content-cover {
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.5s;
            height: 280px;
            width: 100%;
            overflow: hidden;
            border-radius: 4px;
            .article-content-cover-img {
              height: 280px;
              width: auto;
            }
          }
        }
        .article-footer {
          margin-top: 10px;
          display: flex;
          align-items: center;
          height: 30px;
          width: 100%;
          line-height: 30px;
        }
        &:hover {
          box-shadow: 0 0 4px #ccc;
        }
      }
    }
    .blog-paging {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      overflow: hidden;
    }
    .blog-footer {
      margin-top: 40px;
      font-size: 12px;
      padding: 20px 0;
      background-color: #232323;
      color: #888;
      line-height: 25px;
      text-align: center;
      .foot-start {
        color: yellow;
        font-size: 20px;
        transition: all 0.5s;
        animation: updownstar 1s 0.5s ease-in-out infinite alternate;
      }
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
  @keyframes updown {
    0% {
      bottom: 15px;
    }
    100% {
      bottom: -15px;
    }
  }
  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1); //速度曲线
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }
</style>
