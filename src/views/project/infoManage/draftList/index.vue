<template>
  <div class="draft-container">
    <el-form ref="form" :inline="true" label-width="auto">
      <el-form-item label="">
        <el-input v-model="form.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="">
        <div class="select">
          <el-select v-model="form.column" placeholder="栏目">
            <el-option
              v-for="item in columnOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.name" placeholder="编辑人"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
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
  import infoTable from "../components/infoTable";
  export default {
    name: "Draft",
    components: { infoTable },
    data() {
      return {
        form: {
          title: "",
          column: "",
          name: "",
        },
        columnOptions: [],
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
      };
    },
    created() {
      this.columnOptions = [
        {
          value: "选项1",
          label: "栏目1",
        },
        {
          value: "选项2",
          label: "栏目2",
        },
        {
          value: "选项3",
          label: "栏目3",
        },
        {
          value: "选项4",
          label: "栏目4",
        },
        {
          value: "选项5",
          label: "栏目5",
        },
      ];
    },
    mounted() {},
    methods: {
      search() {
        //搜索
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
