<template>
  <div class='picture-preview'
       @click.self="headleMaskClose()">
    <div class="image-wrapper"
         :style="[{ height: getSize*.6 + 'px' },{ width: getSize*.8 + 'px' }]">
      <div class="image-swiper"
           :style="{'backgroundImage':'url('+BASE_URL+getimages+')'}"></div>
      <div class="left-btn">
        <i @click="changeImage('left')"
           :class="['iconfont','icon-arrow-lift','icon-btn',{'mouse-ban':index===0}]"></i>
      </div>
      <div class="right-btn">
        <i @click="changeImage('right')"
           :class="['iconfont','icon-arrow-right','icon-btn',{'mouse-ban':index===images.length||images.length===0}]"></i>
      </div>
    </div>
  </div>
</template>
<script>
const BASE_URL = 'api/'
export default {
  name: 'picture-preview',
  props: {
    images: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      BASE_URL: BASE_URL,
      CHeight: 0,
      CWidth: 0,
      index: 0
    }
  },
  computed: {
    getimages() {
      let image
      if (this.images.length === 0) {
        image = 'default/defaultpic.jpg'
      } else {
        image = this.images[this.index].url
      }
      return image
    },
    getSize() {
      return this.CHeight > this.CWidth ? this.CWidth : this.CHeight
    }
  },
  methods: {
    headleMaskClose() {
      this.$emit('MaskClose', false)
    },
    changeImage(val) {
      if (val === 'left') {
        this.index++
        if (this.index < 0) {
          this.index = 0
        }
      }
      if (val === 'right') {
        this.index++
        if (this.index > this.images.length) {
          this.index = this.images.length
        }
      }
    }
  },
  mounted() {
    this.CHeight =
      document.documentElement.clientHeight || document.body.clientHeight
    this.CWidth =
      document.documentElement.clientWidth || document.body.clientWidth
    document.documentElement.style.overflowY = 'hidden' //禁止屏幕滚动
  },
  beforeDestroy() {
    document.documentElement.style.overflowY = 'scroll' //屏幕可滚动
  }
}
</script>
<style lang="scss" scoped>
.picture-preview {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 9999;
  .image-wrapper {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 60px;
    .icon-btn {
      font-size: 60px;
      color: #999;
      cursor: pointer;
      &:hover {
        color: #e86b99;
      }
    }
    .left-btn {
      position: absolute;
      left: 0;
      top: 50%;
      width: 60px;
      height: 60px;
      transform: translateY(-50%);
      line-height: 60px;
      text-align: center;
    }
    .right-btn {
      position: absolute;
      right: 0;
      top: 50%;
      width: 60px;
      height: 60px;
      transform: translateY(-50%);
      line-height: 60px;
      text-align: center;
    }
    .mouse-ban {
      cursor: not-allowed;
    }
    .image-swiper {
      height: 100%;
      width: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      border-radius: 4px;
    }
  }
}
</style>