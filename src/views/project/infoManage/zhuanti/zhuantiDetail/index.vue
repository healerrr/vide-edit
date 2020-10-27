<template>
  <div class="zhuantiDetail-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="专题属性" name="first">
        <el-form
          v-if="activeName === 'first'"
          ref="zhuanti"
          label-width="auto"
          :model="zhuanti"
          label-position="left"
        >
          <div class="main">
            <div class="left">
              <el-form-item label="分类">
                <el-radio-group v-model="zhuanti.type">
                  <el-radio
                    v-for="(item, index) in types"
                    :key="item.name"
                    :label="index + 1"
                  >
                    {{ item.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="标题">
                <el-input
                  v-model="zhuanti.title"
                  placeholder="请输入标题"
                  type="text"
                ></el-input>
              </el-form-item>
              <el-form-item label="顶图">
                <div class="topImg">
                  <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :on-change="handleAvatarSuccessTopImg"
                    :before-upload="beforeAvatarUpload"
                  >
                    <el-image
                      v-if="zhuanti.topImg"
                      :src="zhuanti.topImg"
                      fit="fill"
                      class="uploadImg"
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <div v-else class="imgUpwrapper">
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                      <br />
                      <div class="info">900px*350px,500k以内</div>
                    </div>
                  </el-upload>
                </div>
              </el-form-item>

              <el-form-item label="栏目">
                <div
                  v-for="(item, index) in columns"
                  :key="index"
                  class="column-line"
                >
                  <el-input
                    v-model="item.name"
                    placeholder="请输入栏目名称"
                  ></el-input>
                  <el-input
                    v-model="item.sort"
                    class="sort"
                    @change="sortChange()"
                  ></el-input>
                  <el-button @click="del(index)">删除</el-button>
                </div>
                <el-button @click="addColumn">添加栏目</el-button>
              </el-form-item>
            </div>
            <rightBox
              ref="minor"
              class="right"
              :need-tags="false"
              :need-num="false"
            />
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="专题内容" name="second">
        <div v-if="activeName === 'second'" class="second">
          <div class="column-l">
            <div
              v-for="(item, index) in columns"
              :key="index"
              class="column"
              :class="item.active ? 'active' : ''"
              @click="handelColumn(item.id, index)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="column-r">
            <div class="search">
              <div class="search-l">
                <el-input
                  v-model="content.search.title"
                  placeholder="请输入标题"
                  style="width: 200px; margin-top: 10px; margin-right: 10px"
                ></el-input>
                <el-date-picker
                  v-model="content.search.timeLimit"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="margin-top: 10px; margin-right: 10px"
                ></el-date-picker>
                <el-button style="margin-top: 10px">搜索</el-button>
              </div>
              <div class="search-r">
                <el-button type="primary" @click="add.dialogVisible = true">
                  添加内容
                </el-button>
              </div>
            </div>
            <infoTable
              :need-select="false"
              :need-id="false"
              :need-column="false"
              :need-sort="true"
              :need-star="false"
              :need-commit="false"
              :need-verify="false"
              :list="content.list"
              :list-loading="content.listLoading"
              @handleEdit="handleEdit"
              @handleDelete="handleDelete"
              @handleSort="handleSort"
            ></infoTable>
            <el-pagination
              :current-page="content.queryForm.pageNo"
              :layout="content.layout"
              :page-size="content.queryForm.pageSize"
              :total="content.total"
              background
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="添加内容"
      :visible.sync="add.dialogVisible"
      width="1000px"
    >
      <el-row :gutter="20">
        <el-col :span="4">
          <el-tree
            :data="data"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick"
          ></el-tree>
        </el-col>
        <el-col :span="20" class="addBox">
          <div class="search" style="margin-bottom: 10px">
            <el-input
              v-model="add.search.title"
              placeholder="请输入标题"
              style="width: 200px; margin-top: 10px; margin-right: 10px"
            ></el-input>
            <el-date-picker
              v-model="add.search.timeLimit"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="margin-top: 10px; margin-right: 10px"
            ></el-date-picker>
            <el-button style="margin-top: 10px">搜索</el-button>
          </div>
          <infoTable
            :need-select="false"
            :need-id="false"
            :need-column="false"
            :need-star="false"
            :need-commit="false"
            :need-edit="false"
            :need-del="false"
            :need-verify="false"
            :need-add="true"
            :list="add.list"
            :list-loading="add.listLoading"
            @handleAdd="handleAdd"
          ></infoTable>
          <el-pagination
            :current-page="add.queryForm.pageNo"
            :layout="add.layout"
            :page-size="add.queryForm.pageSize"
            :total="add.total"
            background
            @current-change="handleCurrentChangeAdd"
            @size-change="handleSizeChangeAdd"
          ></el-pagination>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add.dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import infoTable from "../../components/infoTable";
  import rightBox from "../../components/rightBox";
  export default {
    name: "ZhuantiDetail",
    components: { infoTable, rightBox },
    data() {
      return {
        activeName: "first",
        types: [{ name: "新闻" }, { name: "活动" }, { name: "市领导报告" }], // 图片模式的选择
        zhuanti: {
          title: "",
          type: 1,
          topImg: "",
        },

        columns: [
          { name: "栏目一", id: 1, sort: 1, active: true },
          { name: "栏目二", id: 2, sort: 2, active: false },
          { name: "栏目三", id: 3, sort: 3, active: false },
          { name: "栏目四", id: 4, sort: 4, active: false },
          { name: "栏目五", id: 5, sort: 5, active: false },
        ],
        content: {
          search: {
            title: "",
            timeLimit: "",
          }, //搜索
          layout: "total, sizes, prev, pager, next, jumper",
          queryForm: {
            pageNo: 1,
            pageSize: 20,
          },
          total: 0,
          listLoading: false,
          list: [],
        },
        add: {
          search: {
            title: "",
            timeLimit: "",
          }, //搜索
          layout: "total, sizes, prev, pager, next, jumper",
          queryForm: {
            pageNo: 1,
            pageSize: 20,
          },
          total: 0,
          listLoading: false,
          list: [],
          dialogVisible: false,
        },
        data: [
          {
            label: "一级 1",
            children: [
              {
                label: "二级 1-1",
                children: [
                  {
                    label: "三级 1-1-1",
                  },
                ],
              },
            ],
          },
          {
            label: "一级 2",
            children: [
              {
                label: "二级 2-1",
                children: [
                  {
                    label: "三级 2-1-1",
                  },
                ],
              },
              {
                label: "二级 2-2",
                children: [
                  {
                    label: "三级 2-2-1",
                  },
                ],
              },
            ],
          },
          {
            label: "一级 3",
            children: [
              {
                label: "二级 3-1",
                children: [
                  {
                    label: "三级 3-1-1",
                  },
                ],
              },
              {
                label: "二级 3-2",
                children: [
                  {
                    label: "三级 3-2-1",
                  },
                ],
              },
            ],
          },
        ],
        defaultProps: {
          children: "children",
          label: "label",
        },
      };
    },
    created() {
      this.content.list = [
        {
          id: 1,
          imgsrc:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          title: "这是标题这是标题这是标题这是标题",
          column: "新闻中心",
          status: "已审核",
          name: "aa",
          time: "2020-06-05 17:00:12",
          sort: 1,
          isAdd: true,
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
          sort: 211,
          isAdd: false,
        },
        {
          id: 2,
          imgsrc: "",
          title: "的萨科i发的快乐就是",
          column: "新闻中心",
          status: "已打回",
          name: "a33",
          time: "2020-05-05 17:00:12",
          sort: 32,
          isAdd: false,
        },
      ];
      this.add.list = this.content.list;
    },
    mounted() {},
    methods: {
      beforeAvatarUpload() {
        //图片上传前
      },
      beforeShareUpload() {
        //分享图上传前
      },
      handleAvatarSuccessTopImg(res, file) {
        //顶图上传
        this.zhuanti.topImg = window.URL.createObjectURL(res.raw);
      },
      addColumn() {
        //新增栏目
        this.columns.push({
          name: "",
          active: false,
          sort: parseInt(this.columns[this.columns.length - 1].sort) + 1,
        });
      },
      sortChange(val) {
        //排序变化
        this.columns.sort(function (a, b) {
          return a.sort - b.sort;
        });
      },
      del(index) {
        //删除
        this.columns.splice(index, 1);
      },
      handelColumn(id, index) {
        //选择了栏目
        this.columns.forEach((val) => (val.active = false));
        this.columns[index].active = true;
      },
      async getList() {},
      async getAddList() {},
      handleEdit(row) {
        //点击编辑
        console.log(row);
      },
      handleDelete(row) {
        //点击删除
        console.log(row);
      },
      handleSort(row) {
        //改变排序
        console.log(row);
        this.$prompt("请输入排序值", "提示", {
          inputValue: row.sort,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            row.sort = value;
          })
          .catch(() => {});
      },
      handleAdd(row) {
        row.isAdd = !row.isAdd;
      },
      handleSizeChange(val) {
        this.content.queryForm.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.content.queryForm.pageNo = val;
        this.getList();
      },
      handleCurrentChangeAdd(val) {
        this.add.queryForm.pageSize = val;
        this.getAddList();
      },
      handleSizeChangeAdd(val) {
        this.add.queryForm.pageNo = val;
        this.getAddList();
      },
      handleNodeClick(data) {
        console.log(data);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow-x: scroll;
    .left {
      flex: none;
      width: 780px;
      margin-right: 50px;
      .column-line {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .sort {
          width: 100px;
          margin-right: 10px;
          margin-left: 10px;
        }
      }
    }
    .right {
      flex: none;
      width: 400px;
      padding-top: 10px;
      padding-left: 10px;
      margin-bottom: 20px;
      border-left: 1px solid $base-border-color;
      .ipts {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        color: $base-font-color;
        .ipts-l {
          width: 50%;
          white-space: nowrap;
        }
        .ipts-r {
          display: flex;
          width: 50%;
        }
        .ipt {
          width: 100%;
        }
      }
      .time {
        display: flex;
        .demonstration {
          margin-right: 10px;
        }
        .el-input {
          flex: 1;
        }
      }
    }
  }
  .info {
    font-size: $base-font-size-small;
    color: $info-font-color;
  }
  .avatar-uploader {
    flex: none;
    margin-right: 10px;
    margin-bottom: 20px;
    border: 1px dashed #ccc;
    &:hover {
      border-color: #409eff;
    }
  }
  ::v-deep .el-upload {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .imgUpwrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .info {
      font-size: $base-font-size-small;
      color: $info-font-color;
    }
  }
  .topImg {
    .avatar-uploader {
      width: 450px;
      height: 175px;
    }
    .el-avatar {
      width: 450px;
      height: 175px;
    }
    .uploadImg {
      width: 100%;
      height: 175px;
    }
  }
  .shareImg {
    .avatar-uploader {
      width: 120px;
      height: 120px;
    }
    .el-avatar {
      width: 120px;
      height: 120px;
    }
    .uploadImg {
      width: 100%;
      height: 120px;
    }
  }
  .second {
    display: flex;
    .column-l {
      flex: none;
      width: 150px;
      .column {
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        border-bottom: 1px solid #ccc;
      }
      .active {
        color: $base-menu-color-active;
        background-color: $base-color-default;
      }
    }
    .column-r {
      flex: 1;
      padding-left: 20px;
      overflow-x: scroll;
      border-left: 1px solid #ccc;
    }
    .search {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .search-l {
        display: flex;
        flex-wrap: wrap;
      }
      .search-r {
        flex: none;
        width: auto;
        margin-left: 30px;
        text-align: right;
      }
    }
  }
  .addBox {
    padding: 20px;
    border: 1px solid $base-border-color;
  }
</style>
