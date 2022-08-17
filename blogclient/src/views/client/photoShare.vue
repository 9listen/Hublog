<template>
  <div class="message-board">
    <HomeTemplate :templateTitle="templateTitle" :banner="banner">
      <div class="waterFull-box">
        <waterFull
          v-if="waterFullList.length > 0"
          v-on:refresh="refreshChange($event)"
          :clos="cols"
          :isRefresh="isRefresh"
          :waterFullList="waterFullList"
          :isPhoto="true"
        />
      </div>
    </HomeTemplate>
  </div>
</template>
<script>
import HomeTemplate from "@/components/template";
import { GETPHOTOS } from "@/apis/admin/index";
import waterFull from "@/components/WaterFull";
export default {
  name: "message-board",
  components: {
    HomeTemplate,
    waterFull
  },
  data () {
    return {
      templateTitle: "",
      banner: require("@/..//static/images/bg6.jpg"),
      isRefresh: false,
      waterFullList: [],
      cols: 4
    };
  },
  methods: {
    getPage () {
      GETPHOTOS({
        page: 0,
        limit: 100
      }).then(res => {
        if (res.status === 200) {
          this.waterFullList = res.data.rows;
        }
      });
    }
  },
  mounted () {
    this.getPage();
    this.cols =
      (document.documentElement.clientWidth || document.body.clientWidth) > 500
        ? 4
        : 2;
  }
};
</script>
<style lang="scss" scoped>
  .message-board {
    width: 100%;
    height: 100%;
  }
  .waterFull-box {
    margin-top: 30px;
    width: 100%;
    height: 100%;
  }
</style>
