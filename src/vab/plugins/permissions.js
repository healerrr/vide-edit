/**
 * @author chuzhixin 1204505056@qq.com
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from "@/router";
import store from "@/store";
import VabProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "@/utils/pageTitle";
import {
  authentication,
  loginInterception,
  recordRoute,
  routesWhiteList,
} from "@/config/settings";

VabProgress.configure({
  easing: "ease",
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
});
router.beforeEach(async (to, from, next) => {
  const showProgressBar = store.getters["settings/showProgressBar"];
  if (showProgressBar) VabProgress.start();
  let hasToken = store.getters["user/accessToken"];

  if (!loginInterception) hasToken = true;

  if (routesWhiteList.indexOf(to.path) !== -1) {
    if (to.path === "/login" && hasToken) next({ path: "/" });
    else next();
  } else {
    if (hasToken) {
      const hasRoles =
        store.getters["acl/admin"] ||
        store.getters["acl/role"].length > 0 ||
        store.getters["acl/ability"].length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          if (loginInterception) await store.dispatch("user/getUserInfo");
          //settings.js loginInterception为false（关闭登录拦截时）时，创建虚拟角色
          else await store.dispatch("user/setVirtualRoles");
          let accessRoutes = [];
          if (authentication === "intelligence")
            accessRoutes = await store.dispatch("routes/setRoutes");
          else if (authentication === "all")
            accessRoutes = await store.dispatch("routes/setAllRoutes");
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch {
          await store.dispatch("user/resetAll");
          if (recordRoute)
            next({
              path: "/login",
              query: { redirect: to.path },
              replace: true,
            });
          else next({ path: "/login", replace: true });
        }
      }
    } else {
      if (recordRoute)
        next({ path: "/login", query: { redirect: to.path }, replace: true });
      else next({ path: "/login", replace: true });
    }
  }
});
router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title);
  if (VabProgress.status) VabProgress.done();
});
