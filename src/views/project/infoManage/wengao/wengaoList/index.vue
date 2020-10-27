<template>
  <div class="wengaoList-container">
    <infoForm
      :name="name"
      :fast-s-how="true"
      @search="search"
      @reset="reset"
      @fastSearch="fastSearch"
    ></infoForm>
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
      @changeStatus="changeStatus"
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
    name: "WengaoList",
    components: {
      infoTable,
      infoForm,
    },
    data() {
      return {
        name: "wengao",
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
    created() {
      this.listLoading = true;
      this.list = [
        {
          id: 1,
          imgsrc:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          title: "这是标题这是标题这是标题这是标题",
          column: "新闻中心",
          status: "已审核",
          name: "aa",
          time: "2020-06-05 17:00:12",
          comment: "21",
          star: "11",
        },
        {
          id: 2,
          imgsrc:
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
          title: "的萨科i发的快乐就是",
          column: "新闻中心",
          status: "已打回",
          name: "ab",
          time: "2020-05-05 17:00:12",
          comment: "22",
          star: "11",
        },
        {
          id: 2,
          imgsrc: "",
          title: "的萨科i发的快乐就是",
          column: "新闻中心",
          status: "已打回",
          name: "a33",
          time: "2020-05-05 17:00:12",
          comment: "22",
          star: "11",
        },
      ];
      const imageList = [];
      this.list.forEach((item) => {
        if (item.imgsrc.length > 0) {
          imageList.push(item.imgsrc);
        }
      });
      this.imageList = imageList;
      this.listLoading = false;
    },
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
      fastSearch(val) {
        //快速搜索
        console.log(val);
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
        console.log(this.form.title);
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
      changeStatus(val) {
        //改变状态
        console.log(val);
      },
    },
  };
</script>
<style lang="scss" scoped></style>
