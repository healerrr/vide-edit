<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
    <div>
      <div style="display: flex;">
        <div style="width: 280px;">
          <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
        </div>
        <div>
          <el-form :model="ruleForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="标题" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="checkPass">
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
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div>
        <el-image v-for="(item,index) of 6" :key="index" style="width: 80px;height: 80px;margin-right: 10px;" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
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
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        form: {
          type: '电视直播',
          name: '',
          logo:'',
          appname:'',
          steramname:''
        },
        title: '',
        imageUrl: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        this.title = '添加视频'
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
      },
    },
  }
</script>
<style lang="scss">
   .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
   .avatar-uploader{
     display: inline-block;
   }
 .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  .text{
    font-size: 10px;
    line-height: 10px;
    color: #928a8a;
  }
</style>
