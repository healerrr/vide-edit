import Vue from "vue";
import App from "./App";
import i18n from "./i18n";
import store from "./store";
import router from "./router";
import "@/vab";
import videoClip from './views/project/meizi/chaitiao/components/index'
Vue.use(videoClip)
/**
 * @author chuzhixin 1204505056@qq.com
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("@/utils/static");
  mockXHR();
}
Vue.config.productionTip = false;
new Vue({
  el: "#vue-admin-beautiful-pro",
  i18n,
  store,
  router,
  render: (h) => h(App),
});
