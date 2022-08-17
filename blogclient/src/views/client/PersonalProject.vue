<template>
  <div class="personalproject">
    <PicturePreview
      :images="projectImages"
      v-if="maskState"
      @MaskClose="headleMask([])"
    />
    <HomeTemplate :templateTitle="templateTitle" :banner="banner">
      <div class="project-wrapper">
        <div
          class="project-item"
          v-for="item in projectList"
          :key="item.PK_projectGuid"
        >
          <div class="project-cover">
            <div
              class="cover"
              :style="{ backgroundImage: 'url(api/' + item.logo + ')' }"
            ></div>
          </div>
          <div class="project-title">
            <span class="title">{{ item.name }}</span>
          </div>
          <div class="projrct-label">
            <span
              class="title-label"
              :style="{
                backgroundColor: getColor(Math.floor(Math.random() * 6))
              }"
              v-for="(label, index) in item.labelkeywords"
              :key="index"
              >{{ label.key }}</span
            >
          </div>
          <div class="projrct-description">
            {{ item.description }}
          </div>
          <div class="projrct-btn">
            <a class="label-item" :href="item.projectUrl" target="_blank"
              >项目链接</a
            >
            <!-- <div class="label-item">源码</div> -->
            <div class="label-item" @click="headleMask(item.projectImages)">
              项目截图
            </div>
          </div>
        </div>
      </div>
    </HomeTemplate>
  </div>
</template>
<script>
import { GETPROJECTS } from "@/apis/client/index";
import PicturePreview from "@/components/base/PicturePreview.vue";
import HomeTemplate from "@/components/template";
export default {
  name: "personal-project",
  components: {
    HomeTemplate,
    PicturePreview
  },
  data() {
    return {
      templateTitle: "博主项目",
      banner: require("@/..//static/images/bg12.jpg"),
      maskState: false,
      projectList: [],
      projectImages: []
    };
  },
  methods: {
    getColor(index) {
      let colorList = [
        "#FF9999",
        "#FF9900",
        "#99CC33",
        "#FF6666",
        "#FF6600",
        "#FF6666"
      ];
      return colorList[Math.floor(Math.random() * (5 + 1))];
    },
    headleMask(val) {
      this.projectImages = val;
      this.maskState = !this.maskState;
    }
  },
  mounted() {
    GETPROJECTS({
      page: 0,
      limit: 10
    }).then(res => {
      this.projectList = res.data.rows;
    });
  }
};
</script>
<style lang="scss" scoped>
.personalproject {
  width: 100%;
  .project-wrapper {
    margin: 20px 0;
    .project-item {
      width: 100%;
      margin-top: 25px;
      .project-cover {
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 30px 0;
        .cover {
          width: 100px;
          height: 100px;
          background-position: center;
          background-size: cover;
          transition: all 1s;
          cursor: pointer;
        }
      }
      .project-title {
        width: 100%;
        margin: 5px 0;
        text-align: center;
        .title {
          font-size: 20px;
        }
      }
      .projrct-label {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 60%;
        margin: 0 auto;
        .title-label {
          display: inline-block;
          font-size: 14px;
          margin: 5px;
          border-radius: 4px;
          padding: 2px 5px;
          color: #fff;
          cursor: pointer;
        }
      }
      .projrct-description {
        width: 100%;
        margin-top: 10px;
        text-indent: 2em;
        font-size: 14px;
        line-height: 25px;
        color: #333;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
      }
      .projrct-btn {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        .label-item {
          display: inline-block;
          font-size: 14px;
          margin: 5px;
          border-radius: 4px;
          padding: 4px 8px;
          background-color: #33cc33;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
