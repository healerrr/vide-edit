<template>
  <div class="rightBox">
    <el-form-item label="" label-width="0px">
      <el-input
        v-model="form.summary"
        type="textarea"
        placeholder="请填写摘要"
        :autosize="{ minRows: 5 }"
      ></el-input>
    </el-form-item>
    <el-form-item label="" label-width="0px">
      <div class="shareImg">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="handleShareImgSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-image
            v-if="form.shareImg"
            :src="form.shareImg"
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
            <div class="info">120px*120px</div>
            <div class="info">分享图</div>
          </div>
        </el-upload>
      </div>
    </el-form-item>
    <el-form-item v-if="needAuthor" label="" label-width="0px">
      <el-input v-model="form.author" placeholder="请输入作者"></el-input>
    </el-form-item>
    <el-form-item v-if="needSource" label="" label-width="0px">
      <el-input v-model="form.source" placeholder="请输入来源"></el-input>
    </el-form-item>
    <el-form-item v-if="needTags" label="" label-width="0px">
      <div class="tags">
        <el-tag
          v-for="tag in form.tags"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
      </div>
      <el-input
        v-if="newTagShow & (form.tags.length < 5)"
        ref="tagsInput"
        v-model="newTagValue"
        class="input-new-tag"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button
        v-if="form.tags.length < 5"
        class="button-new-tag"
        size="small"
        @click="addNewTag"
      >
        添加新标签
      </el-button>
      <el-button size="small" type="primary">自动获取</el-button>
      <div class="info">您可添加5个关键词，描述越准确，越利于触达兴趣人群</div>
    </el-form-item>
    <el-form-item v-if="needNum" label="" label-width="0px">
      <div class="ipts">
        <div class="ipt-l">阅读量：{{ form.readNum }}</div>
        <div class="ipts-r">
          <el-input
            v-model="form.goodReadNum"
            placeholder="优化阅读量"
            class="ipt"
          ></el-input>
        </div>
      </div>
      <div class="ipts">
        <div class="ipt-l">点赞数：{{ form.starNum }}</div>
        <div class="ipts-r">
          <el-input
            v-model="form.goodStarNum"
            placeholder="优化点赞数"
            class="ipt"
          ></el-input>
        </div>
      </div>
    </el-form-item>
    <!-- <el-form-item label="" label-width="0px">
      <el-radio-group v-model="form.articleTypeValue">
        <el-radio
          v-for="item in articleTypes"
          :key="item.value"
          :label="item.value"
        >
          {{ item.name }}
        </el-radio>
      </el-radio-group>
    </el-form-item> -->
    <el-form-item label="" label-width="0px">
      <el-checkbox v-model="form.commentOff">关闭评论</el-checkbox>
    </el-form-item>
    <el-form-item label="" label-width="0px">
      <el-row>
        <el-col :span="6">发布时间</el-col>
        <el-col :span="18">
          <el-date-picker
            v-model="form.time"
            type="datetime"
            placeholder="选择日期时间"
            default-time="08:00:00"
          ></el-date-picker>
        </el-col>
      </el-row>
    </el-form-item>
    <div class="info">此项为空为立即发布</div>
  </div>
</template>

<script>
  export default {
    name: "RightBox",
    props: {
      //是否需要作者
      needAuthor: {
        type: Boolean,
        default: false,
      },
      //是否需要来源
      needSource: {
        type: Boolean,
        default: false,
      },
      //是否需要标签
      needTags: {
        type: Boolean,
        default: true,
      },
      //是否需要点赞阅读
      needNum: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        newTagShow: false, // 是否显示添加新标签
        newTagValue: "", // 新标签的内容
        articleTypes: [
          { name: "默认", value: "1" },
          { name: "热点", value: "2" },
          { name: "精选", value: "3" },
          { name: "原创", value: "4" },
          { name: "广告", value: "5" },
        ], // 文章类型选项
        form: {
          summary: "", //简介
          author: "",
          source: "",
          shareImg: "",
          tags: [],
          readNum: 123213,
          starNum: 0,
          goodReadNum: "",
          goodStarNum: "",
          articleTypeValue: "1",
          commentOff: false,
          time: "",
        },
      };
    },
    watch: {},
    methods: {
      handleClose(tag) {
        //关闭标签
        this.form.tags.splice(this.form.tags.indexOf(tag), 1);
      },
      addNewTag() {
        // 添加新标签
        this.newTagShow = true;
        this.$nextTick(() => {
          this.$refs.tagsInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        // 完成添加
        const inputValue = this.newTagValue;
        if (inputValue) {
          this.form.tags.push(inputValue);
        }
        this.newTagShow = false;
        this.newTagValue = "";
      },
      beforeAvatarUpload() {
        //图片上传前
      },
      handleShareImgSuccess(res, file) {
        //分享图上传成功
        this.form.shareImg = window.URL.createObjectURL(res.raw);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .rightBox {
    width: 400px;
    padding-top: 10px;
    padding-left: 10px;
    margin-bottom: 20px;
    border-left: 1px solid $base-border-color;
  }
  .el-tag--small {
    margin-left: 10px;
  }
  .input-new-tag {
    width: 90px;
    margin-right: 10px;
    vertical-align: bottom;
  }
  .button-new-tag {
    // margin-left: 10px;
    height: 32px;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 30px;
  }
  .info {
    font-size: $base-font-size-small;
    color: $info-font-color;
  }
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
  .tags {
    margin-bottom: 10px;
  }
  .el-radio {
    margin-bottom: 10px;
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
</style>
