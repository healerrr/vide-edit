<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="110px" style="padding: 20px 100px;">
      <el-form-item label="分类" >
        <el-select v-model="form.type" placeholder="请选择分类" style="width:100%;">
          <el-option label="电视直播" value="电视直播"></el-option>
          <el-option label="电台直播" value="电台直播"></el-option>
          <el-option label="长直播" value="长直播"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="频道名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"   placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="长形台标" prop="logo">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class='text'>只支持jpg和png格式</div>
      </el-form-item>
      <el-form-item label="AppName" prop="appname">
        <el-input v-model.trim="form.appname" autocomplete="off" placeholder="AppName"></el-input>
      </el-form-item>
      <el-form-item label="SteramName" prop="steramname">
        <el-input v-model.trim="form.steramname" autocomplete="off" placeholder="SteramName"></el-input>
      </el-form-item>
    </el-form>
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
        form: {
          type: '电视直播',
          name: '',
          logo:'',
          appname:'',
          steramname:''
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入频道名称' }],
          logo: [{ required: true, trigger: 'blur', message: '请上传长形台标' }],
          appname: [{ required: true, trigger: 'blur', message: '请输入AppName' }],
          steramname: [{ required: true, trigger: 'blur', message: '请输入SteramName' }],
        },
        title: '',
        imageUrl: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '新建直播'
        } else {
          this.title = '编辑直播'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
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
 .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .text{
    font-size: 10px;
    line-height: 10px;
    color: #928a8a;
  }
</style>
