<template>
  <div class="infoTable-container">
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
        label="缩略图"
        show-overflow-tooltip
        width="150"
      >
        <template v-slot="{ row }">
          <div class="imgcover">
            <el-image
              v-if="row.imgsrc.length > 0"
              :preview-src-list="imageList"
              :src="row.imgsrc"
              class="im"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品" prop="title" show-overflow-tooltip>
        <template v-slot="{ row }">
          <div>{{ row.title }}</div>
          <div class="small">有效期:{{ row.fromtime }}至{{ row.endtime }}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="积分"
        prop="comment"
        show-overflow-tooltip
        width="100"
      ></el-table-column>
      <el-table-column
        align="center"
        label="分类"
        prop="column"
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
        label="添加人"
        show-overflow-tooltip
        width="200"
      >
        <template v-slot="{ row }">
          <div>{{ row.name }}</div>
          <div class="small">时间：{{ row.time }}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="评论"
        prop="comment"
        show-overflow-tooltip
        width="60"
      ></el-table-column>
      <el-table-column
        align="center"
        label="进度"
        prop="star"
        show-overflow-tooltip
        width="160"
      >
        <template v-slot="{ row }">
          <el-progress
            :percentage="20"
            :type="line"
            :show-text="false"
          ></el-progress>
          {{ row.star }} / 40
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        width="100"
      >
        <template v-slot="{ row }">
          <el-tooltip content="编辑" effect="dark" placement="top">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              circle
              @click="handleEdit(row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" effect="dark" placement="top">
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              circle
              @click="handleDelete(row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="btns">
      <el-row>
        <el-col :span="24">
          <el-button type="primary">新建</el-button>
          <el-button plain icon="el-icon" @click="add()">批量审核</el-button>
          <el-button plain icon="el-icon" @click="add()">批量打回</el-button>
          <el-button plain icon="el-icon" @click="add()">批量上/下架</el-button>
          <el-button plain icon="el-icon" @click="add()">批量删除</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InfoTable",
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
    created() {},
    mounted() {},
    methods: {
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
