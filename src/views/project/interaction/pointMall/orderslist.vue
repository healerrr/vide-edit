<template>
  <div class="good-container">
    <el-form ref="form" :inline="true" label-width="auto">
      <div class="line">
        <div class="left">
          <el-form-item label=" 订单号:">
            <el-input
              v-model="searchform.order_number"
              placeholder=" 订单号"
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <div class="select">
              <el-select
                v-model="searchform.status"
                placeholder="状态"
                style="width: 100px"
              >
                <el-option label="待发货" value="1"></el-option>
                <el-option label="待取货" value="2"></el-option>
                <el-option label="已完成" value="3"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="提交时间:">
            <el-date-picker
              v-model="searchform.timeLimit"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 400px"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="right">
          <el-button @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </div>
    </el-form>

    <el-alert
      :title="'列表总计' + total + '项：总积分合计' + jifen"
      type="success"
    ></el-alert>
    <div class="ordersTable-container">
      <el-table
        ref="tableSort"
        v-loading="listLoading"
        :data="list"
        fit="true"
        @selection-change="setSelectRows"
        @sort-change="tableSortChange"
      >
        <el-table-column
          align="center"
          show-overflow-tooltip
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          align="center"
          label="订单号"
          prop="order_number"
          show-overflow-tooltip
          width=""
        ></el-table-column>
        <el-table-column
          align="center"
          label="商品名称"
          prop="good_name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          label="支付积分"
          prop="price"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          label="数量"
          prop="num"
          show-overflow-tooltip
          width="50"
        ></el-table-column>
        <el-table-column
          align="center"
          label="用户名"
          prop="merchant_name"
          show-overflow-tooltip
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          label="手机号码"
          prop="phone"
          show-overflow-tooltip
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          label="提交时间"
          prop="order_time"
          show-overflow-tooltip
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          label="状态"
          show-overflow-tooltip
          width="100"
        >
          <template v-slot="{ row }">
            <el-tag :type="row.status | statusFilter">
              {{ row.status | filterStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          show-overflow-tooltip
          width="150"
        >
          <template v-slot="{ row }">
            <el-link type="primary" :underline="false" @click="handleEdit(row)">
              查看
            </el-link>

            <el-link
              type="primary"
              :underline="false"
              style="padding-left: 10px"
              @click="handleDelete(row)"
            >
              {{ row.status | buttonStatus }}
            </el-link>
          </template>
        </el-table-column>
      </el-table>

      <div class="btns">
        <el-row>
          <el-col :span="24">
            <el-button plain icon="el-icon" @click="download()">
              下载订单
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-pagination
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <el-dialog
      title="查看订单"
      :visible.sync="editDialogFormVisible"
      width="40%"
    >
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单号" prop="order_number">
              <el-input
                v-model="form.order_number"
                :disabled="isEdit === true"
                placeholder="请输入订单编号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称" prop="good_name">
              <el-input
                v-model="form.good_name"
                :disabled="isEdit === true"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品类型" prop="cat_name">
              <el-input
                v-model="form.cat_name"
                :disabled="isEdit === true"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="兑换积分" prop="price">
              <el-input
                v-model="form.price"
                :disabled="isEdit === true"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="兑换数量" prop="num">
              <el-input
                v-model="form.num"
                :disabled="isEdit === true"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="兑换时间" prop="order_time">
              <el-input
                v-model="form.order_time"
                :disabled="isEdit === true"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="领取方式" prop="order_time">
              <el-input
                v-model="form.order_time"
                :disabled="isEdit === true"
                placeholder=""
              >
                邮寄
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收货人" prop="merchant_name">
              <el-input
                v-model="form.merchant_name"
                :disabled="isEdit === true"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货地址" prop="merchant_name">
              <el-input
                v-model="form.merchant_name"
                :disabled="isEdit === true"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="phone">
              <el-input
                v-model="form.phone"
                :disabled="isEdit === true"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单状态" prop="status">
              <el-input
                v-model="form.status"
                :disabled="isEdit === true"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel()">确 定</el-button>
        <el-button @click="cancel()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getInfo, updateInfo, exportxls } from "@/api/order";
  import ordersTable from "./components/ordersTable";
  import { batchchange } from "@/api/goods";

  //const jifen = '0'

  export default {
    name: "OrdersList",
    components: {},
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: "danger",
          2: "primary",
          3: "success",
        };
        return statusMap[status];
      },
      filterStatus(value) {
        let status = ["ff", "待取货", "待发货", "已完成"];
        return status[value];
      },
      buttonStatus(value) {
        let status = ["", "取货", "发货", ""];
        return status[value];
      },
    },
    data() {
      return {
        layout: "total, sizes, prev, pager, next, jumper",
        queryForm: {
          pageNo: 1,
          pageSize: 20,
        },
        searchform: {
          order_number: "",
          order_time: "",
          status: "",
        },
        jifen: 0,
        total: 3,
        listLoading: false,
        editDialogFormVisible: false,
        list: [],
        imageList: [],
        selectRows: [],
        statusOptions: [],
        fastColumns: [],
        form: {
          title: "",
          timeLimit: "",
          status: "",
          name: "",
        },
        catid: [],
        nowStatus: "",
        addform: {
          id: "",
          merchant_name: "",
          status: 1,
        },
      };
    },
    created() {
      this.fetchData();
    },
    mounted() {},
    methods: {
      async fetchData() {
        this.listLoading = true;
        getInfo(this.searchform, 1, 20)
          .then((response) => {
            this.list = response.data;
            this.total = response.meta.total;
            this.list.forEach((item) => {
              this.jifen += item.price;
            });
            this.listLoading = false;
            console.log(this.total);
          })
          .catch(() => {
            this.listLoading = false;
          });
      },
      search() {
        //搜索
        this.fetchData();
      },
      reset() {
        for (const i in this.searchform) {
          this.searchform[i] = "";
        }
        this.fetchData();
      },
      download() {
        exportxls(this.list)
          .then((response) => {
            //this.list = response.data
            location.href = "http://backend.test/" + response.info;
          })
          .catch(() => {});
      },

      cancel() {
        this.editDialogFormVisible = false;
      },
      setSelectRows(val) {
        this.selectRows = val;
        console.log(val);
      },
      tableSortChange(val) {
        this.imageList = val;
      },
      handleEdit(row) {
        this.editDialogFormVisible = true;
        if (row.id) {
          this.form = row;
        }
      },
      changeStatus(value) {
        let status = ["待取货", "待发货", "已完成"];
        return status[value];
      },
      handleDelete(row) {
        if (row.id) {
          this.nowStatus = this.changeStatus(row.status);
          //console.log(this.nowStatus)
          this.$baseConfirm(
            "你确定要" + this.nowStatus + "吗",
            "",
            async () => {
              updateInfo(row.id, row)
                .then((response) => {})
                .catch(() => {});
              this.fetchData();
            }
          );
        }
      },
      handleShenhe() {
        console.log(this.selectRows);
      },
      handleDahui() {
        console.log(this.selectRows);
      },
      handleShanchu() {
        console.log(this.selectRows);
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.fetchData();
      },
    },
  };
</script>
<style lang="scss" scoped>
  .line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .left {
      display: flex;
      flex-wrap: wrap;
      .fastColumn {
        margin-bottom: 10px;
      }
    }
    .right {
      flex: none;
      width: auto;
      margin-left: 30px;
      text-align: right;
    }
  }
  .line2 {
    margin-bottom: 20px;
  }
  .select {
    width: 120px;
  }
  .btns {
    margin-top: 10px;
  }
  .imgcover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .im {
    width: 120px;
    height: 120px;
  }
  .small {
    font-size: $base-font-size-small;
  }
</style>
