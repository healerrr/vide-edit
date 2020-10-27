<template>
  <div class="select-excel-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-form :inline="true" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="filename" placeholder="请输出要导出文件的名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleDownload">
              导出选中行
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" />
      <el-table-column align="center" label="序号" width="55">
        <template v-slot="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template v-slot="{ row }">
          {{ row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者">
        <template v-slot="{ row }">
          <el-tag>{{ row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="访问量" width="115">
        <template v-slot="{ row }">
          {{ row.pageViews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template v-slot="{ row }">
          <span>{{ row.datetime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getList } from "@/api/table";

  export default {
    name: "ExportSelectExcel",
    data() {
      return {
        list: [],
        listLoading: true,
        multipleSelection: [],
        downloadLoading: false,
        filename: "",
      };
    },
    created() {
      //防止三级以上路由时多次走created
      if (this.$route.name === this.$options.name) this.fetchData();
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        getList(this.listQuery).then((response) => {
          this.list = response.data;
          this.listLoading = false;
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDownload() {
        if (this.multipleSelection.length) {
          this.downloadLoading = true;
          import("@/utils/excel").then((excel) => {
            const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
            const filterVal = [
              "id",
              "title",
              "author",
              "pageViews",
              "datetime",
            ];
            const list = this.multipleSelection;
            const data = this.formatJson(filterVal, list);
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.filename,
            });
            this.$refs.multipleTable.clearSelection();
            this.downloadLoading = false;
          });
        } else {
          this.$baseMessage("请至少选择一行", "error");
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]));
      },
    },
  };
</script>
