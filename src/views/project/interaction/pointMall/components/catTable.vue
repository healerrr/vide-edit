<template>
  <div class="catTable-container">
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="form"
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
        label="分类名称"
        prop="cat_name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        prop="created_at"
        show-overflow-tooltip
        width=""
      ></el-table-column>
      <el-table-column
        align="center"
        label="状态"
        prop="switch"
        show-overflow-tooltip
        width="120"
      >
        <template v-slot="{ row }">
          <el-tooltip
            :content="row.switch == 0 ? '点击开启' : '点击关闭'"
            :enterable="false"
            placement="top"
          >
            <el-switch
              v-model="row.switch"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        width="100"
      >
        <template v-slot="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="editDialogFormVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>新建商品分类</span>
    </el-dialog>
  </div>
</template>

<script>
  import { getInfo } from "@/api/goodcat";

  export default {
    name: "CatTable",
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: "success",
          2: "primary",
        };
        return statusMap[status];
      },
      filterStatus(value) {
        let status = ["", "开启", "禁用"];
        return status[value];
      },
    },
    components: {},
    mixins: [],
    props: {
      // ruleForm: [
      //   {
      //     pass: "",
      //     checkPass: "",
      //     age: "",
      //   },
      // ],
      editDialogFormVisible: {
        type: Boolean,
        default: false,
      },
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
    data() {
      return {
        value1: "1",
        lists: null,
        form: {
          id: "",
          cat_name: "",
          status: 1,
          switch: true,
        },
      };
    },
    created() {
      this.fetchData();
    },
    mounted() {},
    methods: {
      async fetchData() {
        //this.listLoading = true;
        getInfo(this.form, 1, 20)
          .then((response) => {
            this.form = response.data;
            //console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].status == 1) {
                this.form[i].switch = true;
              } else {
                this.form[i].switch = false;
              }
            }
            //console.log(this.lists)
          })
          .catch(() => {
            //this.loading = false
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
