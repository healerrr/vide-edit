<template>
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
            发货
          </el-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="btns">
      <el-row>
        <el-col :span="24">
          <el-button type="primary">下载订单</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="查看订单"
      :visible.sync="editDialogFormVisible"
      width="40%"
    >
      <el-form
        ref="addForm"
        :model="addform"
        :rules="rules"
        label-width="100px"
      >
        <el-row style="display: none">
          <el-col :span="12">
            <el-form-item label="分类编号" prop="order_number">
              <el-input
                v-model="addform.id"
                placeholder="请输入分类编号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="分类名称">
              <el-input
                v-model="addform.cat_name"
                placeholder="请输入分类名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="分类状态">
              <el-select
                v-model="addform.status"
                clearable
                placeholder="请选择状态"
              >
                <el-option label="开启" value="1"></el-option>
                <el-option label="禁用" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save()">确 定</el-button>
        <el-button @click="cancel()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getInfo } from "@/api/order";

  export default {
    name: "OrdersTable",
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: "success",
          2: "primary",
        };
        return statusMap[status];
      },
      filterStatus(value) {
        let status = ["ff", "待发货", "待取货", "已完成"];
        return status[value];
      },
    },
    components: {},
    props: {
      //用于判断表格加载状态
      listLoading: {
        type: Boolean,
        default: false,
      },
      //表格数据
      list: {
        type: Array,
        default() {
          return [];
        },
      },
      //大图查看的数据
      imageList: {
        type: Array,
        default() {
          return [];
        },
      },
      //选择项目
      selectRows: {
        type: Array,
        default() {
          return [];
        },
      },
      //是否需要审核
      shenheShow: {
        type: Boolean,
        default: true,
      },
      //是否需要打回
      dahuiShow: {
        type: Boolean,
        default: true,
      },
      // editDialogFormVisible: false,
    },
    created() {
      (this.addform = {
        id: "",
        cat_name: "",
        status: 1,
      }),
        this.fetchData();
    },
    mounted() {},
    methods: {
      async fetchData() {
        this.listLoading = true;
        getInfo(this.form, 1, 20)
          .then((response) => {
            this.list = response.data;
            console.log(this.list);
          })
          .catch(() => {
            this.loading = false;
          });
      },
      setSelectRows(val) {
        //当选择项发生变化时会触发该事件
        this.$emit("setSelectRows", val);
      },
      tableSortChange() {
        const imageList = [];
        this.$refs.tableSort.tableData.forEach((item) => {
          imageList.push(item.img);
        });
        this.$emit("tableSortChange", imageList);
      },
      handleEdit(row) {
        //点击了编辑
        //this.$emit("handleEdit", row)
        this.editDialogFormVisible = true;
        if (row.id) {
          this.addform.cat_name = row.cat_name;
        }
      },
      cancel() {
        this.editDialogFormVisible = false;
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm("你确定要发货吗", null, async () => {
            //const { msg } = await doDelete({ ids: row.id });
            this.$baseMessage(msg, "success");
            this.fetchData();
          });
        }
        //this.$emit("handleDelete", row);
      },
      handleShenhe() {
        this.$emit("handleShenhe");
      },
      handleDahui() {
        this.$emit("handleDahui");
      },
      handleShanchu() {
        this.$emit("handleShanchu");
      },
    },
  };
</script>
<style lang="scss" scoped>
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
