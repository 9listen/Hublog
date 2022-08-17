<template>
  <div
    ref="waterFull"
    :style="{ height: getMaxHeight + 'px' }"
    class="water-full"
  >
    <div
      class="water-item"
      v-for="(item, index) in waterFullRender"
      @click="headleEnterTree(item.info)"
      :key="index"
      :style="[
        { top: item.top + 'px' },
        { left: item.left + 'px' },
        { width: 100 / clos + '%' },
        { height: item.height + 'px' },
      ]"
    >
      <div class="mask-cover">
        <div class="enter-router">
          {{ isPhoto ? "下载" : "详情" }}
        </div>
      </div>
      <img class="item-img" :src="item.src" />
      <div class="item-description">
        <div class="tree-title">{{ item.info.name }}</div>
        <div v-if="clos !== 2" class="tree-tip">
          <!-- <div class="publisher"></div> -->
          <div class="tree-icon">
            <div class="icon-item">
              <i class="iconfont icon-redu mask-icon"></i>
              <span class="icon-text">{{
                item.info.createtime | timeFitter
              }}</span>
            </div>
            <!-- <div class="icon-item">
              <i class="search iconfont icon-fenzhi"></i>
              <span>{{ item.info.adoption }}</span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const SPACING_BOTTOM = 30;
const DESCRIPTION_CONTENT = 60;
const BASE_URL = "api/";
export default {
  name: "water-full",
  props: {
    waterFullList: {
      type: Array
      // required: true
    },
    clos: {
      type: Number,
      default: 4
    },
    isRefresh: {
      type: Boolean,
      default: false
    },
    isPhoto: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      waterFullRender: [],
      waterFullHeight: [],
      getMaxHeight: 0
    };
  },
  watch: {
    isRefresh () {
      if (this.isRefresh) {
        this.getImageHeight(this.waterFullList);
        (this.waterFullRender = []),
          (this.waterFullHeight = []),
          (this.getMaxHeight = 0);
        this.$emit("refresh", false);
      }
    }
  },
  methods: {
    headleEnterTree (item) {
      if (this.isPhoto) {
        const linkNode = document.createElement("a");
        const pictureType = item.photoUrl.substring(
          item.photoUrl.lastIndexOf("."),
          item.photoUrl.length
        );
        linkNode.download = `${item.name + pictureType}`;
        linkNode.href = `api/${item.photoUrl}`;
        document.body.appendChild(linkNode);
        linkNode.click();
        document.body.removeChild(linkNode);
      } else {
        let routeData = this.$router.resolve({
          path: "/skilltreedetail",
          query: {
            Guid: item.PK_photoGuid
          }
        });
        window.open(routeData.href, "_blank");
      }
    },
    initImages (item) {
      return new Promise((resolve, reject) => {
        let loadImage = new Image();
        loadImage.src = BASE_URL + item.photoUrl;
        loadImage.onload = () => {
          let Image = {};
          Image.top = 0;
          Image.left = 0;
          Image.info = item;
          Image.src = loadImage.src;
          Image.height =
            Math.floor(
              ((this.$refs.waterFull.clientWidth / this.clos) *
                loadImage.height) /
              loadImage.width
            ) + DESCRIPTION_CONTENT;
          Image.width = Math.floor(
            this.$refs.waterFull.clientWidth / this.clos
          );
          resolve(Image);
        };
        loadImage.error = err => {
          reject(err);
        };
      });
    },
    getImageHeight (imagelist) {
      imagelist.forEach(async element => {
        let loadImage = await this.initImages(element);
        let temp = this.rankImage(loadImage);
        this.waterFullRender.push(temp);
      });
    },
    rankImage (image) {
      if (this.waterFullHeight.length < this.clos) {
        image.top = 0;
        image.left = this.waterFullHeight.length * image.width;
        this.waterFullHeight.push(image.height);
      } else {
        let min = Math.min(...this.waterFullHeight);
        let index = this.waterFullHeight.indexOf(min);
        this.waterFullHeight[index] += image.height + SPACING_BOTTOM;
        image.top = min + SPACING_BOTTOM;
        image.left = index * image.width;
      }
      this.getMaxHeight = Math.max(...this.waterFullHeight) + 50;
      return image;
    }
  },
  mounted () {
    this.getImageHeight(this.waterFullList);
  }
};
</script>
<style lang="scss" scoped>
  .water-full {
    position: relative;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    min-height: 700px;
    .water-item {
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 0 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mask-cover {
        display: none;
        position: absolute;
        top: 0;
        left: 15px;
        bottom: 60px;
        right: 15px;
        background-color: rgba($color: #000000, $alpha: 0.4);
        justify-content: center;
        align-items: center;
        .enter-router {
          padding: 8px 16px;
          font-size: 18px;
          color: #fff;
          background-color: #0ec5a9;
          border-radius: 4px;
          cursor: pointer;
        }
      }
      &:hover .mask-cover {
        display: flex;
      }
      .item-img {
        width: 100%;
        height: calc(100% - 60px);
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
      }
      .item-description {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        width: 100%;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: #f9f9f9;
        padding: 0 10px;
        .tree-title {
          height: 30px;
          width: 60%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          line-height: 30px;
          font-size: 16px;
          color: #333;
        }
        .tree-tip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 30px;
          .tree-icon {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon-item {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-left: 10px;
              font-size: 12px;
              color: #999;
              .mask-icon {
                font-size: 14px;
                color: red;
              }
              .icon-text {
                font-size: 14px;
                margin-left: 5px;
              }
            }
          }
          .publisher {
            width: 60%;
            font-size: 12px;
            color: #999;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
