<template>
  <div class="index-container">
    <el-row :gutter="20">
      <page-header></page-header>
    </el-row>
    <!-- <el-row>
      <div class="title">待处理事项</div>
      <div class="boxs">
        <router-link
          v-for="(item, index) in todoList"
          :key="index"
          :to="{ name: item.path }"
          class="box box1"
        >
          <vab-remix-icon :icon-class="item.icon" class="icon"></vab-remix-icon>
          <div class="right">
            <div class="num">{{ item.num }}</div>
            <div class="text">{{ item.text }}</div>
          </div>
        </router-link>
      </div>
    </el-row>
    <el-row>
      <div class="title">快速入口</div>
    </el-row> -->
  </div>
</template>

<script>
  import PageHeader from "./components/PageHeader";

  export default {
    name: "Index",
    components: {
      PageHeader,
    },
    data() {
      return {
        todoList: [
          {
            path: "WengaoList",
            icon: "edit-circle-line",
            num: 53,
            text: "问政",
          },
          { path: "WengaoList", icon: "chat-1-line", num: 13, text: "评论" },
          {
            path: "WengaoList",
            icon: "discuss-line",
            num: 56,
            text: "反馈意见",
          },
          {
            path: "WengaoList",
            icon: "database-2-line",
            num: 41,
            text: "举报",
          },
          {
            path: "WengaoList",
            icon: "navigation-line",
            num: 5123,
            text: "会员",
          },
        ],
      };
    },
    created() {},
  };
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;
  }
  .title {
    margin-bottom: 20px;
    font-size: $base-font-size-max;
    font-weight: 700;
    color: #000;
  }
  .boxs {
    display: flex;
    flex-wrap: wrap;
    .box {
      display: block;
      width: 200px;
      height: 160px;
      padding: 20px;
      margin-right: 15px;
      margin-bottom: 30px;
      margin-left: 15px;
      overflow: hidden;
      border-radius: 12px;
      .icon {
        float: left;
        font-size: 40px;
        color: #fff;
      }
      .right {
        float: right;
        font-size: 24px;
        font-weight: 700;
        color: #fff;
        .num {
          font-size: 28px;
          text-align: right;
        }
        .text {
          margin-top: 30px;
          font-weight: 550;
          text-align: right;
        }
      }
      &:nth-child(1) {
        background-color: #409eff;
      }
      &:nth-child(2) {
        background-color: #67c23a;
      }
      &:nth-child(3) {
        background-color: #e6a23c;
      }
      &:nth-child(4) {
        background-color: #f56c6c;
      }
      &:nth-child(5) {
        background-color: #909399;
      }
    }
  }
</style>
