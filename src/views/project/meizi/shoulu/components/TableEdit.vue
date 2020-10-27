<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="110px" style="padding: 20px 100px;">
       <el-form-item label="收录名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"   placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="频道名称" >
        <el-select v-model="form.channel_name" placeholder="请选择分类" style="width:100%;">
          <el-option label="新闻频道" value="新闻频道"></el-option>
          <el-option label="电台频道" value="电台频道"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="发布栏目" >
        <el-select v-model="form.release" placeholder="请选择分类" style="width:100%;">
          <el-option label="常州新闻" value="常州新闻"></el-option>
          <el-option label="南京新闻" value="南京新闻"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="重复">
       <el-checkbox v-model="checked">星期一</el-checkbox>
       <el-checkbox v-model="checked">星期二</el-checkbox>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="时间">
        <el-time-picker
          class='w160'
          v-model="value2"
          :picker-options="{
            selectableRange: '18:30:00 - 20:30:00'
          }"
          placeholder="任意时间点">
        </el-time-picker>
        <el-time-picker
          class='w160 ml10'
          v-model="value2"
          :picker-options="{
            selectableRange: '18:30:00 - 20:30:00'
          }"
          placeholder="任意时间点">
        </el-time-picker>
      </el-form-item>
       <el-form-item label="自动审核">
        <el-switch
          v-model="value3"
          >
        </el-switch>
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
        value1:'',
        value2: new Date(2016, 9, 10, 18, 40),
        value3: true,
        form: {
          name: '',
          channel_name: '新闻频道',
          release:'常州新闻',
          appname:'',
          steramname:''
        },
        // rules: {
        //   name: [{ required: true, trigger: 'blur', message: '请输入频道名称' }],
        //   logo: [{ required: true, trigger: 'blur', message: '请上传长形台标' }],
        //   appname: [{ required: true, trigger: 'blur', message: '请输入AppName' }],
        //   steramname: [{ required: true, trigger: 'blur', message: '请输入SteramName' }],
        // },
        title: '',
        imageUrl: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
       this.title = '新建收录'
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
  .w160{
    width: 160px!important;
    display: inline-block;
  }
  .ml10{
    margin-left: 10px;
  }
</style>
