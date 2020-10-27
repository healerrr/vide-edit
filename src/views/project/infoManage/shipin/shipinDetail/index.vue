<template>
  <div class="shipinDetail-container">
    <el-form
      ref="shipin"
      label-width="auto"
      :model="shipin"
      label-position="left"
    >
      <div class="main">
        <div class="left">
          <el-form-item label="标题">
            <el-input
              v-model="shipin.title"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="封面图">
            <el-radio-group v-model="shipin.imgTypeValue">
              <el-radio
                v-for="(item, index) in imgType"
                :key="item.name"
                :label="index + 1"
              >
                {{ item.name }}
              </el-radio>
            </el-radio-group>
            <div v-show="shipin.imgTypeValue === 1" class="horizontal">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-change="handleAvatarSuccessHorizontalImg"
                :before-upload="beforeAvatarUpload"
              >
                <el-image
                  v-if="shipin.horizontalImg"
                  :src="shipin.horizontalImg"
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
            <div v-show="shipin.imgTypeValue === 2" class="vertical">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-change="handleAvatarSuccessVerticalImg"
                :before-upload="beforeAvatarUpload"
              >
                <el-image
                  v-if="shipin.verticalImg"
                  :src="shipin.verticalImg"
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
                  <div class="info">375px*507px</div>
                </div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="添加视频">
            <el-button type="primary">添加视频</el-button>
            <el-button>视频媒资库</el-button>
          </el-form-item>
          <el-form-item label="内容">
            <tinymce-editor
              ref="editor"
              v-model="shipin.content"
              :disabled="disabled"
            />
          </el-form-item>
          <el-form-item label="选择栏目">
            <el-select
              v-model="shipin.columnValue"
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
  </div>
</template>

<script>
  import rightBox from "../../components/rightBox";
  import TinymceEditor from "@/components/tinymec/index.vue";
  export default {
    name: "ShipinDetail",
    components: { rightBox, TinymceEditor },
    data() {
      return {
        disabled: false,
        imgType: [{ name: "横图" }, { name: "竖图" }], // 图片模式的选择
        columns: [
          { label: "栏目1", value: "1" },
          { label: "栏目2", value: "2" },
          { label: "栏目3", value: "3" },
          { label: "栏目4", value: "4" },
          { label: "栏目5", value: "5" },
        ], // 栏目选择
        shipin: {
          title: "",
          imgTypeValue: 1, //封面图种类
          horizontalImg: "", //横图的图片
          verticalImg: "", //竖图的图片
          content: "",
          columnValue: "",
        },
      };
    },
    created() {},
    mounted() {},
    methods: {
      handleAvatarSuccessHorizontalImg() {
        //横图上传
      },
      handleAvatarSuccessVerticalImg() {
        //竖图上传
      },
      beforeAvatarUpload() {
        //图片上传前
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
  .horizontal {
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
  .vertical {
    .avatar-uploader {
      width: 177.5px;
      height: 253.5px;
    }
    .el-avatar {
      width: 177.5px;
      height: 253.5px;
    }
    .uploadImg {
      width: 100%;
      height: 253.5px;
    }
  }
  .selectColumn {
    width: 100%;
  }
</style>
