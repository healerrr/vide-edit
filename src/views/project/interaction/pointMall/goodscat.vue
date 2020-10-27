<template>
  <div class="goodcat-container">
    <el-row class="line2" :span="24">
      <el-col class="right">
        <el-button type="primary" @click="add()">新建</el-button>
      </el-col>
    </el-row>
    <div class="catTable-container">
      <el-table
        ref="tableSort"
        v-loading="listLoading"
        :data="form"
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
          label="分类名称"
          prop="cat_name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="created_at"
          show-overflow-tooltip
          width=""
        ></el-table-column>
        <el-table-column
          align="center"
          label="状态"
          prop="switch"
          show-overflow-tooltip
          width="120"
        >
          <template v-slot="{ row }">
            <el-tooltip
              :content="row.switch == 0 ? '点击开启' : '点击关闭'"
              :enterable="false"
              placement="top"
            >
              <el-switch
                v-model="row.switch"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          show-overflow-tooltip
          width="100"
        >
          <template v-slot="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="新建商品分类"
        :visible.sync="addDialogFormVisible"
        width="40%"
      >
        <el-form
          ref="addForm"
          :model="addform"
          :rules="rules"
          label-width="100px"
        >
          <el-row style="display: none">
            <el-col :span="12">
              <el-form-item label="分类编号" prop="id">
                <el-input
                  v-model="addform.id"
                  placeholder="请输入分类编号"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="分类名称" prop="cat_name">
                <el-input
                  v-model="addform.cat_name"
                  placeholder="请输入分类名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="分类状态">
                <el-select
                  v-model="addform.status"
                  clearable
                  placeholder="请选择状态"
                >
                  <el-option label="开启" value="1"></el-option>
                  <el-option label="禁用" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save(1)">确 定</el-button>
          <el-button @click="cancel()">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="编辑商品分类"
        :visible.sync="editDialogFormVisible"
        width="40%"
      >
        <el-form ref="editForm" :model="editform" label-width="100px">
          <el-row style="display: none">
            <el-col :span="12">
              <el-form-item label="分类编号" prop="id">
                <el-input
                  v-model="editform.id"
                  placeholder="请输入分类编号"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="分类名称" prop="cat_name">
                <el-input
                  v-model="editform.cat_name"
                  placeholder="请输入分类名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="分类状态" prop="status">
                <el-select
                  v-model="editform.status"
                  clearable
                  placeholder="请选择状态"
                >
                  <el-option label="开启" value="1"></el-option>
                  <el-option label="禁用" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save(2)">确 定</el-button>
          <el-button @click="cancel()">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <el-pagination
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <table-edit ref="edit"></table-edit>
  </div>
</template>

<script>
  import TableEdit from "./components/editTable";
  import { addInfo, getInfo, updateInfo, deleteInfoById } from "@/api/goodcat";
  import { Tools } from "@/views/utils/Tools";

  export default {
    name: "GoodsCat",
    components: {},
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: "success",
          2: "primary",
        };
        return statusMap[status];
      },
      filterStatus(value) {
        let status = ["", "开启", "禁用"];
        return status[value];
      },
    },
    data() {
      return {
        layout: "total, prev, pager, next, jumper",
        queryForm: {
          pageNo: 1,
          pageSize: 20,
        },
        total: 20,
        listLoading: false,
        list: [],
        imageList: [],
        selectRows: [],
        statusOptions: [],
        fastColumns: [],
        rules: {},
        form: {
          id: "",
          cat_name: "",
          status: 1,
          switch: true,
        },
        addform: {
          id: "",
          cat_name: "",
          status: "",
        },
        editform: {
          id: "",
          cat_name: "",
          status: "",
        },
        addDialogFormVisible: false,
        editDialogFormVisible: false,
      };
    },
    created() {
      this.fetchData();
    },
    mounted() {},
    methods: {
      async fetchData() {
        this.listLoading = true;
        getInfo(this.form, 1, 20)
          .then((response) => {
            this.form = response.data;
            this.total = response.meta.total;
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].status == 1) {
                this.form[i].switch = true;
              } else {
                this.form[i].switch = false;
              }
            }
            this.listLoading = false;
            //console.log(this.lists)
          })
          .catch(() => {
            //this.loading = false
          });
      },
      add() {
        this.addDialogFormVisible = true;
      },
      save(type) {
        if (type == 1) {
          this.$refs.addForm.validate((valid) => {
            if (valid) {
              addInfo(this.addform).then((response) => {
                this.addDialogFormVisible = false;
                this.fetchData();
              });
            }
          });
        } else {
          updateInfo(this.editform.id, this.editform).then((response) => {
            this.editDialogFormVisible = false;
            this.fetchData();
          });
        }
      },
      cancel() {
        this.addDialogFormVisible = false;
        this.editDialogFormVisible = false;
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
        //this.$refs["edit"].showEditt(row)
        this.editDialogFormVisible = true;
        if (row.id) {
          this.editform.id = row.id;
          this.editform.cat_name = row.cat_name;
          this.editform.status = row.status;
        }
      },
      handleDelete(row) {
        if (row.id) {
          deleteInfoById(row.id).then((response) => {
            this.fetchData();
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join();
            this.$baseConfirm("你确定要删除选中项吗", null, async () => {
              const { msg } = await doDelete({ ids: ids });
              this.$baseMessage(msg, "success");
              this.fetchData();
            });
          } else {
            this.$baseMessage("未选中任何行", "error");
            return false;
          }
        }
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
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.fetchData();
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
    .right {
      flex: none;
      float: right;
      width: auto;
      margin-left: 30px;
      text-align: right;
    }
  }
  .select {
    width: 120px;
  }
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
