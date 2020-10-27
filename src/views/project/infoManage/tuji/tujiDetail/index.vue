<template>
  <div class="tujiDetail-container">
    <el-form ref="tuji" label-width="auto" :model="tuji" label-position="left">
      <div class="main">
        <div class="left">
          <el-form-item label="标题">
            <el-input v-model="tuji.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="图集">
            <div class="btn">
              <el-button type="primary" @click="dialogVisible = !dialogVisible">
                添加图片
              </el-button>
              <div class="info">只能上传jpg/png后缀的图片，且不超过500kb</div>
            </div>
            <div class="tuji">
              <vab-draggable :list="list" v-bind="dragOptions" class="wrapper">
                <div v-for="(item, index) in list" :key="index" class="card">
                  <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-image :src="item.img" fit="fill" class="pickture">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <div class="bottom">
                      <el-button
                        icon="el-icon-edit"
                        class="btn"
                        @click="editPickture(item)"
                      ></el-button>
                      <el-popover
                        v-model="item.delVisible"
                        placement="top"
                        width="180"
                      >
                        <p>确定删除这张图片吗？</p>
                        <div style="margin: 0; text-align: right">
                          <el-button
                            size="mini"
                            type="text"
                            @click="item.delVisible = false"
                          >
                            取消
                          </el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="delPickture(item, index)"
                          >
                            确定
                          </el-button>
                        </div>
                        <el-button
                          slot="reference"
                          icon="el-icon-delete"
                          class="btn"
                        ></el-button>
                      </el-popover>
                    </div>
                  </el-card>
                </div>
              </vab-draggable>
            </div>
          </el-form-item>
          <el-form-item label="选择栏目">
            <el-select
              v-model="tuji.columnValue"
              class="selectColumn"
              multiple
              placeholder="请选择栏目（多选）"
            >
              <el-option
                v-for="item in columns"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <rightBox ref="minor" class="right" />
      </div>
    </el-form>
    <div>
      <el-button>预览</el-button>
      <el-button>保存草稿</el-button>
      <el-button type="primary" @click="submit">发布</el-button>
    </div>
    <el-dialog title="上传图片" :visible.sync="dialogVisible" width="440px">
      <div class="imgUpContent">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-image
            v-if="imgUp.newImg"
            :src="imgUp.newImg"
            fit="fill"
            class="uploadImg"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div v-else class="imgUpWrapper">
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <br />
            <div class="info">400px*300px</div>
          </div>
        </el-upload>
        <el-input
          v-model="imgUp.title"
          placeholder="请填写图片名称"
          style="width: 400px; margin-top: 20px"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import rightBox from "../../components/rightBox";
  import vabDraggable from "vuedraggable";

  export default {
    name: "TujiDetail",
    components: { vabDraggable, rightBox },
    data() {
      return {
        dialogVisible: false, //上穿图片弹窗控制
        columns: [
          { label: "栏目1", value: "1" },
          { label: "栏目2", value: "2" },
          { label: "栏目3", value: "3" },
          { label: "栏目4", value: "4" },
          { label: "栏目5", value: "5" },
        ], // 栏目选择
        tuji: {
          title: "",
          columnValue: "", // 选择的栏目
        },
        list: [],
        imgUp: {
          newImg: "", //新上传的图片
          title: "", //新上传图片的名称
        },
      };
    },
    computed: {
      dragOptions() {
        return {
          animation: 600,
          group: "description",
        };
      },
    },
    created() {
      this.list = [
        {
          id: 1,
          img:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          title: "这是标题1",
          delVisible: false,
        },
        {
          id: 2,
          img:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          title: "这是标题2",
          delVisible: false,
        },
        {
          id: 3,
          img:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          title: "这是标题3",
          delVisible: false,
        },
        {
          id: 4,
          img:
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
          title: "这是标题4",
          delVisible: false,
        },
        {
          id: 5,
          img:
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
          title: "这是标题5",
          delVisible: false,
        },
        {
          id: 111,
          img:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          title: "这是标题2",
          delVisible: false,
        },
        {
          id: 332,
          img:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          title: "这是标题3",
          delVisible: false,
        },
        {
          id: 454,
          img:
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
          title: "这是标题4",
          delVisible: false,
        },
        {
          id: 576,
          img:
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
          title: "这是标题5",
          delVisible: false,
        },
      ];
    },
    mounted() {},
    methods: {
      submit() {},
      editPickture(val) {
        //编辑图片
        this.$prompt("请修改图片标题", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValue: val.title,
        })
          .then((val) => {})
          .catch(() => {});
      },
      delPickture(val, index) {
        //删除图片
        this.list[index].delVisible = false;
        this.list = this.list.filter((item) => item.id !== val.id);
      },
      beforeAvatarUpload() {
        //图片上传前
      },
      handleAvatarSuccess(res, file) {
        //图片上传成功
        this.imgUp.newImg = window.URL.createObjectURL(res.raw);
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
    }
    .right {
      flex: none;
    }
  }
  .selectColumn {
    width: 100%;
  }
  .tuji {
    width: 100%;
    height: 500px;
    padding: 10px;
    overflow-y: scroll;
    border: 1px solid $base-border-color;
  }
  .btn {
    text-align: right;
    .info {
      font-size: $base-font-size-small;
      color: $info-font-color;
    }
  }
  .bottom {
    margin-top: -10px;
    .btn {
      width: 50%;
      text-align: center;
      border-radius: 0;
    }
  }

  .wrapper {
    display: flex;
    flex-wrap: wrap;
    .card {
      width: 135px;
      margin-right: 1px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      .pickture {
        height: 101.25px;
      }
    }
  }
  ::v-deep .el-upload {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .imgUpContent {
    .avatar-uploader {
      width: 400px;
      height: 300px;
      border: 1px dashed #ccc;
      &:hover {
        border-color: #409eff;
      }
    }
    .el-avatar {
      width: 400px;
      height: 300px;
    }
    .uploadImg {
      width: 100%;
      height: 300px;
    }
    .imgUpWrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      line-height: 2;
      transform: translate(-50%, -50%);
      .info {
        font-size: $base-font-size-small;
        color: $info-font-color;
      }
    }
  }
</style>
