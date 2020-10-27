/**
 * @author chuzhixin 1204505056@qq.com
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，pro版只支持remixIcon图标
 * hidden:true                        是否显示在菜单中显示路由（默认值：false）
 * alwaysShow:true                    当只有一级子路由时是否显示父路由是否显示在菜单中显示路由（默认值：false）
 * name:"Demo"                        首字母大写，一定要与vue文件的name对应起来，用于noKeepAlive缓存控制（该项特别重要）
 * meta:{
    title:"title"                     菜单、面包屑、多标签页显示的名称
    roles:["admin","..."]             当config/settings.js中rolesControl配置开启时，用于控制角色
    roles: {
      role: ["admin"],                role: ["admin"]
      ability: ["READ","WRITE"],      ability: ["READ","WRITE"],
      mode: "allOf"                   allOf: 数组内所有角色都拥有，返回True
                                      oneOf: 数组内拥有任一角色，返回True(等价第1种数据)
                                      except: 不拥有数组内任一角色，返回True(取反)
    }
    remixIcon:""                      remix图标
    isCustomSvgIcon:false,            是否是自定义svg图标（默认值：false，如果设置true，那么需要把你的svg拷贝到icon/remixIcon下，然后remixIcon字段配置上你的图标名）
    noKeepAlive:true                  当前路由是否不缓存（默认值：false）
    affix:true                        当前路由是否固定多标签页
    badge:"New"                       badge小标签（只支持子级）
    tagHidden:true                    当前路由是否不显示多标签页
   }
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
import { publicPath, routerMode } from "@/config/settings";

Vue.use(VueRouter);
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register"),
    hidden: true,
  },
  {
    path: "/callback",
    component: () => import("@/views/callback"),
    hidden: true,
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/401"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
];

export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    meta: {
      title: "首页",
      remixIcon: "home-4-line",
      affix: true,
    },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/index"),
        meta: {
          title: "首页",
          remixIcon: "home-4-line",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/infoManage",
    name: "InfoManage",
    component: Layout,
    alwaysShow: true,
    redirect: "/infoManage/wengaoList",
    meta: {
      title: "资讯",
      remixIcon: "file-list-3-line",
    },
    children: [
      {
        path: "wengaoList",
        name: "WengaoList",
        component: () => import("@/views/project/infoManage/wengao/wengaoList"),
        meta: {
          title: "文稿列表",
        },
      },
      {
        path: "wengaoDetail",
        name: "WengaoDetail",
        hidden: true,
        component: () =>
          import("@/views/project/infoManage/wengao/wengaoDetail"),
        meta: {
          title: "文稿详情",
          activeMenu: "/infoManage/wengaoList",
        },
      },
      {
        path: "tujiList",
        name: "TujiList",
        component: () => import("@/views/project/infoManage/tuji/tujiList"),
        meta: {
          title: "图集列表",
        },
      },
      {
        path: "tujiDetail",
        name: "TujiDetail",
        hidden: true,
        component: () => import("@/views/project/infoManage/tuji/tujiDetail"),
        meta: {
          title: "图集详情",
          activeMenu: "/infoManage/tujiList",
        },
      },
      {
        path: "shipinList",
        name: "ShipinList",
        component: () => import("@/views/project/infoManage/shipin/shipinList"),
        meta: {
          title: "视频列表",
        },
      },
      {
        path: "shipinDetail",
        name: "ShipinDetail",
        hidden: true,
        component: () =>
          import("@/views/project/infoManage/shipin/shipinDetail"),
        meta: {
          title: "视频详情",
          activeMenu: "/infoManage/shipinList",
        },
      },
      {
        path: "yinpinList",
        name: "YinpinList",
        component: () => import("@/views/project/infoManage/yinpin/yinpinList"),
        meta: {
          title: "音频列表",
        },
      },
      {
        path: "yinpinDetail",
        name: "YinpinDetail",
        hidden: true,
        component: () =>
          import("@/views/project/infoManage/yinpin/yinpinDetail"),
        meta: {
          title: "音频详情",
          activeMenu: "/infoManage/yinpinList",
        },
      },
      {
        path: "zhuantiList",
        name: "ZhuantiList",
        component: () =>
          import("@/views/project/infoManage/zhuanti/zhuantiList"),
        meta: {
          title: "专题列表",
        },
      },
      {
        path: "zhuantiDetail",
        name: "ZhuantiDetail",
        hidden: true,
        component: () =>
          import("@/views/project/infoManage/zhuanti/zhuantiDetail"),
        meta: {
          title: "专题详情",
          activeMenu: "/infoManage/zhuantiList",
        },
      },
      {
        path: "draftList",
        name: "DraftList",
        component: () => import("@/views/project/infoManage/draftList"),
        meta: {
          title: "草稿列表",
        },
      },
    ],
  },
  {
    path: "/release",
    name: "Release",
    component: Layout,
    alwaysShow: true,
    redirect: "/release/juhe",
    meta: {
      title: "发布",
      remixIcon: "airplay-line",
    },
    children: [
      {
        path: "juhe",
        name: "Juhe",
        component: () => import("@/views/project/release/juhe"),
        meta: {
          title: "首页聚合",
        },
      },
      {
        path: "channel",
        name: "Channel",
        component: () => import("@/views/project/release/channel"),
        meta: {
          title: "频道",
        },
      },
      {
        path: "hotsearch",
        name: "Hotsearch",
        component: () => import("@/views/project/release/hotsearch"),
        meta: {
          title: "热搜",
        },
      },
    ],
  },
  {
    path: "/meizi",
    name: "Meizi",
    component: Layout,
    alwaysShow: true,
    redirect: "/meizi/live",
    meta: {
      title: "媒资",
      remixIcon: "function-line",
    },
    children: [
      {
        path: "live",
        name: "Live",
        component: () => import("@/views/project/meizi/live"),
        meta: {
          title: "直播",
        },
      },
      {
        path: "programList",
        name: "ProgramList",
        component: () => import("@/views/project/meizi/programList"),
        meta: {
          title: "节目单",
        },
      },
      {
        path: "shoulu",
        name: "Shoulu",
        component: () => import("@/views/project/meizi/shoulu"),
        meta: {
          title: "收录",
        },
      },
      {
        path: "chaitiao",
        name: "Chaitiao",
        component: () => import("@/views/project/meizi/chaitiao"),
        meta: {
          title: "拆条",
        },
      },
      {
        path: "kuaibian",
        name: "Kuaibian",
        component: () => import("@/views/project/meizi/kuaibian"),
        meta: {
          title: "快编",
        },
      },
      {
        path: "shiyi",
        name: "Shiyi",
        component: () => import("@/views/project/meizi/shiyi"),
        meta: {
          title: "时移",
        },
      },
      {
        path: "tuku",
        name: "Tuku",
        component: () => import("@/views/project/meizi/tuku"),
        meta: {
          title: "图库",
        },
      },
      {
        path: "shiyin",
        name: "Shiyin",
        component: () => import("@/views/project/meizi/shiyin"),
        meta: {
          title: "视音频库",
        },
      },
    ],
  },
  {
    path: "/operation",
    name: "Operation",
    component: Layout,
    alwaysShow: true,
    redirect: "/operation/user",
    meta: {
      title: "运营",
      remixIcon: "bank-card-2-line",
    },
    children: [
      {
        path: "user",
        name: "User",
        component: () => import("@/views/project/operation/user"),
        meta: {
          title: "用户",
        },
      },
      {
        path: "advertisement",
        name: "Advertisement",
        component: () => import("@/views/project/operation/advertisement"),
        meta: {
          title: "广告",
        },
      },
      {
        path: "push",
        name: "Push",
        component: () => import("@/views/project/operation/push"),
        meta: {
          title: "推送",
        },
      },
      {
        path: "comment",
        name: "Comment",
        component: () => import("@/views/project/operation/comment"),
        meta: {
          title: "评论",
        },
      },
      {
        path: "feedback",
        name: "Feedback",
        component: () => import("@/views/project/operation/feedback"),
        meta: {
          title: "意见反馈",
        },
      },
      {
        path: "news",
        name: "News",
        component: () => import("@/views/project/operation/news"),
        meta: {
          title: "消息",
        },
      },
    ],
  },
  {
    path: "/interaction",
    name: "Interaction",
    component: Layout,
    alwaysShow: true,
    redirect: "/interaction/activity",
    meta: {
      title: "互动",
      remixIcon: "apps-2-fill",
    },
    children: [
      {
        path: "activity",
        name: "Activity",
        component: () => import("@/views/project/interaction/activity"),
        meta: {
          title: "活动",
        },
      },
      {
        path: "vote",
        name: "Vote",
        component: () => import("@/views/project/interaction/vote"),
        meta: {
          title: "投票",
        },
      },
      {
        path: "form",
        name: "Form",
        component: () => import("@/views/project/interaction/form"),
        meta: {
          title: "表单",
        },
      },
      {
        path: "askPolitics",
        name: "AskPolitics",
        component: () => import("@/views/project/interaction/askPolitics"),
        meta: {
          title: "问政",
        },
      },
      {
        path: "pointMall",
        name: "PointMall",
        component: () => import("@/views/project/interaction/pointMall"),
        meta: {
          title: "积分商城",
        },
        children: [
          {
            path: "goods",
            name: "Good_Index",
            component: () =>
              import("@/views/project/interaction/pointMall/goodslist"),
            meta: {
              title: "商品列表",
            },
          },
          {
            path: "goodsadd",
            name: "Goods_Add",
            hidden: true,
            component: () =>
              import("@/views/project/interaction/pointMall/goodsadd"),
            meta: {
              title: "商品添加",
            },
          },
          {
            path: "goodscat",
            name: "Goods_Cat",
            component: () =>
              import("@/views/project/interaction/pointMall/goodscat"),
            meta: {
              title: "商品分类",
            },
          },
          {
            path: "orders",
            name: "Orders_List",
            component: () =>
              import("@/views/project/interaction/pointMall/orderslist"),
            meta: {
              title: "订单列表",
            },
          },
          {
            path: "users",
            name: "Users_List",
            component: () =>
              import("@/views/project/interaction/pointMall/userslist"),
            meta: {
              title: "用户列表",
            },
          },
        ],
      },
      {
        path: "signIn",
        name: "SignIn",
        component: () => import("@/views/project/interaction/signIn"),
        meta: {
          title: "签到",
        },
      },
      {
        path: "task",
        name: "Task",
        component: () => import("@/views/project/interaction/task"),
        meta: {
          title: "任务",
        },
      },
    ],
  },
  {
    path: "/system",
    name: "System",
    component: Layout,
    alwaysShow: true,
    redirect: "/system/log",
    meta: {
      title: "系统",
      remixIcon: "windows-line",
    },
    children: [
      {
        path: "log",
        name: "Log",
        component: () => import("@/views/project/system/log"),
        meta: {
          title: "日志",
        },
      },
      {
        path: "authority",
        name: "Authority",
        component: () => import("@/views/project/system/authority"),
        meta: {
          title: "权限",
        },
      },
      {
        path: "recycleBin",
        name: "RecycleBin",
        component: () => import("@/views/project/system/recycleBin"),
        meta: {
          title: "回收站",
        },
      },
      {
        path: "statistics",
        name: "Statistics",
        component: () => import("@/views/project/system/statistics"),
        meta: {
          title: "统计",
        },
      },
      {
        path: "keyWords",
        name: "KeyWords",
        component: () => import("@/views/project/system/keyWords"),
        meta: {
          title: "关键词屏蔽",
        },
      },
    ],
  },

  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher;
}

export default router;
