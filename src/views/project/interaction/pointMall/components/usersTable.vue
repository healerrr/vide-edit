<template>
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
            {{ row.status }}
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
          <el-button type="text" @click="handleDelete(row)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getInfo } from "@/api/user";

  export default {
    name: "UsersTable",
    filters: {
      statusFilter(status) {
        const statusMap = {
          已上架: "success",
          已下架: "primary",
        };
        return statusMap[status];
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
    },
    created() {
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
        this.$emit("handleEdit", row);
      },
      handleDelete(row) {
        //点击了删除
        this.$emit("handleDelete", row);
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
