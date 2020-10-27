<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="450px"
    @close="close"
  >
          <el-form  label-width="60px" class="demo-ruleForm">
            <el-form-item label="标题" prop="pass">
              <el-input type="password"  autocomplete="off"></el-input>
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
            </el-form-item>
          </el-form>
        <p style="font-size: 12px;color: #8e8888;margin: 20px;">此操作是把“手机台”的视频素材保存到“看常州”视频库，转存成功后，请到看常州媒资库查看</p>
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
        this.title = '转存'
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
  .dialog-footer{
    text-align: center;
  }
</style>
