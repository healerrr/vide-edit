<template>
  <div class="menu1-container">
    <el-alert :closable="false" title="嵌套路由 1" type="success">
      <router-view />
    </el-alert>
  </div>
</template>
<style lang="scss" scoped>
  ::v-deep {
    .el-alert {
      padding: $base-padding;
      margin: 0;
    }
  }
</style>
