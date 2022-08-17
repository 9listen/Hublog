<template>
  <div ref="ClassifiedNotes" class="classified-notes">
    <HomeTemplate :templateTitle="templateTitle" :banner="banner">
      <div class="classified-content">
        <el-collapse>
          <!-- 文章列表 文章名字+篇数 -->
          <el-collapse-item v-for="item in columnList" :key="item.columnname">
            <template slot="title">
              <span class="column">{{ item.columnname }}</span>
              <span class="article-count">--{{ item.articles.length }}篇</span>
            </template>
            <!-- 折叠的面板 -->
            <el-timeline>
              <el-timeline-item
                v-for="article in item.articles"
                :key="article.PK_articleGuid"
                placement="top"
                :timestamp="article.lasttime"
              >
                <el-card class="article-card">
                  <div
                    class="article-content"
                    @click="getArticleDetail(article)"
                  >
                    {{ article.title }}
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
            <!-- <div v-for="article in item.articles"
                 :key='article.PK_articleGuid'>{{article.title}}</div> -->
          </el-collapse-item>
        </el-collapse>
      </div>
    </HomeTemplate>
  </div>
</template>
<script>
import HomeTemplate from "@/components/template";
import { GETPAGEARTICLES, ADDVIEWS } from "@/apis/client/index";
export default {
  name: "personal-project",
  components: {
    HomeTemplate
  },
  data () {
    return {
      templateTitle: "分类笔记",
      banner: require("@/../static/images/bg14.jpg"),
      columnList: []
    };
  },
  methods: {
    getArticleDetail (item) {
      ADDVIEWS({
        PK_articleGuid: item.PK_articleGuid
      });
      this.$router.push({
        name: "articleDetail",
        params: { articleInfo: item }
      });
    }
  },
  mounted () {
    GETPAGEARTICLES({
      page: 0,
      limit: 1000
    }).then(res => {
      if (res.status === 200) {
        res.data.rows.forEach(element => {
          let isNeedPush = true;
          for (let i = 0; i < this.columnList.length; i++) {
            if (this.columnList[i].columnname === element.columnname) {
              this.columnList[i].articles
                ? this.columnList[i].articles.push(element)
                : (this.columnList[i].articles = [element]);
              isNeedPush = false;
            }
          }
          if (isNeedPush) {
            this.columnList.push({
              columnname: element.columnname,
              articles: [element]
            });
          }
        });
      }
    });
  }
};
</script>
<style lang="scss" scoped>
  .classified-notes {
    width: 100%;
    .classified-content {
      width: 100%;
      padding: 30px 0;
      /deep/ .column {
        font-size: 16px;
      }
      /deep/ .article-count {
        margin-left: 12px;
      }
      /deep/ .article-card {
        .article-content {
          cursor: pointer;
          &:hover {
            color: #3cb371;
          }
        }
      }
    }
  }
</style>
