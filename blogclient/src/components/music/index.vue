<template>
  <div class="music-play">
     <div class="music-cover"></div>
     <div class="music-control"></div>
     <div class="music-list-btn" @click="changeMusicListState()">列表</div>
     <transition>
        <div v-if="musicListState" class="music-list">
          <div @click="changeMusicListState()" class="colse-btn">X</div>
        </div>
     </transition>
  </div>
</template>
<script>
export default {
  name:'music-play',
  data() {
    return {
      musicListState:false
    }
  },
  methods: {
    changeMusicListState() {
      this.musicListState=!this.musicListState
    }
  },
}
</script>
<style lang="scss" scoped>
.music-play{
  position: fixed;
  bottom: 0;
  width:100%;
  height: 1px;
  background-color: rgba(90,90,90,0.8);
  transition: all .5s;
  cursor: pointer;
  &:hover{
    height: 80px;
  }
  .music-list{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: salmon;
    .colse-btn{
      position: absolute;
      top: 20px;
      right: 30px;
      padding: 15px;
      cursor: pointer;
      font-size: 18px;
    }
  }
}
</style>