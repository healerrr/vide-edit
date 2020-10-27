<template>
  <div class="yinpinDetail-container">
    <el-form
      ref="yinpin"
      label-width="auto"
      :model="yinpin"
      label-position="left"
    >
      <div class="main">
        <div class="left">
          <el-form-item label="标题">
            <el-input
              v-model="yinpin.title"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="封面图">
            <div class="coverImg">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-change="handleAvatarSuccesscoverImg"
                :before-upload="beforeAvatarUpload"
              >
                <el-image
                  v-if="yinpin.coverImg"
                  :src="yinpin.coverImg"
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
          <el-form-item label="添加音频">
            <el-button type="primary">添加音频</el-button>
          </el-form-item>
          <el-form-item label="内容">
            <tinymce-editor
              ref="editor"
              v-model="yinpin.content"
              :disabled="disabled"
            />
          </el-form-item>
          <el-form-item label="选择栏目">
            <el-select
              v-model="yinpin.columnValue"
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
    name: "YinpinDetail",
    components: { rightBox, TinymceEditor },
    data() {
      return {
        disabled: false,
        columns: [
          { label: "栏目1", value: "1" },
          { label: "栏目2", value: "2" },
          { label: "栏目3", value: "3" },
          { label: "栏目4", value: "4" },
          { label: "栏目5", value: "5" },
        ], // 栏目选择
        yinpin: {
          title: "",
          coverImg: "", //封面的图片
          content: "",
          columnValue: "",
        },
      };
    },
    created() {},
    mounted() {},
    methods: {
      beforeAvatarUpload() {
        //图片上传前
      },
      handleAvatarSuccesscoverImg() {
        //封面图上传成功
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
  .coverImg {
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
