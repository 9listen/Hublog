import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index";
Vue.use(Router);
let router;
export default router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: () => import("@/views/client/HomePage.vue")
    },
    {
      path: "/linkfirends",
      name: "LlnkfFrends",
      component: () => import("@/views/client/LlnkfFrends.vue")
    },
    {
      path: "/messageboard",
      name: "MessageBoard",
      component: () => import("@/views/client/MessageBoard.vue")
    },
    {
      path: "/personalproject",
      name: "PersonalProject",
      component: () => import("@/views/client/PersonalProject.vue")
    },
    {
      path: "/aboutme",
      name: "AboutMe",
      component: () => import("@/views/client/AboutMe.vue")
    },
    {
      path: "/classifiednotes",
      name: "ClassifiedNotes",
      component: () => import("@/views/client/ClassifiedNotes.vue")
    },
    {
      path: "/articledetail",
      name: "articleDetail",
      component: () => import("@/views/client/articleDetail.vue")
    },
    {
      path: "/photoshare",
      name: "photoShare",
      component: () => import("@/views/client/photoShare.vue")
    },
    {
      path: '/fragmentlanguage',
      name: 'FragmentLanguage',
      // component:FragmentLanguage,
      component: () =>import("@/views/client/FragmentLanguage.vue")
    },


    {
      path: "/login",
      name: "login",
      component: () => import("@/views/admin/login.vue")
    },
    {
      path: "/admin",
      component: () => import("@/views/admin/index.vue"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "/",
          name: "adminproject",
          component: () => import("@/views/admin/AdminProject.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/adminarticle",
          name: "adminarticle",
          component: () => import("@/views/admin/AdminArticle.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/adminphoto",
          name: "adminPhoto",
          component: () => import("@/views/admin/AdminPhoto.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/admincolumn",
          name: "admincolumn",
          component: () => import("@/views/admin/AdminColumn.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/adminlinkfriend",
          name: "adminlinkfriend",
          component: () => import("@/views/admin/AdminLinkFriend.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/adminmessage",
          name: "/adminmessage",
          component: () => import("@/views/admin/AdminMessage.vue"),
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
});
//登录前置路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.islogin) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});
