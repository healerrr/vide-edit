<template>
  <div class="icon-selector-container">
    <el-divider content-position="left">图标选择器演示</el-divider>
    <el-popover popper-class="icon-selector-popper" width="292" trigger="hover">
      <el-button slot="reference">
        <vab-remix-icon :icon-class="icon"></vab-remix-icon>
        图标选择器
        <vab-remix-icon icon-class="arrow-down-s-line"></vab-remix-icon>
      </el-button>
      <icon-table @handleIcon="handleIcon"></icon-table>
    </el-popover>
  </div>
</template>

<script>
  import IconTable from "@/extra/VabIconSelector";
  export default {
    name: "IconSelector",
    components: { IconTable },
    data() {
      return {
        icon: "24-hours-fill",
      };
    },
    methods: {
      handleIcon(item) {
        this.icon = item;
      },
    },
  };
</script>
