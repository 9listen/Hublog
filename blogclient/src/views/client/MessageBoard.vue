<template>
  <div class="message-board">
    <HomeTemplate :templateTitle="templateTitle" :banner="banner">
      <div class="message-box">
        <messageBox :belongtoGuid="MESAGE_GUID" />
      </div>
    </HomeTemplate>
  </div>
</template>
<script>
const MESAGE_GUID = "af0b4dc0-f71c-11ea-8d33-734a3583358f"; // 留言板默认id
import HomeTemplate from "@/components/template";
import messageBox from "@/components/messageBox";
export default {
  name: "message-board",
  components: {
    HomeTemplate,
    messageBox
  },
  data () {
    return {
      MESAGE_GUID: MESAGE_GUID,
      templateTitle: "留言板",
      banner: require("@/..//static/images/bg8.jpg")
    };
  }
};
</script>
<style lang="scss" scoped>
  .message-board {
    width: 100%;
    height: 100%;
    .message-box {
      width: 100%;
    }
  }
</style>
