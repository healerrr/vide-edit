<template>
  <div class="wengaoDetail-container">
    <el-form
      ref="wengao"
      label-width="auto"
      :model="wengao"
      label-position="left"
    >
      <div class="main">
        <div class="left">
          <el-form-item label="标题">
            <el-tooltip
              v-model="titleVisible"
              :manual="true"
              :content="titleInfo"
              effect="light"
              :hide-after="5000"
              placement="top"
            >
              <el-input
                v-model="wengao.title"
                placeholder="请输入标题"
                type="text"
                @input="titleCount"
              ></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="封面图">
            <el-radio-group v-model="wengao.imgTypeValue">
              <el-radio
                v-for="(item, index) in imgType"
                :key="item.name"
                :label="index + 1"
              >
                {{ item.name }}
              </el-radio>
            </el-radio-group>
            <div v-show="wengao.imgTypeValue === 1" class="singleImg">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-change="handleAvatarSuccessSingleImg"
                :before-upload="beforeAvatarUpload"
              >
                <el-image
                  v-if="wengao.singleImg"
                  :src="wengao.singleImg"
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
                  <div class="info">230px*175px</div>
                </div>
              </el-upload>
            </div>
            <div v-show="wengao.imgTypeValue === 2" class="three">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-change="handleAvatarSuccessOne"
                :before-upload="beforeAvatarUpload"
              >
                <el-image
                  v-if="wengao.three.img1"
                  :src="wengao.three.img1"
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
                  <div class="info">230px*175px</div>
                </div>
              </el-upload>
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-change="handleAvatarSuccessTwo"
                :before-upload="beforeAvatarUpload"
              >
                <el-image
                  v-if="wengao.three.img2"
                  :src="wengao.three.img2"
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
                  <div class="info">230px*175px</div>
                </div>
              </el-upload>
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-change="handleAvatarSuccessThree"
                :before-upload="beforeAvatarUpload"
              >
                <el-image
                  v-if="wengao.three.img3"
                  :src="wengao.three.img3"
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
                  <div class="info">230px*175px</div>
                </div>
              </el-upload>
            </div>

            <div v-show="wengao.imgTypeValue === 3" class="bigImg">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-change="handleAvatarSuccessBigImg"
                :before-upload="beforeAvatarUpload"
              >
                <el-image
                  v-if="wengao.bigImg"
                  :src="wengao.bigImg"
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
                  <div class="info">750px*422px</div>
                </div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="文章内容">
            <div style="position: relative">
              <tinymce-editor
                ref="editor"
                v-model="wengao.content"
                :disabled="disabled"
              />
            </div>
          </el-form-item>
          <el-form-item label="选择栏目">
            <el-select
              v-model="wengao.columnValue"
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
          <el-form-item label="链接">
            <el-input
              v-model="wengao.link"
              placeholder="请输入外链（选填）"
            ></el-input>
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
  </div>
</template>

<script>
  import TinymceEditor from "@/components/tinymec/index.vue";
  import rightBox from "../../components/rightBox";
  export default {
    name: "WengaoDetail",
    components: { TinymceEditor, rightBox },
    data() {
      return {
        disabled: false,
        titleInfo: "", //标题字数改变提示内容
        titleVisible: false, //标题字数控制
        imgType: [
          { name: "单图右" },
          { name: "三图" },
          { name: "大图" },
          { name: "无" },
        ], // 图片模式的选择
        columns: [
          { label: "栏目1", value: "1" },
          { label: "栏目2", value: "2" },
          { label: "栏目3", value: "3" },
          { label: "栏目4", value: "4" },
          { label: "栏目5", value: "5" },
        ], // 栏目选择
        wengao: {
          title: "",
          content: "", // 文章内容
          imgTypeValue: 1, // 图片类型
          three: {
            // 三图模式
            img1: "",
            img2: "",
            img3: "",
          },
          singleImg: "", // 单图右模式
          bigImg: "", // 大图模式
          columnValue: "", // 选择的栏目
          link: "", // 链接
          // 下面的是右侧的
          summary: "", // 摘要
          author: "", // 作者
          source: "", // 来源
          tags: [], // 标签
          readNum: "", // 初始阅读量
          starNum: "", // 初始赞数
          articleTypeValue: "", // 文章类型 如广告，热点之类
          commentOff: false, // 是否关闭评论
          time: "", // 定时发布的时间
        },
      };
    },
    created() {},
    mounted() {},
    methods: {
      titleCount(val) {
        //标题字数变化
        let lth = val.length;
        this.titleVisible = false;
        if (lth > 20 && lth < 30) {
          this.titleInfo = "右图第二行开始";
          this.titleVisible = true;
        }
        if (lth > 30) {
          this.titleInfo = "通栏第二行开始";
          this.titleVisible = true;
        }
      },
      beforeAvatarUpload() {
        // 图片上传前
      },
      handleAvatarSuccessOne(res, file) {
        // 图片上传之后
        this.wengao.three.img1 = window.URL.createObjectURL(res.raw);
      },
      handleAvatarSuccessTwo(res, file) {
        // 图片上传之后
        this.wengao.three.img2 = window.URL.createObjectURL(res.raw);
      },
      handleAvatarSuccessThree(res, file) {
        // 图片上传之后
        this.wengao.three.img3 = window.URL.createObjectURL(res.raw);
      },
      handleAvatarSuccessSingleImg(res, file) {
        // 单图右上传后
        this.wengao.singleImg = window.URL.createObjectURL(res.raw);
      },
      handleAvatarSuccessBigImg(res, file) {
        //大图上传后
        this.wengao.bigImg = window.URL.createObjectURL(res.raw);
      },
      addNewTag(val) {
        this.newTagShow = true;
      },
      submit() {
        //发布
        console.log(this.$refs.minor.form);
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

  .three,
  .singleImg,
  .bigImg {
    display: flex;
    flex-wrap: wrap;
  }
  .avatar-uploader {
    flex: none;
    margin-right: 10px;
    margin-bottom: 20px;
    border: 1px dashed #ccc;
    &:hover {
      border-color: #409eff;
    }
    &:nth-child(3) {
      margin-right: 0;
    }
  }
  .three,
  .singleImg {
    .avatar-uploader {
      width: 230px;
      height: 175px;
    }
    .el-avatar {
      width: 230px;
      height: 175px;
    }
    .uploadImg {
      width: 100%;
      height: 175px;
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
  .bigImg {
    .avatar-uploader {
      width: 375px;
      height: 211px;
    }
    .el-avatar {
      width: 375px;
      height: 211px;
    }
    .uploadImg {
      width: 100%;
      height: 211px;
    }
  }
  .selectColumn {
    width: 100%;
  }
</style>
