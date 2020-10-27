<template>
  <div class="infoTable-container">
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      fit="true"
      @select-all="selectChange"
      @selection-change="selectChange"
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
      <el-table-column label="图片" prop="product_img" width="150" height="60">
        <template v-slot="{ row }" style="">
          <img
            :src="filterImg(row.product_img)"
            style="width: 100px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品" prop="" show-overflow-tooltip>
        <template v-slot="{ row }">
          <div>{{ row.product_name }}</div>
          <div class="small">
            有效期:{{ row.updated_at }}至{{ row.deleted_at }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="积分"
        prop="price"
        show-overflow-tooltip
        width="100"
      ></el-table-column>
      <el-table-column
        align="center"
        label="分类"
        prop="catname"
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
        label="添加人"
        show-overflow-tooltip
        width="200"
      >
        <template v-slot="{ row }">
          <div>{{ row.author }}</div>
          <div class="small">时间：{{ row.created_at }}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="进度"
        prop="receive"
        show-overflow-tooltip
        width="160"
      >
        <template v-slot="{ row }">
          <el-progress
            :percentage="row.percent"
            :type="line"
            :show-text="false"
          ></el-progress>
          {{ row.remain_amount }} / {{ row.product_amount }}
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

    <div class="btns">
      <el-row>
        <el-col :span="24">
          <el-button plain icon="el-icon" @click="batchshenghe()">
            批量审核
          </el-button>
          <el-button plain icon="el-icon" @click="batchdahui()">
            批量打回
          </el-button>
          <el-button plain icon="el-icon" @click="batchchange()">
            批量上/下架
          </el-button>
          <el-button plain icon="el-icon" @click="batchdelete()">
            批量删除
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { getInfo, batchchange } from "@/api/goods";

  const imgurl =
    "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";

  export default {
    name: "InfoTable",
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: "success",
          2: "primary",
        };
        return statusMap[status];
      },
      filterStatus(value) {
        let status = ["", "已上架", "已下架"];
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
      imgurl,
    },
    data() {
      return {
        multiSelect: [],
        total: 20,
        test: {
          ids: [1, 2],
        },
        form: {
          product_name: "",
          jifen1: "",
          jifen2: "",
          timeLimit: [],
          status: "",
          author: "",
          catid: "1",
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
        getInfo(this.form, 1, 20)
          .then((response) => {
            this.list = response.data;
            this.total = response.meta.total;
            this.$emit("total", this.total);
            console.log(this.total);
          })
          .catch(() => {
            //this.loading = false
          });
      },

      filterImg(value) {
        let proimg = "http://backend.test/" + value;
        return proimg;
      },
      setSelectRows(val) {
        //当选择项发生变化时会触发该事件
        this.$emit("setSelectRows", val);
      },
      selectChange(selection) {
        this.multiSelect = selection;
      },
      batchshenghe() {
        let arr = [];
        this.multiSelect.forEach((item) => {
          arr.push(item.id);
        });
        console.log(arr);
      },
      batchdahui() {
        let arr = [];
        this.multiSelect.forEach((item) => {
          arr.push(item.id);
        });
        console.log(arr);
      },
      batchchange() {
        let arr = [];
        this.multiSelect.forEach((item) => {
          arr.push(item.id);
        });
        this.$baseAlert({ arr }, "商品批量上下架", () => {
          batchchange(this.test)
            .then((response) => {
              this.list = response.data;
              console.log(this.list);
            })
            .catch(() => {});
        });
      },
      batchdelete() {
        let arr = [];
        this.multiSelect.forEach((item) => {
          arr.push(item.id);
        });
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
        this.$emit("goodsedit", row);
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
