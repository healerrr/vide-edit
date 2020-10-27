<template>
  <div class="good-container">
    <el-form ref="searchform" :inline="true" label-width="auto">
      <div class="line">
        <div class="left">
          <el-form-item label="标题:">
            <el-input
              v-model="searchform.product_name"
              placeholder="标题"
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <div class="select">
              <el-select
                v-model="searchform.status"
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
              v-model="searchform.jifen1"
              placeholder=""
              style="width: 50px"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input
              v-model="searchform.jifen2"
              placeholder=""
              style="width: 50px"
            ></el-input>
          </el-form-item>
          <el-form-item label="有效期:">
            <el-date-picker
              v-model="searchform.timeLimit"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 400px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="添加人:">
            <div class="select">
              <el-select
                v-model="searchform.author"
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

      <el-row class="line2" :gutter="10">
        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 14 }"
          :lg="{ span: 17 }"
        >
          <el-radio-group
            v-model="searchform.catid"
            size="medium"
            @change="search"
          >
            <el-radio-button
              v-for="item in catids"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
              {{ item.cat_name }}
            </el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col class="right">
          <el-button type="primary" @click="add()">新建</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="infoTable-container">
      <el-table
        ref="infoTable"
        v-loading="listLoading"
        :data="list"
        fit="true"
        @select-all="selectChange"
        @selection-change="selectChange"
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
          label="图片"
          prop="product_img"
          width="150"
          height="60"
        >
          <template v-slot="{ row }" style="">
            <img
              :src="filterImg(row.product_img)"
              style="width: 100px; height: 80px"
            />
          </template>
        </el-table-column>
        <el-table-column label="商品" prop="" show-overflow-tooltip>
          <template v-slot="{ row }">
            <div>{{ row.product_name }}</div>
            <div class="small">
              有效期:{{ row.updated_at }}至{{ row.deleted_at }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="积分"
          prop="price"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          label="分类"
          prop="catname"
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
              {{ row.status | filterStatus }}
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
            <div>{{ row.author }}</div>
            <div class="small">时间：{{ row.created_at }}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="进度"
          prop="receive"
          show-overflow-tooltip
          width="160"
        >
          <template v-slot="{ row }">
            <el-progress
              :percentage="row.percent"
              :type="line"
              :show-text="false"
            ></el-progress>
            {{ row.remain_amount }} / {{ row.product_amount }}
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

      <div class="btns">
        <el-row>
          <el-col :span="24">
            <el-button plain icon="el-icon" @click="batchshenghe()">
              批量审核
            </el-button>
            <el-button plain icon="el-icon" @click="batchdahui()">
              批量打回
            </el-button>
            <el-button plain icon="el-icon" @click="batchchange()">
              批量上/下架
            </el-button>
            <el-button plain icon="el-icon" @click="batchdelete()">
              批量删除
            </el-button>
          </el-col>
        </el-row>
      </div>
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
    <el-dialog
      title="编辑商品分类"
      :visible.sync="editDialogFormVisible"
      width="40%"
    >
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称" prop="product_name">
              <el-input
                v-model="form.product_name"
                placeholder="请输入商品名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="分类" prop="catids">
              <el-select
                v-model="form.catid"
                size=""
                clearable
                placeholder="请选择"
                style="width: 350px"
              >
                <el-option
                  v-for="item in catids"
                  :key="item.id"
                  :value="item.cat_name"
                  :label="item.cat_name"
                >
                  {{ item.cat_name }}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="积分价格" prop="price">
              <el-input
                v-model="form.price"
                placeholder="请输入积分价格"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="市场价格" prop="marketprice">
              <el-input
                v-model="form.marketprice"
                placeholder="请输入市场价格"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="兑换日期" prop="timeLimit">
              <el-date-picker
                v-model="form.timeLimit"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 350px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总量限制">
              <el-input
                v-model="form.product_amount"
                placeholder="请输入总量限制"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="周期数量限制">
              <el-input
                v-model="form.cycle_amount"
                placeholder="请输入周期数量限制"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="周期类型" prop="cycle_type">
              <el-radio v-model="form.cycle_type" label="1">每天</el-radio>
              <el-radio v-model="form.cycle_type" label="2">每周</el-radio>
              <el-radio v-model="form.cycle_type" label="3">每月</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单数量限制">
              <el-input
                v-model="form.order_amount"
                placeholder="请输入订单数量限制"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="描述简介" prop="product_remark">
              <el-input
                v-model="form.product_remark"
                type="textarea"
                :rows="2"
                placeholder="请输入描述简介"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动规则" prop="product_remark2">
              <el-input
                v-model="form.product_remark2"
                type="textarea"
                :rows="2"
                placeholder="请输入活动规则"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动说明" prop="product_remark3">
              <el-input
                v-model="form.product_remark3"
                type="textarea"
                :rows="2"
                placeholder="请输入活动说明"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="" style="height: 240px; overflow: hidden">
          <el-col
            :span="10"
            class="first-column"
            :offset="0"
            style="height: 100%"
          >
            <el-form-item label="商品图片" prop="product_img">
              <el-upload
                ref="upload"
                class="avatar-uploader"
                drag="false"
                action="#"
                accept=".jpg,.png"
                :before-upload="beforeUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="right">
          <el-row>
            <el-col :span="12">
              <el-form-item label="领取方式" prop="receive">
                <el-radio v-model="form.receive" label="1">邮寄</el-radio>
                <el-radio v-model="form.receive" label="2">自取</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系方式" prop="phone">
                <el-input
                  v-model="form.phone"
                  placeholder="请输入联系方式"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="换取地址" prop="addr">
                <el-input
                  v-model="form.addr"
                  placeholder="请输入换取地址"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注说明" prop="beizhu">
                <el-input
                  v-model="form.beizhu"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入备注说明"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save()">确 定</el-button>
        <el-button @click="cancel()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getInfo, batchchange } from "@/api/goods";
  import { getCatId } from "@/api/goodcat";

  export default {
    name: "GoodIndex",
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: "success",
          2: "primary",
        };
        return statusMap[status];
      },
      filterStatus(value) {
        let status = ["", "已上架", "已下架"];
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
        multiSelect: [],
        total: 20,
        listLoading: false,
        editDialogFormVisible: false,
        list: [],
        imageList: [],
        selectRows: [],
        statusOptions: [
          {
            value: "选项1",
            label: "添加人1",
          },
          {
            value: "选项2",
            label: "添加人2",
          },
          {
            value: "选项3",
            label: "添加人3",
          },
          {
            value: "选项4",
            label: "添加人4",
          },
          {
            value: "选项5",
            label: "添加人5",
          },
        ],
        fastColumns: [],
        searchform: {
          product_name: "",
          jifen1: "",
          jifen2: "",
          timeLimit: [],
          status: "",
          author: "",
          catid: "1",
        },
        form: {
          product_name: "",
          catid: 1, // 类型
          price: "",
          marketprice: "",
          timeLimit: [],
          product_amount: "",
          cycle_amount: "",
          cycle_type: "",
          order_amount: "",
          product_remark: "",
          product_remark2: "",
          product_remark3: "",
          product_img: "",
          receive: "",
          phone: "",
          addr: "",
          beizhu: "",
        },
        catids: [],
      };
    },
    async created() {
      let { data } = await getCatId();
      this.catids = data;
      this.fetchData();
    },
    mounted() {},
    methods: {
      async fetchData() {
        this.listLoading = true;
        getInfo(this.searchform, 1, 20)
          .then((response) => {
            this.list = response.data;
            this.total = response.meta.total;
            this.listLoading = false;
            console.log(this.total);
          })
          .catch(() => {
            this.listLoading = false;
          });
      },

      filterImg(value) {
        let proimg = "http://backend.test/" + value;
        return proimg;
      },
      search() {
        //搜索
        getInfo(this.searchform, 1, 20)
          .then((response) => {
            this.list = response.data;
            this.total = response.meta.total;
            console.log(this.total);
          })
          .catch(() => {});
      },
      add() {
        this.$router.push({ name: "Goods_Add" });
      },
      reset() {
        this.searchform = {
          product_name: "",
          jifen1: "",
          jifen2: "",
          timeLimit: [],
          status: "",
          author: "",
          catid: "1",
        };
        getInfo(this.searchform, 1, 20).then((response) => {
          this.list = response.data;
          this.total = response.meta.total;
        });
      },
      selectChange(selection) {
        this.multiSelect = selection;
      },
      batchshenghe() {
        let arr = [];
        this.multiSelect.forEach((item) => {
          arr.push(item.id);
        });
        this.$baseAlert({ arr }, "批量审核", () => {
          batchchange(this.test)
            .then((response) => {
              this.list = response.data;
              console.log(this.list);
            })
            .catch(() => {});
        });
      },
      batchdahui() {
        let arr = [];
        this.multiSelect.forEach((item) => {
          arr.push(item.id);
        });
        this.$baseAlert({ arr }, "批量打回", () => {
          batchchange(this.test)
            .then((response) => {
              this.list = response.data;
              console.log(this.list);
            })
            .catch(() => {});
        });
      },
      batchchange() {
        let arr = [];
        this.multiSelect.forEach((item) => {
          arr.push(item.id);
        });
        this.$baseAlert({ arr }, "商品批量上下架", () => {
          batchchange(arr)
            .then((response) => {
              this.list = response.data;
              console.log(this.list);
            })
            .catch(() => {});
        });
      },
      batchdelete() {
        let arr = [];
        this.multiSelect.forEach((item) => {
          arr.push(item.id);
        });
        this.$baseAlert({ arr }, "批量删除", () => {
          batchchange(this.test)
            .then((response) => {
              this.list = response.data;
              console.log(this.list);
            })
            .catch(() => {});
        });
      },
      setSelectRows(val) {
        this.selectRows = val;
        console.log(val);
      },
      tableSortChange(val) {
        this.imageList = val;
      },
      handleEdit(row) {
        this.editDialogFormVisible = true;
        if (row.id) {
          this.form = row;
        }
      },
      cancel() {
        this.editDialogFormVisible = false;
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm("你确定要删除当前项吗", null, async () => {
            const { msg } = await doDelete({ ids: row.id });
            this.$baseMessage(msg, "success");
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
        getInfo(this.searchform, queryForm.pageNo, val).then((response) => {
          this.list = response.data;
          this.total = response.meta.total;
        });
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        getInfo(this.searchform, val, 20).then((response) => {
          this.list = response.data;
          this.total = response.meta.total;
        });
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
