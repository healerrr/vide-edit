<template>
  <div class="tags-bar-container">
    <fold v-if="layout === 'common'"></fold>
    <el-tabs
      v-model="tabActive"
      class="tags-content"
      type="card"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.fullPath"
        :closable="!isAffix(item)"
        :label="translateTitle(item.meta.title)"
        :name="item.fullPath"
      ></el-tab-pane>
    </el-tabs>

    <el-dropdown @command="handleCommand">
      <span class="more">
        {{ translateTitle("更多") }}
        <vab-remix-icon icon-class="arrow-down-s-line"></vab-remix-icon>
      </span>
      <el-dropdown-menu slot="dropdown" class="tags-more">
        <el-dropdown-item command="closeOthersTags">
          {{ translateTitle("关闭其他") }}
        </el-dropdown-item>
        <el-dropdown-item command="closeLeftTags">
          {{ translateTitle("关闭左侧") }}
        </el-dropdown-item>
        <el-dropdown-item command="closeRightTags">
          {{ translateTitle("关闭右侧") }}
        </el-dropdown-item>
        <el-dropdown-item command="closeAllTags">
          {{ translateTitle("关闭全部") }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import { translateTitle } from "@/utils/i18n";
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "TagsBar",
    props: {
      layout: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        affixTags: [],
        tabActive: "",
        created: false,
      };
    },
    computed: {
      ...mapGetters({
        visitedRoutes: "tagsBar/visitedRoutes",
        routes: "routes/routes",
      }),
    },
    watch: {
      $route: {
        handler(route) {
          this.$nextTick(() => {
            this.addTags(route);
          });
        },
        immediate: true,
      },
    },
    created() {
      this.initAffixTags(this.routes);
    },
    methods: {
      translateTitle,
      ...mapActions({
        addVisitedRoute: "tagsBar/addVisitedRoute",
        delVisitedRoute: "tagsBar/delVisitedRoute",
        delOthersVisitedRoutes: "tagsBar/delOthersVisitedRoutes",
        delLeftVisitedRoutes: "tagsBar/delLeftVisitedRoutes",
        delRightVisitedRoutes: "tagsBar/delRightVisitedRoutes",
        delAllVisitedRoutes: "tagsBar/delAllVisitedRoutes",
      }),
      initAffixTags(routes) {
        routes.forEach((route) => {
          if (route.meta && route.meta.affix) this.addTags(route);
          if (route.children) this.initAffixTags(route.children);
        });
      },
      async addTags(tag) {
        if (tag.name && tag.meta && tag.meta.tagHidden !== true) {
          let matched = [tag.name];
          let path = tag.path;
          if (tag.matched) {
            matched = tag.matched.map((item) => item.name);
            path = tag.matched[tag.matched.length - 1].path;
          }
          await this.addVisitedRoute({
            path: path,
            fullPath: tag.path,
            params: tag.params,
            query: tag.query,
            name: tag.name,
            matched: matched,
            meta: { ...tag.meta },
          });
          //临时修复query有问号传参tab标签不选中，待测试
          this.tabActive = tag.path;
        }
      },
      isActive(route) {
        return route.path === this.$route.path;
      },
      isAffix(tag) {
        return tag.meta && tag.meta.affix;
      },
      handleTabClick(tab) {
        const route = this.visitedRoutes[tab.index];
        if (this.$route.fullPath !== route.fullPath) this.$router.push(route);
      },
      async handleTabRemove(fullPath) {
        const view = this.visitedRoutes.find(
          (item) => fullPath === item.fullPath
        );
        await this.delVisitedRoute(view);
        if (this.isActive(view)) this.toLastTag();
      },
      handleCommand(command) {
        switch (command) {
          case "closeOthersTags":
            this.closeOthersTags();
            break;
          case "closeLeftTags":
            this.closeLeftTags();
            break;
          case "closeRightTags":
            this.closeRightTags();
            break;
          case "closeAllTags":
            this.closeAllTags();
            break;
        }
      },
      async closeSelectedTag(view) {
        await this.delVisitedRoute(view);
        if (this.isActive(view)) this.toLastTag();
      },
      async closeOthersTags() {
        const view = this.toThisTag();
        await this.delOthersVisitedRoutes(view);
      },
      async closeLeftTags() {
        const view = this.toThisTag();
        await this.delLeftVisitedRoutes(view);
      },
      async closeRightTags() {
        const view = this.toThisTag();
        await this.delRightVisitedRoutes(view);
      },
      async closeAllTags() {
        const view = this.toThisTag();
        await this.delAllVisitedRoutes();
        if (this.affixTags.some((tag) => tag.path === view.path)) return;
        this.toLastTag();
      },
      toLastTag() {
        const latestView = this.visitedRoutes.slice(-1)[0];
        if (latestView) this.$router.push(latestView);
        else this.$router.push("/");
      },
      toThisTag() {
        const view = this.visitedRoutes.find(
          (item) => item.fullPath === this.$route.fullPath
        );
        if (this.$route.path !== view.path) this.$router.push(view);
        return view;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .tags-bar-container {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    height: $base-tags-bar-height;
    padding-right: $base-padding;
    padding-left: $base-padding;
    user-select: none;
    background: $base-color-white;
    border-top: 1px solid #f6f6f6;

    ::v-deep {
      .fold-unfold {
        margin-right: $base-padding;
      }
    }

    .tags-content {
      width: calc(100% - 90px);
      height: $base-tag-item-height;

      ::v-deep {
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          height: $base-tag-item-height;
          line-height: $base-tag-item-height;
        }

        .el-tabs__header {
          border-bottom: 0;

          .el-tabs__nav {
            border: 0;
          }

          .el-tabs__item {
            box-sizing: border-box;
            height: $base-tag-item-height;
            margin-right: 5px;
            line-height: $base-tag-item-height;
            border: 1px solid $base-border-color;
            border-radius: $base-border-radius;
            transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

            &.is-active {
              color: $base-color-white;
              background: $base-color-blue;
              border: 1px solid $base-color-blue;
            }
          }
        }
      }
    }

    .more {
      display: flex;
      align-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
</style>
