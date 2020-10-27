<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
  <div class="content">
      <div v-for="(item,index) in form" :key='index'>
        <el-input class="w200" :value="item"></el-input>
        <el-button>修改</el-button>
        <el-button @click="del(index)">删除</el-button>
      </div>
      <div>
        <el-input class="w200" placeholder=""></el-input>
        <el-button @click="add">添加</el-button>
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
    name: 'Configuration',
    data() {
      return {
      title:'配置',
       form:['现场直播','电视直播','广播直播'],
       dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      add(){
        this.form.push('电视直播')
      },
      del(index){
         this.form.splice(index,1)
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
  .w200{
    width: 200px;
    display: inline-block;
    margin-right: 10px;
    margin-top: 10px;
  }
  .content{
    width: 400px;
    margin: 20px auto;
  }
</style>
