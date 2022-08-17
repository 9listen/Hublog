<template>
  <div class="fragment-wrapper">
    <!-- 通过插槽插进HomeTemplate的固定位置 -->
    <HomeTemplate :templateTitle="templateTitle" :banner="banner">
      <div class="fragment-box" v-for="item in fragmentList" :key="item.id">
        <div class="userinfo">
          <div
            class="left-side-nav-user"
            :style="{ 'background-image': `url(${item.cover})` }"
          ></div>
          <div class="fragment-info">
            <div class="fragment-name-info">
              <div class="blog-name-username">{{ item.username }}</div>
              <div class="fragment-time">{{ item.date }}个月前</div>
            </div>
            <div class="fragment-master">博主</div>
          </div>
        </div>
        <!-- 写入的文字 -->
        <div class="fragment-message">{{ item.message }}</div>
        <div class="fragment-like">
          <span> {{ item.like }}个喜欢</span>
          <span>·</span>
          <span> {{ item.browsenum }}个评论</span>
        </div>
        <!-- 图标 -->
        <div class="fragment-btn">
          <div class="fragment-btn1">
            <i class="iconfont-new icon-aixin_shixin"></i>
            <span>喜欢</span>
          </div>
          <div class="fragment-btn2">
            <i class="iconfont-new icon-pinglun"></i>
            <span>评论</span>
          </div>
        </div>
      </div>
      <!-- 底部分页器 -->
      <div v-if="fragmentTotal > 5" class="blog-paging">
        <el-pagination
          layout="prev, pager, next"
          :page-size="5"
          @current-change="changePage"
          :total="fragmentTotal"
        >
        </el-pagination>
      </div>
    </HomeTemplate>
  </div>
</template>

<script>
import { GETFRAGMENT } from '@/apis/client/index';
import HomeTemplate from '@/components/template';
export default {
  name: 'FragmentLanguage',
  components: { HomeTemplate },
  data () {
    return {
      templateTitle: '碎语',
      banner: require('@/..//static/images/nav.jpg'),
      fragmentList: [], 
      fragmentTotal: 0,
    } 
  },
  methods: {
    async changePage (index) {//change函数调用，里面是一个请求GET...()，等待接口返回数据
      await GETFRAGMENT({ page: index - 1, limit: 8 }).then(res => {
        if (res.status === 200) {
          this.fragmentList = res.data.row;
          this.fragmentTotal = res.data.count;

        }
      });
    },
  },
  mounted () {
    GETFRAGMENT().then(res => {
      console.log('🔥log=>FragmentLanguage=>62:res:%o', res)
      if (res.status === 200) {
        this.fragmentList = res.data.row;
        this.fragmentTotal = res.data.count;
      }
    })
  }
}
</script>

<style lang='scss' scoped>
  .fragment-wrapper {
    width: 100%;
    .fragment-box {
      width: 100%;
      padding: 10px 30px;
      box-shadow: 0 0 4px #ccc;
      margin-top: 20px;
      // 博主头像信息
      .userinfo {
        display: flex;
        justify-content: left;
        align-items: center;
        width: 100%;
        margin: 10px 0;
        .left-side-nav-user {
          //博主头像
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-size: cover;
          background-repeat: no-repeat;
          // background-image: url("./../../../static/images/logo.jpeg");
          background-position: center;
          border: 3px solid #fff;
          transition: all 1s;
          cursor: pointer;
          &:hover {
            transform: rotate(-45deg);
          }
        }
        .fragment-info {
          .fragment-name-info {
            display: flex;
            align-items: center;
            margin-left: 5px;
            .blog-name-username {
              font-size: 14px;
              font-weight: bold;
              padding-right: 10px;
              color: #333;
              cursor: pointer;
              margin: 5px auto;
            }
            .fragment-time {
              color: #777;
            }
          }
          .fragment-master {
            margin-left: 5px;
            color: #777;
          }
        }
      }
      // 发布的碎语
      .fragment-message {
        margin-top: 20px;
        font-size: 14px;
      }
      // 几个喜欢评论
      .fragment-like {
        display: flex;
        font-size: 14px;
        margin-top: 25px;
        justify-content: flex-start;
        align-items: center;
        color: #777;
      }
      // 喜欢图标
      .fragment-btn {
        display: flex;
        margin-top: 15px;
        justify-content: flex-end;
        align-items: center;
        font-size: 16px;
        color: #777;
        .fragment-btn1,
        .fragment-btn2 {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-left: 20px;
          letter-spacing: 2px;
          cursor: pointer;
          i {
            font-size: 20px;
            margin-right: 10px;
          }
        }
      }
    }
    // 分页器
    .blog-paging {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      overflow: hidden;
      margin-top: 30px;
    }
  }
</style>
