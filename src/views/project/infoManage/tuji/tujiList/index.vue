<template>
  <div class="tujiList-container">
    <infoForm :name="name" @search="search" @reset="reset"></infoForm>
    <infoTable
      :list-loading="listLoading"
      :list="list"
      :image-list="imageList"
      @setSelectRows="setSelectRows"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @handleShenhe="handleShenhe"
      @handleDahui="handleDahui"
      @handleShanchu="handleShanchu"
    ></infoTable>
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
  import infoForm from "../../components/infoForm";
  import infoTable from "../../components/infoTable";
  export default {
    name: "TujiList",
    components: {
      infoTable,
      infoForm,
    },
    data() {
      return {
        name: "tuji",
        layout: "total, sizes, prev, pager, next, jumper",
        queryForm: {
          pageNo: 1,
          pageSize: 20,
        },
        total: 0,
        listLoading: false,
        list: [],
        imageList: [],
        selectRows: [],
        form: {
          title: "",
          name: "",
          stauts: "",
          column: "",
          timeLimit: "",
          time: "",
        },
      };
    },
    created() {},
    mounted() {},
    methods: {
      search(val) {
        this.form = val;
        console.log(val);
      },
      reset() {
        for (const i in this.form) {
          this.form[i] = "";
        }
      },
      setSelectRows(val) {
        this.selectRows = val;
        console.log(val);
      },
      tableSortChange(val) {
        this.imageList = val;
      },
      handleEdit(row) {
        console.log(row);
      },
      handleDelete(row) {
        console.log(row);
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
      async getList() {},
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.getList();
      },
    },
  };
</script>
