<template>
  <el-dialog
    title="编辑商品分类"
    :visible.sync="editDialogFormVisible"
    width="40%"
  >
    <el-form ref="addForm" :model="addform" :rules="rules" label-width="100px">
      <el-row style="display: none">
        <el-col :span="12">
          <el-form-item label="分类编号" prop="order_number">
            <el-input
              v-model="addform.id"
              placeholder="请输入分类编号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分类名称">
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
      <el-button type="primary" @click="save()">确 定</el-button>
      <el-button @click="cancel()">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getInfo } from "@/api/goodcat";

  export default {
    name: "TableEdit",
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
    components: {},
    mixins: [],
    props: {
      editDialogFormVisible: {
        type: Boolean,
        default: false,
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
    data() {
      return {
        value1: "1",
        lists: null,
        rules: {},
        addform: {
          id: "",
          cat_name: "",
          status: 1,
          switch: true,
        },
      };
    },
    created() {
      //this.fetchData();
    },
    mounted() {},
    methods: {
      async fetchData() {
        //this.listLoading = true;
        getInfo(this.addform, 1, 20)
          .then((response) => {
            this.addform = response.data;
            //console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].status == 1) {
                this.addform[i].switch = true;
              } else {
                this.addform[i].switch = false;
              }
            }
            //console.log(this.lists)
          })
          .catch(() => {
            //this.loading = false
          });
      },
      showEditt(row) {
        if (!row) {
          this.title = "添加";
        } else {
          this.title = "编辑";
          this.addform = Object.assign({}, row);
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.addform = this.$options.data().addform;
        this.dialogFormVisible = false;
        this.$emit("fetchData");
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.addform);
            this.$baseMessage(msg, "success");
            this.$refs["form"].resetFields();
            this.dialogFormVisible = false;
            this.$emit("fetchData");
            this.addform = this.$options.data().addform;
          } else {
            return false;
          }
        });
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
