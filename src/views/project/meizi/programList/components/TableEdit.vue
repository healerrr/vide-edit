<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
   <el-form ref="form" :model="form" :rules="rules" label-width="110px" style="padding: 20px 50px 0 50px;">
      <el-form-item label="节目单名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"   placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="频道名称" >
        <el-select v-model="form.type" placeholder="请选择分类" style="width:220px;margin-right:15px;">
          <el-option label="电视直播" value="电视直播"></el-option>
          <el-option label="电台直播" value="电台直播"></el-option>
          <el-option label="长直播" value="长直播"></el-option>
        </el-select>
        <el-select v-model="form.type" placeholder="请选择分类" style="width:220px;margin-right:15px;">
          <el-option label="新闻频道" value="新闻频道"></el-option>
          <el-option label="娱乐频道" value="娱乐频道"></el-option>
        </el-select>
        <el-button type="primary" @click="save">导入模板</el-button>
      </el-form-item>
      <el-form-item label="编辑模板">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 10px;">
          <el-radio-button class="is-active" label="周一">周一</el-radio-button>
          <el-radio-button label="周二">周二</el-radio-button>
          <el-radio-button label="周三">周三</el-radio-button>
          <el-radio-button label="周四">周四</el-radio-button>
          <el-radio-button label="周五">周五</el-radio-button>
          <el-radio-button label="周六">周六</el-radio-button>
          <el-radio-button label="周日">周日</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
     <el-table
    :data="tableData"
    style="width: 100%;padding:0 50px">
    <el-table-column
      label="时段"
      width="120">
      <template slot-scope="scope">
        {{scope.row.date}}
      </template>
    </el-table-column>
    <el-table-column
      label="时间"
      width="120">
      <template slot-scope="scope">
        {{scope.row.time}}
      </template>
    </el-table-column>
    <el-table-column
      label="节目名称"
     >
      <template slot-scope="scope">
        <el-input v-model='scope.row.name' placeholder="精彩节目"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style='text-align:center;margin:10px 0;'><el-button style="margin-right: 10px;" size="mini">+</el-button>增加节目</div>
   <el-table
    :data="tableData2"
    style="width: 100%;padding:0 50px">
    <el-table-column
      label="时段"
      width="120">
      <template slot-scope="scope">
        {{scope.row.date}}
      </template>
    </el-table-column>
    <el-table-column
      label="时间"
      width="120">
      <template slot-scope="scope">
        {{scope.row.time}}
      </template>
    </el-table-column>
    <el-table-column
      label="节目名称"
     >
      <template slot-scope="scope">
        <el-input v-model='scope.row.name' placeholder="精彩节目"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style='text-align:center;margin:10px 0;'><el-button style="margin-right: 10px;" size="mini">+</el-button>增加节目</div>
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
         
        },
        tabPosition:'周一',
        value1:'',
        value: [],
        title:'',
        dialogFormVisible: false,
         tableData: [{
          date: '上午',
          time:'0.00',
          name: '',
        }, {
          date: '上午',
          time:'0.00',
          name: '',
        }],
        tableData2: [{
          date: '下午',
          time:'0.00',
          name: '',
        }, {
          date: '下午',
          time:'0.00',
          name: '',
        }]
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        this.title = '新建节目单'
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      handleChange(value) {
        console.log(value);
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
  .el-radio-button{
    width: 78px;
  }
  .el-radio-button span{
    width: 78px;
  }
</style>
