<template>
  <div class="goods-list-container">
    <el-alert
      :closable="false"
      title="本模块由开源爱好者维护，vue-admin-beautiful作者不提供物料市场插件技术支持，每一位开发者都可以联系作者提供优质的第三方插件，经过审核后可上线物料市场，价格由插件原作者制定，所得盈利80%归插件原作者所有。"
      type="warning"
    ></el-alert>
    <vab-query-form>
      <vab-query-form-right-panel :span="24">
        <el-form
          ref="form"
          :inline="true"
          :model="queryForm"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="请输入商品名称" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              native-type="submit"
              type="primary"
              @click="handleQuery"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in list"
        :key="index"
        :lg="8"
        :md="8"
        :sm="8"
        :xl="6"
        :xs="24"
      >
        <el-popover trigger="hover" width="300">
          <div style="text-align: center">
            <img alt="" src="@/assets/skm2.jpg" width="200px" />
            <br />
            付款后加QQ 1204505056 备注购买的物料名称 获取下载地址
          </div>
          <el-card
            slot="reference"
            :body-style="{ padding: '0px' }"
            shadow="hover"
            @click.native="handleBuy"
          >
            <div class="goods-list-card-body">
              <div class="goods-list-tag-group">
                <el-tag v-if="item.isRecommend" hit type="success">推荐</el-tag>
              </div>
              <div class="goods-list-image-group">
                <div class="goods-list-image">
                  <vab-remix-icon :icon-class="item.icon"></vab-remix-icon>
                </div>
              </div>
              <div class="goods-list-title">{{ item.title }}</div>
              <div class="goods-list-price">
                <el-tag hit type="warning">¥ {{ item.price }} 元</el-tag>
                <el-tag hit>{{ item.type }}</el-tag>
              </div>
            </div>
          </el-card>
        </el-popover>
      </el-col>
    </el-row>
    <el-pagination
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
  import { getList } from "@/api/goods";

  export default {
    name: "Goods",
    components: {},
    data() {
      return {
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: "",
        },
        list: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleBuy() {},
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.fetchData();
      },
      handleQuery() {
        this.queryForm.pageNo = 1;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const { data, totalCount } = await getList(this.queryForm);
        this.list = data;
        this.total = totalCount;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .goods-list-container {
    .goods-list-card-body {
      position: relative;
      padding: $base-padding;
      cursor: pointer;

      .goods-list-tag-group {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 9;
        padding: $base-padding * 1.5;
      }

      .goods-list-image-group {
        height: 200px;
        overflow: hidden;

        .goods-list-image {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 200px;
          background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
          transition: all ease-in-out 0.3s;

          i {
            font-size: 100px;
            color: $base-color-white;
          }

          &:hover {
            transform: scale(1.1);
          }
        }
      }

      .goods-list-title {
        margin: $base-padding 0 8px 0;
        font-size: 16px;
        font-weight: bold;
      }

      .goods-list-price {
        margin: 15px 0 0;
        font-size: 14px;
        color: $base-color-orange;

        s {
          color: #c5c8ce;
        }
      }
    }
  }
</style>
