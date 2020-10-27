<template>
  <div class="pointMall-container">
    <div class="left">编辑信息</div>
    <div class="main">
      <div class="left" style="height: 1150px">
        <el-form
          ref="ruleForm"
          :model="form"
          :rules="rules"
          label-width="100px"
        >
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
              <el-form-item label="分类" prop="catid">
                <el-select
                  v-model="form.catid"
                  size=""
                  clearable
                  placeholder="请选择"
                  style="width: 350px"
                >
                  <el-option
                    v-for="item in catid"
                    :key="item.id"
                    :value="item.id"
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
              <el-form-item label="商品图片">
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
                <el-form-item label="联系方式" prop="product_name">
                  <el-input
                    v-model="form.phone"
                    placeholder="请输入商品名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="换取地址" prop="product_name">
                  <el-input
                    v-model="form.addr"
                    placeholder="请输入商品名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注说明" prop="product_name">
                  <el-input
                    v-model="form.beizhu"
                    placeholder="请输入商品名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <el-button type="primary" @click="save()">提 交</el-button>
        <el-button @click="cancel()">取 消</el-button>
      </div>

      <div slot="footer" class="dialog-footer"></div>
    </div>
  </div>
</template>

<script>
  import { getCatId } from "@/api/goodcat";
  import { uploadByImg, addInfo, getInfoById, getInfo } from "@/api/goods";

  const imgurl = "http://backend.test/";

  export default {
    name: "GoodsEdit",
    components: {},
    data() {
      return {
        list: null,
        catid: [],
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
        rules: {
          product_name: [
            { required: true, message: "请填写商品名称", trigger: "blur" },
          ],
          catid: [{ required: true, message: "请填写分类", trigger: "change" }],
          price: [
            { required: true, message: "请填写积分价格", trigger: "blur" },
          ],
          marketprice: [
            { required: true, message: "请填写市场价格", trigger: "blur" },
          ],
          timeLimit: [
            { required: true, message: "请填写兑换日期", trigger: "change" },
          ],
          product_remark: [
            { required: true, message: "请填写描述简介", trigger: "blur" },
          ],
          product_remark2: [
            { required: true, message: "请填写活动规则", trigger: "blur" },
          ],
          product_remark3: [
            { required: true, message: "请填写活动说明", trigger: "blur" },
          ],
          product_img: [
            { required: true, message: "请填写商品图片", trigger: "blur" },
          ],
          receive: [
            { required: true, message: "请填写领取方式", trigger: "change" },
          ],
          phone: [
            { required: true, message: "请填写联系方式", trigger: "blur" },
          ],
          addr: [
            { required: true, message: "请填写换取地址", trigger: "blur" },
          ],
          beizhu: [
            { required: true, message: "请填写备注说明", trigger: "blur" },
          ],
        },
        imageUrl: "",
      };
    },
    async created() {
      let { data } = await getCatId();
      this.catid = data;
      this.fetchData();
    },
    mounted() {},
    methods: {
      async fetchData() {
        //this.listLoading = true;
        getInfoById(this.id)
          .then((response) => {
            this.form = response.data;
            console.log(this.list);
          })
          .catch(() => {
            this.loading = false;
          });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeUpload(file) {
        let fd = new FormData();
        fd.append("photo", file);
        uploadByImg(fd).then((res) => {
          let file = res.data.url;
          this.form.product_img = file;
          this.imageUrl = imgurl + "/" + file;
        });
        return true;
      },
      save() {
        console.log(this.form);
        this.form.author = "admin";
        addInfo(this.form)
          .then((response) => {
            Tools.success(this, "商品添加成功");
            //this.fetchData();
            this.$router.go(-1);
          })
          .catch((err) => {
            Tools.error(this, err.response.data);
          });
      },
      cancel() {
        this.$router.push({ name: "Good_Index" });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .main {
    display: block;
    flex-wrap: wrap;
    justify-content: space-between;
    height: auto;
    overflow-x: scroll;

    .left {
      flex: none;
      width: 1200px;
      padding-left: 300px;
      margin: 0 auto;
    }

    .right {
      flex: none;
    }

    avatar-uploader .el-upload {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
    }

    .avatar-uploader {
      width: 130px;
      height: 175px;
      border-color: #409eff;
    }
    .avatar-uploader .el-upload:hover {
      width: 130px;
      height: 175px;
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      width: 178px;
      height: 178px;
      font-size: 28px;
      line-height: 178px;
      color: #8c939d;
      text-align: center;
    }
    .avatar {
      display: block;
      height: 178px;
    }
    .avatar-uploader .el-upload-dragger {
      width: 178px;
    }
  }
</style>
