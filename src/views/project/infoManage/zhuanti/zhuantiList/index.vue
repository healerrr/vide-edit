<template>
  <div class="specialList-container">
    <el-form ref="form" :inline="true" label-width="auto">
      <el-form-item label="">
        <el-input v-model="form.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="form.timeLimit"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <div class="select">
          <el-select v-model="form.status" placeholder="状态">
            <el-option
              v-for="item in statusOptions"
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
    <div class="line">
      <div class="left">
        <el-radio-group v-model="form.fastSearch">
          <el-radio-button
            v-for="(item, index) in fastColumns"
            :key="index"
            :label="item.name"
          ></el-radio-button>
        </el-radio-group>
      </div>
      <div class="right">
        <el-button type="primary" @click="add">添加专题</el-button>
      </div>
    </div>
    <infoTable
      :need-column="false"
      :need-type="true"
      :need-commit="false"
      :need-star="false"
      :need-read="true"
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
  import infoTable from "../../components/infoTable";
  export default {
    name: "SpecialList",
    components: {
      infoTable,
    },
    data() {
      return {
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
        statusOptions: [],
        fastColumns: [],
        form: {
          title: "",
          timeLimit: "",
          status: "",
          name: "",
          fastSearch: "",
        },
      };
    },
    created() {
      this.statusOptions = [
        {
          value: "选项1",
          label: "状态黄金糕",
        },
        {
          value: "选项2",
          label: "状态双皮奶",
        },
        {
          value: "选项3",
          label: "状态蚵仔煎",
        },
        {
          value: "选项4",
          label: "状态龙须面",
        },
        {
          value: "选项5",
          label: "状态北京烤鸭",
        },
      ];
      this.fastColumns = [
        { name: "全部" },
        { name: "新闻" },
        { name: "活动" },
        { name: "营销" },
        { name: "市领导活动" },
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
      add() {
        this.$router.push({ name: "ZhuantiDetail" });
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
</style>
