<template>
  <div class="infoForm">
    <el-form ref="form" :inline="true" label-width="auto">
      <div class="line">
        <div class="left">
          <el-form-item label="">
            <el-input v-model="form.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="form.name" placeholder="发布人"></el-input>
          </el-form-item>
          <el-form-item label="">
            <div class="select">
              <el-select v-model="form.status" placeholder="状态">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="">
            <div class="select">
              <el-select v-model="form.column" placeholder="栏目">
                <el-option
                  v-for="item in columnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker
              v-model="form.timeLimit"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker
              v-model="form.time"
              type="date"
              placeholder="创建时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <div class="select">
              <el-select v-model="form.status" placeholder="状态">
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
    </el-form>
    <div class="line line2">
      <div class="left">
        <el-button
          v-for="(item, index) in fastColumns"
          v-show="fastSHow"
          :key="index"
          :plain="!item.active"
          :type="item.active ? 'primary' : ''"
          class="fastColumn"
          @click="handelColumn(index)"
        >
          {{ item.name }}
        </el-button>
      </div>
      <div class="right">
        <el-button>草稿</el-button>
        <el-button>回收站</el-button>
        <el-button type="primary" @click="add">添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InfoForm",
    props: {
      fastSHow: {
        type: Boolean,
        default: false,
      },
      //用于判断进入哪个新增页面
      name: {
        type: String,
        default: "wengao",
      },
    },
    data() {
      return {
        fastColumns: [], //快速选择的栏目
        statusOptions: [], //状态选项
        columnOptions: [], //栏目选项
        form: {
          title: "", //标题
          name: "", //发布人
          stauts: "", //状态
          column: "", //栏目
          timeLimit: "", //时间范围
          time: "", //创建时间
        },
      };
    },
    created() {
      this.statusOptions = [
        {
          value: "选项1",
          label: "状态黄金糕",
        },
        {
          value: "选项2",
          label: "状态双皮奶",
        },
        {
          value: "选项3",
          label: "状态蚵仔煎",
        },
        {
          value: "选项4",
          label: "状态龙须面",
        },
        {
          value: "选项5",
          label: "状态北京烤鸭",
        },
      ];
      this.columnOptions = [
        {
          value: "选项1",
          label: "栏目1",
        },
        {
          value: "选项2",
          label: "栏目2",
        },
        {
          value: "选项3",
          label: "栏目3",
        },
        {
          value: "选项4",
          label: "栏目4",
        },
        {
          value: "选项5",
          label: "栏目5",
        },
      ];
      this.fastColumns = [
        { name: "推荐", active: false },
        { name: "专题", active: false },
        { name: "哈哈", active: false },
        { name: "大斯", active: false },
        { name: "选项", active: false },
        { name: "请求", active: false },
        { name: "具有", active: false },
        { name: "可乐", active: false },
        { name: "网站", active: false },
        { name: "那个", active: false },
        { name: "看见", active: false },
      ];
    },
    mounted() {},
    methods: {
      handelColumn(index) {
        // 点击了栏目定位
        this.fastColumns.forEach((val) => {
          val.active = false;
        });
        this.fastColumns[index].active = true;
      },
      search() {
        //点击了搜索
        this.$emit("search", this.form);
      },
      reset() {
        //点击了重置
        for (const i in this.form) {
          this.form[i] = "";
        }
        this.$emit("reset");
      },
      add() {
        switch (this.name) {
          case "wengao":
            this.$router.push({ name: "WengaoDetail" });
            break;
          case "tuji":
            this.$router.push({ name: "TujiDetail" });
            break;
          case "shipin":
            this.$router.push({ name: "ShipinDetail" });
            break;
          case "yinpin":
            this.$router.push({ name: "YinpinDetail" });
            break;
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .line {
    display: flex;
    justify-content: space-between;
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
  }
  .select {
    width: 120px;
  }
</style>
