<template>
  <div class="good-container">
    <el-form ref="form" :inline="true" label-width="auto">
      <div class="line">
        <div class="left">
          <el-form-item label="用户名:">
            <el-input
              v-model="searchform.name"
              placeholder=""
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input
              v-model="searchform.phone"
              placeholder=""
              style="width: 150px"
            ></el-input>
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
    <div class="usersTable-container">
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
          label="用户名"
          prop="name"
          show-overflow-tooltip
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
          label="现有积分"
          prop="nowpoint"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          label="已用积分"
          prop="spendpoint"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          label="累计积分"
          prop="allpoint"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          label="兑换列表"
          show-overflow-tooltip
          width="100"
        >
          查看
        </el-table-column>
        <el-table-column
          align="center"
          label="获取记录"
          show-overflow-tooltip
          width="100"
        >
          查看
        </el-table-column>
        <el-table-column
          align="center"
          label="注册时间"
          prop="created_at.date"
          show-overflow-tooltip
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          label="状态"
          show-overflow-tooltip
          width="80"
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
          width="100"
        >
          <template v-slot="{ row }">
            <el-button type="text" @click="handleEdit(row)">查看</el-button>
            <el-button type="text" @click="handleDelete(row)">
              {{ row.status | buttonStatus }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
      title="用户详情"
      :visible.sync="editDialogFormVisible"
      width="50%"
    >
      <el-form :model="form" label-width="100px">
        <el-row class="">
          <el-col :span="8" class="text">用户账号: {{ form.name }}</el-col>
          <el-col :span="8" class="text">账号ID: {{ form.id }}</el-col>
        </el-row>
        <el-row class="">
          <el-col :span="8" class="text">手机号: {{ form.phone }}</el-col>
          <el-col :span="8" class="text">总积分数:{{ form.allpoint }}</el-col>
        </el-row>
        <el-row class="">
          <el-col :span="8" class="text">
            总花费积分数: {{ form.spendpoint }}
          </el-col>
          <el-col :span="8" class="text">
            剩余积分数: {{ form.allpoint }} - {{ form.spendpoint }}
          </el-col>
        </el-row>
      </el-form>
      <div class="toolbar">
        <el-alert title="兑换列表记录" type="warning"></el-alert>
        <el-table v-loading="loading">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            label="订单号"
            prop="order_number"
            width="150"
          ></el-table-column>
          <el-table-column
            label="商户名称"
            prop="good_name"
            width="200"
          ></el-table-column>
          <el-table-column
            label="支付积分"
            prop="price"
            width="50"
          ></el-table-column>
          <el-table-column label="数量" prop="num" width="50"></el-table-column>
          <el-table-column label="时间" width="130">
            <template v-slot="{ row }">
              <span>{{ row.order_time | filterOrderTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单状态" width="100">
            <template v-slot="{ row }">
              <el-tag v-if="row.status == '待发货'" type="success">
                {{ row.status }}
              </el-tag>
              <el-tag v-if="row.status == '待取货'" type="danger">
                {{ row.status }}
              </el-tag>
              <el-tag v-if="row.status == '已完成'" type="info">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-tooltip content="查看" placement="right-end" effect="light">
                <el-button
                  v-permission="['orders.show']"
                  plain
                  icon="el-icon-edit"
                  type="primary"
                  size="small"
                  @click="edit(row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="发货" placement="right-end" effect="light">
                <el-button
                  v-permission="['orders.show']"
                  plain
                  icon="el-icon-check"
                  type="primary"
                  size="small"
                  @click="send(row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import usersTable from "./components/usersTable";
  import { getInfo, updateInfo, updateStatus } from "@/api/user";

  export default {
    name: "UsersList",
    components: {},
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: "success",
          2: "primary",
        };
        return statusMap[status];
      },
      filterStatus(value) {
        let status = ["", "正常", "禁用"];
        return status[value];
      },
      buttonStatus(value) {
        let status = ["", "禁用", "启用"];
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
        total: 3,
        jifen: 0,
        listLoading: false,
        editDialogFormVisible: false,
        list: [],
        imageList: [],
        selectRows: [],
        statusOptions: [],
        fastColumns: [],
        form: {
          id: "",
          status: "",
          name: "",
        },
        catid: [],
        nowStatus: "",
        nowType: "",
        addform: {
          id: "",
          cat_name: "",
          status: 1,
        },
        searchform: {
          id: "",
          name: "",
          phone: "",
          status: "",
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
            this.listLoading = false;
            this.list.forEach((item) => {
              this.jifen = item.allpoint + this.jifen;
            });
          })
          .catch(() => {
            this.listLoading = false;
          });
      },
      search() {
        //搜索
        getInfo(this.searchform, 1, 20)
          .then((response) => {
            this.list = response.data;
            this.total = response.meta.total;
            console.log(this.total);
          })
          .catch(() => {});
      },
      reset() {
        for (const i in this.searchform) {
          this.searchform[i] = "";
        }
        this.fetchData();
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
      cancel() {
        this.editDialogFormVisible = false;
      },
      changeStatus(value) {
        let status = ["", "禁用", "启用"];
        return status[value];
      },
      changetype(value) {
        let status = ["", "2", "1"];
        return status[value];
      },
      handleDelete(row) {
        if (row.id) {
          this.nowStatus = this.changeStatus(row.status);
          this.nowType = this.changetype(row.status);
          this.$baseConfirm(
            "你确定要" + this.nowStatus + "吗",
            "",
            async () => {
              updateStatus(row.id, this.nowType)
                .then((response) => {})
                .catch(() => {});
              this.fetchData();
            }
          );
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join();
            this.$baseConfirm("你确定要禁用吗", null, async () => {
              const { msg } = await doDelete({ ids: ids });
              this.$baseMessage(msg, "success");
              this.fetchData();
            });
          } else {
            this.$baseMessage("未选中任何行", "error");
            return false;
          }
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
        getInfo(this.searchform, queryForm.pageNo, val).then((response) => {
          this.list = response.data;
          this.total = response.meta.total;
        });
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        getInfo(this.searchform, val, 20).then((response) => {
          this.list = response.data;
          this.total = response.meta.total;
        });
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
  .text {
    margin-left: 10%;
    text-align: left;
  }
  .line2 {
    margin-bottom: 20px;
  }
  .select {
    width: 120px;
  }
</style>
