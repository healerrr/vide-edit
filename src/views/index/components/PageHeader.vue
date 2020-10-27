<template>
  <el-col :span="24">
    <el-card class="page-header" shadow="never">
      <!-- <el-avatar :src="avatar" class="page-header-avatar"></el-avatar> -->
      <div class="page-header-tip">
        <p class="page-header-tip-title">
          {{ handleTips() }}
        </p>
      </div>
    </el-card>
  </el-col>
</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        username: "user/username",
      }),
    },
    created() {},
    methods: {
      handleTips() {
        const hour = new Date().getHours();
        return hour < 8
          ? `早上好 ${this.username}，欢迎来到看常州。`
          : hour <= 11
          ? `上午好 ${this.username}，欢迎来到看常州。`
          : hour <= 13
          ? `中午好 ${this.username}，欢迎来到看常州。`
          : hour < 18
          ? `下午好 ${this.username}，欢迎来到看常州。`
          : `晚上好 ${this.username}，欢迎来到看常州。`;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .page-header {
    ::v-deep {
      .el-card__body {
        display: flex;
        align-items: center;
      }
    }

    &-avatar {
      width: 64px;
      height: 64px;
      margin-right: 16px;
      border-radius: 50%;
    }

    &-tip {
      width: calc(100% - 80px);
      vertical-align: middle;

      &-title {
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: bold;
        color: #3c4a54;
      }

      &-description {
        color: #808695;
      }
    }
  }
</style>
