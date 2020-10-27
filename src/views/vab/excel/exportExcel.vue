<template>
  <div class="export-excel-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form :inline="true" @submit.native.prevent>
          <el-form-item label="文件名">
            <el-input v-model="filename" placeholder="请输出要导出文件的名称" />
          </el-form-item>
          <el-form-item label="文件类型">
            <el-select v-model="bookType">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="自动列宽">
            <el-radio-group v-model="autoWidth">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleDownload">
              导出 Excel
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table v-loading="listLoading" :data="list">
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
      <el-table-column align="center" label="访问量">
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
  import { Alert } from "element-ui";

  export default {
    name: "ExportExcel",
    data() {
      return {
        list: [],
        listLoading: true,
        downloadLoading: false,
        filename: "",
        autoWidth: true,
        bookType: "xlsx",
        options: ["xlsx", "csv", "txt"],
      };
    },
    created() {
      //防止三级以上路由时多次走created
      if (this.$route.name === this.$options.name) this.fetchData();
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        getList().then((response) => {
          this.list = response.data;
          this.listLoading = false;
        });
      },
      handleDownload() {
        this.downloadLoading = true;
        import("@/utils/excel").then((excel) => {
          const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
          const filterVal = ["id", "title", "author", "pageViews", "datetime"];
          const list = this.list;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType,
          });
          this.downloadLoading = false;
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) =>
          filterVal.map((j) => {
            return v[j];
          })
        );
      },
    },
  };
</script>
