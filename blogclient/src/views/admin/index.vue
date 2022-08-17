<template>
  <div class="admin">
    <adminNav />
    <div class="view">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>
</template>
<script>
import adminNav from '@/components/adminbase/adminNav'
export default {
  name: 'admin',
  components: {
    adminNav
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.admin {
  width: 100%;
  .view {
    margin: 80px auto 0 auto;
    width: 1100px;
    padding: 30px 0;
  }
}
</style>