<template>
  <div class="test1-container">
    <h3>取值方式：this.params</h3>
    <el-alert type="success" :closable="false" :title="route"></el-alert>
  </div>
</template>
<script>
  export default {
    name: "Test1",
    data() {
      return {
        route: {},
      };
    },
    watch: {
      $route: {
        handler(route) {
          this.route = {
            path: route.path,
            fullPath: route.fullPath,
            params: route.params,
            query: route.query,
            name: route.name,
            meta: route.meta,
          };
        },
        immediate: true,
      },
    },
  };
</script>
