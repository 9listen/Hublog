<template>
  <div @mousedown.prevent="move"
       :class="['tool-box',{'draging':draging},{'draged':!draging}]"
       :style="[{'top':top},{'right': right}]">
    添加
  </div>
</template>

<script>
export default {
  name: 'tool-box',
  data() {
    return {
      draging: false,
      top: parseInt(Math.random() * (15 - 25 + 1) + 25, 10) + '%',
      right: parseInt(Math.random() * (10 - 20 + 1) + 20, 10) + '%',
    }
  },
  methods: {
    headleClick() {
      this.$emit('headleClick', '')
    },
    move(e) {
      this.draging = true
      let odiv = e.target //获取目标元素
      let disX = e.clientX - odiv.offsetLeft
      let disY = e.clientY - odiv.offsetTop
      let firstTime = ''
      let lastTime = ''
      firstTime = new Date().getTime()
      document.onmousemove = (e) => {
        let left = e.clientX - disX
        let top = e.clientY - disY
        odiv.style.left = left + 'px'
        odiv.style.top = top + 'px'
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
        this.draging = false
        lastTime = new Date().getTime()
        if (lastTime - firstTime < 200) {
          this.headleClick()
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tool-box {
  position: fixed;
  top: 15%;
  right: 10%;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  background-color: #99cc99;
  z-index: 999;
  cursor: pointer;

  &:hover {
    transform: scale(1.5);
  }
}
.draging {
  transform: scale(1.5);
}
.draged {
  transition: all 0.5s;
}
</style>