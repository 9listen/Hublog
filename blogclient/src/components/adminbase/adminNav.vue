<template>
  <div class="admin-nav">
    <div class="nav-list">
      <div class="title">
        <i class="iconfont icon-blog-c"></i>
        <span>萤火之森后台</span>
      </div>
      <div class="nav-wrapper">
        <router-link
          tag="div"
          v-for="item in routers"
          :key="item.name"
          :to="item.path"
          :class="[
            'nav-item',
            { 'nav-item-active': routerActive === item.path }
          ]"
          >{{ item.name }}</router-link
        >
      </div>
      <div class="userinfo">
        <img class="userimg" v-lazy="userheadimg" alt="userimg" />
        <span class="user">{{ userinfo.username }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-nav",
  computed: {
    routerActive() {
      return this.$route.path;
    },
    Islogin() {
      return this.$store.state.islogin;
    },
    userheadimg() {
      return this.$store.state.userinfo.userheadimg;
    },
    userinfo() {
      return this.$store.state.userinfo;
    }
  },
  data() {
    return {
      tagindex: 0,
      routers: [
        {
          path: "/admin",
          name: "项目管理"
        },
        {
          path: "/admincolumn",
          name: "分类管理"
        },
        {
          path: "/adminarticle",
          name: "文章管理"
        },
        {
          path: "/adminlinkfriend",
          name: "友链管理"
        },
        {
          path: "/adminphoto",
          name: "摄影管理"
        }
        // {
        //   path: '/adminmessage',
        //   name: '留言管理'
        // }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.admin-nav {
  position: fixed;
  top: 0;
  height: 80px;
  width: 100%;
  font-size: 16px;
  border-top: 1.5px solid #333;
  background-color: #f4f4f4;
  z-index: 99;
  .nav-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    height: 100%;
    width: 1100px;
    .title {
      color: #009966;
    }
    .nav-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .nav-item {
        padding: 8px 4px;
        margin: 0 10px;
        cursor: pointer;
        &:hover {
          color: #009966;
        }
      }
      .nav-item-active {
        color: #009966;
      }
    }
    .userinfo {
      display: flex;
      align-items: center;
      .userimg {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .user {
        margin-left: 10px;
      }
    }
  }
}
</style>
