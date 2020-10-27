<template>
  <div class="tinymce-editor">
    <editor
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      @onClick="onClick"
    />
    <!-- <div class="meizi">
      <el-button type="primary" plain>媒资库</el-button>
      <el-button type="primary" plain>视音频</el-button>
      <el-button type="primary" plain @click="imgShow = !imgShow">
        图片
      </el-button>
    </div> -->
    <el-dialog title="上传图片" :visible.sync="imgShow" width="440px">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgShow = false">取 消</el-button>
        <el-button type="primary" @click="imgShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import request from "@/utils/request";
  import tinymce from "tinymce/tinymce";
  import Editor from "@tinymce/tinymce-vue";
  import "tinymce/themes/mobile";
  import "tinymce/themes/silver";
  import "tinymce/icons/default/icons";
  // 编辑器插件plugins
  // 更多插件参考：https://www.tiny.cloud/docs/plugins/
  import "tinymce/plugins/image"; // 插入上传图片插件
  import "tinymce/plugins/media"; // 插入视频插件
  import "tinymce/plugins/table"; // 插入表格插件
  import "tinymce/plugins/lists"; // 列表插件
  import "tinymce/plugins/wordcount"; // 字数统计插件
  import "tinymce/plugins/print"; // 打印
  import "tinymce/plugins/preview"; // 预览
  import "tinymce/plugins/code"; // code
  import "tinymce/plugins/link"; // 插入链接
  import "tinymce/plugins/searchreplace"; // 查找插件
  export default {
    components: {
      Editor,
    },
    props: {
      value: {
        type: String,
        default: "",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      plugins: {
        type: [String, Array],
        default:
          "lists image media table wordcount print preview code link searchreplace",
      },
      toolbar: {
        type: [String, Array],
        default() {
          return [
            "undo redo | fontsizeselect formatselect | bold italic forecolor backcolor searchreplace removeformat",
            " alignleft aligncenter alignright alignjustify | lists image media link table | code preview print",
          ];
        },
      },
    },
    data() {
      return {
        init: {
          mobile: {
            menubar: false,
          },
          language_url: "/tinymce/langs/zh_CN.js",
          language: "zh_CN",
          skin_url: "/tinymce/skins/ui/oxide",
          // skin_url: '/tinymce/skins/ui/oxide-dark', // 暗色系
          height: 300,
          plugins: this.plugins,
          toolbar: this.toolbar,
          fontsize_formats: "12px 14px 16px 18px 20px 24px 36px 48px 64px 96px",
          branding: false,
          image_description: false, // 图片描述
          link_title: false, // 链接标题
          menubar: false,
          content_style:
            "img{max-width:100%;height:auto} video{max-width:100%;height:auto}",
          images_upload_handler: (blobInfo, success, failure) => {
            // 自定义图片上传
            // var file = blobInfo.blob();
            // var fd = new FormData(); // eslint-disable-line no-unused-vars
            // fd.append("myfile[]", file);
            // request({
            //   method: "post",
            //   url: `/uploadImg`,
            //   data: fd,
            // })
            //   .then((res) => {
            //     console.log(res);
            //     const img = res.message;
            //     success(img);
            //   })
            //   .catch((err) => {
            //     failure("HTTP Error: " + err.message);
            //   });
            const img = "data:image/jpeg;base64," + blobInfo.base64();
            success(img);
          },
          file_picker_types: "media",
          file_picker_callback: function (callback, value, meta) {
            console.log(meta);
            var filetype = ".mp3, .mp4 , .ogv";
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", filetype);
            input.click();
            input.onchange = function () {
              var file = this.files[0];
              var reader = new FileReader();
              reader.onload = function () {
                // Note: Now we need to register the blob in TinyMCEs image blob
                // registry. In the next release this part hopefully won't be
                // necessary, as we are looking to handle it internally.
                var id = "blobid" + new Date().getTime();
                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(",")[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                // call the callback and populate the Title field with the file name
                callback(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };
          },
        },
        myValue: this.value,
        imgShow: false,
      };
    },
    watch: {
      value(newValue) {
        this.myValue = newValue;
      },
      myValue(newValue) {
        this.$emit("input", newValue);
      },
    },
    mounted() {
      tinymce.init({});
    },
    methods: {
      // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
      // 需要什么事件可以自己增加
      onClick(e) {
        this.$emit("onClick", e, tinymce);
      },
      // 可以添加一些自己的自定义事件，如清空内容
      clear() {
        this.myValue = "";
      },
      addImg() {
        //新增图片
      },
    },
  };
</script>
<style lang="scss" scoped>
  .tinymce-editor {
    position: relative;
  }
  .meizi {
    position: absolute;
    top: 42px;
    right: 10px;
    z-index: 99;
  }
</style>
