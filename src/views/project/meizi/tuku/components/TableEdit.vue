<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="600px"
    @close="close"
  >
    <div style="display: flex;margin-bottom: 50px;">
      <div style="width: 150px;margin-right: 20px;">
        <el-image style="width: 150px;height: 150px;" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
        <p>标题标题标题标题标题标题标题标题</p>
      </div>
      <div>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div>
      <span>分类：</span>
      <el-tag
        type="info"
        effect="plain">
        风光
      </el-tag>
      <el-tag
        type="info"
        effect="plain">
        建筑
      </el-tag>
      <el-tag
        type="info"
        effect="plain">
        直播
      </el-tag>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/table'

  export default {
    name: 'TableEdit',
    data() {
      return {
        imageUrl: '',
        value1:'',
        value: [],
        title:'',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        this.title = '上传图片'
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.form)
            this.$baseMessage(msg, 'success')
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$emit('fetch-data')
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .w160{
    width: 160px;
    display: inline-block;
  }
  .mtb20{
    margin: 20px  0;
  }
  .ml10{
    margin-left: 10px;
  }
  .pd50{
    padding:0 50px;
  }
  .dialog-footer{
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>
