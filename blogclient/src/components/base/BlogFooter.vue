<template>
  <div class="blog-footer">
    <span>Design by Thezero</span>
    <span>© 2022 萤火之森 </span>
    <span>
      <a style="color: #888" href="https://beian.miit.gov.cn" target="_blank"
        >黔ICP备18004507号-2</a
      >
    </span>
    <i class="iconfont icon-xingxing foot-start"></i>
  </div>
</template>
<script>
export default {
  name: "blog-footer"
};
</script>
<style lang="scss" scoped>
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
</style>
