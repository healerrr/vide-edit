<template>
  <div class="infoTable-container">
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        v-if="needSelect"
        align="center"
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        v-if="needId"
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
      <el-table-column
        label="标题"
        prop="title"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        v-if="needColumn"
        align="center"
        label="栏目"
        prop="column"
        show-overflow-tooltip
        width="150"
      ></el-table-column>
      <el-table-column
        v-if="needType"
        align="center"
        label="分类"
        prop="type"
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
          <!-- <el-tooltip
            :content="row.status"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </el-tooltip> -->
          <el-tag :type="row.status | statusFilter" @click="changeStatus(row)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="needSort"
        align="center"
        label="排序"
        show-overflow-tooltip
        width="100"
      >
        <template v-slot="{ row }">
          <div class="wrapper">
            <div class="sort" @click="handleSort(row)">{{ row.sort }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="编辑时间"
        show-overflow-tooltip
        width="200"
      >
        <template v-slot="{ row }">
          <div>{{ row.name }}</div>
          <div class="small">{{ row.time }}</div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="needCommit"
        align="center"
        label="评论"
        prop="comment"
        show-overflow-tooltip
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="needStar"
        align="center"
        label="点赞"
        prop="star"
        show-overflow-tooltip
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="needRead"
        align="center"
        label="阅读数"
        prop="read"
        show-overflow-tooltip
        width="80"
      ></el-table-column>
      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        width="100"
      >
        <template v-slot="{ row }">
          <el-tooltip
            v-if="needEdit"
            content="编辑"
            effect="dark"
            placement="top"
          >
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              circle
              @click="handleEdit(row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            v-if="needDel"
            content="删除"
            effect="dark"
            placement="top"
          >
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              circle
              @click="handleDelete(row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            v-if="needAdd"
            effect="dark"
            placement="top"
            :content="row.isAdd ? '已添加' : '未添加'"
          >
            <vab-remix-icon
              style="font-size: 24px; cursor: pointer"
              icon-class="add-circle-line"
              :class="row.isAdd ? 'blue' : ''"
              @click="handleAdd(row)"
            ></vab-remix-icon>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="needVerify" class="btns">
      <el-button v-show="shenheShow" @click="handleShenhe">审核</el-button>
      <el-button v-show="dahuiShow" @click="handleDahui">打回</el-button>
      <el-button @click="handleShanchu">删除</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InfoTable",
    filters: {
      statusFilter(status) {
        const statusMap = {
          已审核: "success",
          待审核: "primary",
          已打回: "danger",
        };
        return statusMap[status];
      },
    },
    components: {},
    props: {
      //是否需要选择
      needSelect: {
        type: Boolean,
        default: true,
      },
      //是否需要id
      needId: {
        type: Boolean,
        default: true,
      },
      //是否需要栏目
      needColumn: {
        type: Boolean,
        default: true,
      },
      //是否需要分类
      needType: {
        type: Boolean,
        default: false,
      },
      //是否需要排序
      needSort: {
        type: Boolean,
        default: false,
      },
      //是否需要评论
      needCommit: {
        type: Boolean,
        default: true,
      },
      //是否需要点赞
      needStar: {
        type: Boolean,
        default: true,
      },
      //是否需要阅读数
      needRead: {
        type: Boolean,
        default: false,
      },
      //是否需要编辑功能
      needEdit: {
        type: Boolean,
        default: true,
      },
      //是否需要删除功能
      needDel: {
        type: Boolean,
        default: true,
      },
      //是否需要添加功能
      needAdd: {
        type: Boolean,
        default: false,
      },
      //是否需要操作
      needVerify: {
        type: Boolean,
        default: true,
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
      changeStatus(val) {
        //改变状态
        this.$emit("changeStatus", val);
      },
      handleSort(val) {
        //改变排序
        this.$emit("handleSort", val);
      },
      handleAdd(val) {
        //改变添加状态
        this.$emit("handleAdd", val);
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
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    .sort {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      border: 1px solid $base-border-color;
      border-radius: 50%;
      &:hover {
        background-color: $base-gallery-second-menu-background-active;
      }
    }
  }
  .blue {
    color: $base-color-default;
  }
</style>
