<template>
  <div class="good-container">
    <el-form ref="form" :inline="true" label-width="auto">
      <div class="line">
        <div class="left">
          <el-form-item label="标题:">
            <el-input
              v-model="form.title"
              placeholder="标题"
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <div class="select">
              <el-select
                v-model="form.status"
                placeholder="状态"
                style="width: 100px"
              >
                <el-option label="已上架" value="1"></el-option>
                <el-option label="已下架" value="2"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="兑换积分:">
            <el-input
              v-model="form.jifen1"
              placeholder=""
              style="width: 50px"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input
              v-model="form.jifen2"
              placeholder=""
              style="width: 50px"
            ></el-input>
          </el-form-item>
          <el-form-item label="有效期:">
            <el-date-picker
              v-model="form.timeLimit"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 400px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="添加人:">
            <div class="select">
              <el-select
                v-model="form.author"
                placeholder="添加人"
                style="width: 150px"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
        <div class="right">
          <el-button @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </div>
    </el-form>
    <el-row class="line2" :gutter="10">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 14 }"
        :lg="{ span: 17 }"
      >
        <el-radio-group v-model="form.status" size="medium">
          <el-radio-button
            v-for="item in catid"
            :key="item.id"
            :label="item.cat_name"
            :value="item.id"
          ></el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
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
  import infoTable from "./components/infoTable";
  export default {
    name: "GoodIndex",
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
        total: 3,
        listLoading: false,
        list: [
          {
            id: 1,
            imgsrc:
              "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
            title: "2018中国常州西太湖（秋季）国际车展门票",
            column: "生活用品",
            status: "已上架",
            name: "吴加好",
            fromtime: "2018-08-17",
            endtime: "2018-08-21",
            time: "2020-06-05 17:00:12",
            comment: "21",
            star: "11",
          },
          {
            id: 2,
            imgsrc:
              "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
            title: "2018中国常州西太湖（秋季）国际车展门票",
            column: "生活用品",
            status: "已上架",
            name: "吴加好",
            fromtime: "2018-08-17",
            endtime: "2018-08-21",
            time: "2020-05-05 17:00:12",
            comment: "22",
            star: "11",
          },
          {
            id: 3,
            imgsrc:
              "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
            title: "2018中国常州西太湖（秋季）国际车展门票",
            column: "生活用品",
            status: "已下架",
            name: "吴加好",
            fromtime: "2018-08-17",
            endtime: "2018-08-21",
            time: "2020-05-05 17:00:12",
            comment: "22",
            star: "11",
          },
        ],
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
        catid: [
          {
            id: "0",
            cat_name: "全部",
          },
          {
            id: "1",
            cat_name: "生活用品",
          },
          {
            id: "2",
            cat_name: "美食",
          },
          {
            id: "3",
            cat_name: "各类卡券",
          },
          {
            id: "4",
            cat_name: "虚拟商品",
          },
          {
            id: "5",
            cat_name: "商家推广",
          },
        ],
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
        { name: "全部", active: true },
        { name: "新闻", active: false },
        { name: "活动", active: false },
        { name: "营销", active: false },
        { name: "市领导活动", active: false },
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
</style>
