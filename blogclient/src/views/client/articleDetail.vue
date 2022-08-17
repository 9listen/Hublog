<template>
  <div ref="articleDetail" class="article-detail">
    <i @click="goBack()" class="iconfont icon-NMStubiao- article-back"></i>
    <div class="article-title">{{ articleInfo.title }}</div>
    <div class="article-info">
      <div class="article-label">
        <i class="iconfont icon-biaoqian1"></i>
        <span
          v-for="tag in articleInfo.labellist"
          :key="tag.key"
          class="label"
          >{{ tag.key }}</span
        >
      </div>
      <div class="article-time">
        <i class="iconfont icon-shijian"></i>
        <span class="time">{{ articleInfo.lasttime | timeFitter }}</span>
      </div>
      <div class="article-readnum">
        <i class="iconfont icon-liulanliang"></i>
        <span class="readnum">{{ articleInfo.browsenum }}</span>
      </div>
    </div>
    <div class="article-content">
      <div
        class="article-content-markdown markdown-body"
        v-html="articleInfo.articleContentHtml"
      ></div>
    </div>
    <div v-if="articleInfo.PK_articleGuid" class="message-box">
      <messageBox
        :belongInfo="articleInfo"
        :belongtoGuid="articleInfo.PK_articleGuid"
      />
    </div>
  </div>
</template>

<script>
import messageBox from "@/components/messageBox";
export default {
  name: "article-detail",
  components: { messageBox },
  data () {
    return {
      articleInfo: {}
    };
  },
  methods: {
    goBack () {
      this.$router.go(-1);
    }
  },
  mounted () {
    this.$refs.articleDetail.scrollIntoView({ behavior: "auto" });
    if (!this.$route.params.articleInfo) {
      this.$router.push({
        path: "/"
      });
    } else {
      this.articleInfo = this.$route.params.articleInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
  .article-detail {
    width: 100%;
    max-width: 1100px;
    min-width: 300px;
    margin: 50px auto;
    padding: 10px;
    .article-back {
      position: fixed;
      top: 20px;
      left: 20px;
      font-size: 20px;
      z-index: 9999;
      &:hover {
        color: #3cb371;
        cursor: pointer;
      }
    }
    .article-title {
      font-size: 18px;
      color: #333;
    }
    .article-info {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      font-size: 14px;
      color: #666;
      line-height: 30px;
      margin-bottom: 10px;
      .article-label {
        display: flex;
        align-items: center;
        margin-right: 20px;
        .label {
          margin-left: 8px;
        }
      }
      .message-box {
        width: 100%;
        padding-bottom: 50px;
      }
      .article-readnum {
        margin-right: 20px;
        display: flex;
        align-items: center;
        .readnum {
          margin-left: 4px;
        }
      }
      .article-content {
        width: 100%;
        .article-content-markdown {
          padding: 10px;
          width: 100%;
        }
      }
      .article-time {
        margin-right: 20px;
      }
    }
  }
</style>
