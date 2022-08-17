<template>
  <div ref="linkFirends" class="link-firends">
    <HomeTemplate :templateTitle="templateTitle" :banner="banner">
      <div class="link-tooltip">
        <p>申请链接前请先添加本站链接</p>
        <p>申请格式：站点名称、地址、描述和一张Logo</p>
        <p>本站信息</p>
        <p>名称：萤火之森</p>
        <p>地址：https://blog.xkongkeji.com/</p>
        <p></p>
        <p></p>
        <p>简介：我已经等不到夏天了。就算拨开人群，也想去见你。</p>
        <p style="word-break: break-all">
          图标：https://blog.xkongkeji.com/static/images/favicon.png
        </p>
      </div>
      <div class="link-apply">
        <!-- 组件点击打开对话框 -->
        <el-dialog
          title="申请友链"
          :visible.sync="dialogVisible"
          :fullscreen="isFullscreen"
          width="60%"
          top="8vh"
          :before-close="handleClose"
        >
          <div class="apply-item">
            <div class="blog-name">村子名称</div>
            <el-input v-model="blogName"> </el-input>
          </div>
          <div class="apply-item">
            <div class="blog-name">村子描述</div>
            <el-input v-model="blogDescription"> </el-input>
          </div>
          <div class="apply-item">
            <div class="blog-url">村子链接</div>
            <el-input v-model="blogUrl"> </el-input>
          </div>
          <div class="apply-item">
            <div class="blog-logo">村子logo</div>
            <el-input v-model="blogLogo"> </el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="applyLinkFriend()"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <!-- 申请友链 -->
        <div class="apply-item">
          <div @click="applyLinkFriendBox()" class="apply-btn">申请友链</div>
        </div>
      </div>
      <!-- 暂无 -->
      <div class="link-otherlist">
        <a
          class="link-other"
          :href="item.url"
          target="_blank"
          v-for="item in linkFirends"
          :key="item.PK_linkfriendGuid"
        >
          <img class="blog-other-logo" v-lazy="item.logo" alt="avatar" />
          <div class="blog-other-info">
            <div class="blog-other-name">{{ item.name }}</div>
            <div class="blog-other-decription">{{ item.description }}</div>
          </div>
        </a>
      </div>
    </HomeTemplate>
  </div>
</template>
<script>
import { CREATELINKFRIEND, GETTELINKFRIENDS } from "@/apis/client/index";
import HomeTemplate from "@/components/template";
export default {
  name: "link-firends",
  components: {
    HomeTemplate
  },
  data () {
    return {
      templateTitle: "隔壁村子",
      banner: require("@/..//static/images/bg10_min.jpg"),
      blogName: "",
      blogUrl: "",
      blogDescription: "",
      blogLogo: "",
      linkFirends: [],
      dialogVisible: false,
      isFullscreen: false
    };
  },
  methods: {
    getIsFullscreen () {
      return this.$refs.linkFirends.clientWidth < 600 ? true : false;
    },
    // 申请友链时候的四个问题的校验
    applyLinkFriend () {
      if (this.blogName === "") {
        this.$message({//？
          duration: 1500,
          type: "error",
          message: "告诉我一下你的村子名称"
        });
        return;
      }
      if (this.blogUrl === "") {
        this.$message({
          duration: 1500,
          type: "error",
          message: "我要怎么去你的村子"
        });
        return;
      }
      if (this.blogDescription === "") {
        this.$message({
          duration: 1500,
          type: "error",
          message: "介绍一下你的村子"
        });
        return;
      }
      if (this.blogLogo === "") {
        this.$message({
          duration: 1500,
          type: "error",
          message: "村子图标"
        });
        return;
      }
      CREATELINKFRIEND({
        name: this.blogName,
        url: this.blogUrl,
        description: this.blogDescription,
        logo: this.blogLogo
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            duration: 1500,
            type: "success",
            message: res.msg
          });
          this.blogUrl = "";
          this.blogName = "";
          this.blogLogo = "";
          this.blogDescription = "";
          this.dialogVisible = false;
        } else {
          this.$message({
            duration: 1500,
            type: "error",
            message: res.msg
          });
        }
      });
    },
    applyLinkFriendBox () {//对话框占屏幕比以及对话框显示
      this.isFullscreen = this.getIsFullscreen();
      this.dialogVisible = true;
    },
    handleClose () {//饿了么的关闭前的回调
      this.blogUrl = "";
      this.blogName = "";
      this.blogLogo = "";
      this.blogDescription = "";
      this.dialogVisible = false;
    }
  },
  async mounted () {
    const linkFirendsData = await GETTELINKFRIENDS();
    if (linkFirendsData.status === 200) {
      this.linkFirends = linkFirendsData.data.rows;
    }
  }
};
</script>
<style lang="scss" scoped>
  .link-firends {
    width: 100%;
    .link-tooltip {
      padding: 20px 0;
      width: 100%;
      font-size: 16px;
      line-height: 24px;
      color: #333;
    }
    .link-apply {
      width: 100%;
      margin: 10px 0;
      /deep/ .apply-item {
        padding: 10px 0;
        font-size: 16px;
        color: #333;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        margin-bottom: 10px;
        line-height: 40px;
        .apply-btn {
          padding: 0 8px;
          font-size: 14px;
          border-radius: 4px;
          background-color: #3cb371;
          color: #fff;
          cursor: pointer;
        }
        .blog-name {
          width: 100px;
          margin-right: 10px;
          color: #666;
        }
        .blog-url {
          width: 100px;
          margin-right: 10px;
          color: #666;
        }
        .blog-logo {
          width: 100px;
          margin-right: 10px;
          color: #666;
        }
      }
    }
    .link-otherlist {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-top: 15px;
      .link-other {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 15px;
        width: 23%;
        min-width: 130px;
        margin-bottom: calc(8% / 3);
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
          box-shadow: 0 0 4px #ccc;
          transform: scale(1.1, 1.1);
        }
        &:not(:nth-child(4n)) {
          margin-right: calc(8% / 3);
        }
        .blog-other-logo {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .blog-other-info {
          width: 100%;
          text-align: center;
          .blog-other-name {
            color: #333;
            font-size: 20px;
            margin-bottom: 10px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .blog-other-decription {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
  }
</style>
