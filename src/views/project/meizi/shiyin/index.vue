<template>
  <div class="shiyin-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="看常州" name="first">
       <el-row>
      <el-col :span="18">
       <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item style="width: 200px;">
            <el-input  v-model="queryForm.title" placeholder="输入标题" />
          </el-form-item>
           <el-form-item style="width: 130px;">
            <el-input v-model="queryForm.title" placeholder="时间段" />
          </el-form-item>
          <el-form-item style="width: 100px;">
            <el-input v-model="queryForm.title" placeholder="发布人" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
            >
              搜索
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <div class="text-right">
          <el-button @click="handleConfig">
            配置
          </el-button>
          <el-button  type="primary" @click="handleAdd">
            添加视频
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="缩略图"
      width="120">
      <template slot-scope="scope"><img :src="scope.row.url" alt=""></template>
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="400"
     >
    </el-table-column>
    <el-table-column
      prop="types"
      label="分类"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      label="上传人/时间"
     >
      <template slot-scope="scope">{{scope.row.person}} <br>{{scope.row.date}}</template>
    </el-table-column>
     <el-table-column
      prop="status"
      label="转码"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="220px">
        <template #default="{ row }">
          <el-button class='mb5' size="mini"  @click="handleSplit(row)">拆条</el-button>
          <el-button class='mb5' size="mini" @click="handleDelete(row)">编辑</el-button>
          <el-button class='mb5' size="mini" @click="handleGif(row)">动图</el-button>
          <br>
          <el-button size="mini" @click="handleEdit(row)">下载</el-button>
          <el-button size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
    </el-tab-pane>
    <el-tab-pane label="手机台" name="second">
      <el-row>
        <el-col :span="18">
          <el-form
            ref="form"
            :model="queryForm"
            :inline="true"
            @submit.native.prevent
          >
            <el-form-item style="width: 200px;">
              <el-input  v-model="queryForm.title" placeholder="输入标题" />
            </el-form-item>
            <el-form-item style="width: 130px;">
              <el-input v-model="queryForm.title" placeholder="时间段" />
            </el-form-item>
            <el-form-item style="width: 100px;">
              <el-input v-model="queryForm.title" placeholder="发布人" />
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                native-type="submit"
              >
                搜索
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="缩略图"
          width="120">
          <template slot-scope="scope"><img :src="scope.row.url" alt=""></template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="400"
        >
        </el-table-column>
        <el-table-column
          prop="types"
          label="分类"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="上传人/时间"
        >
          <template slot-scope="scope">{{scope.row.person}} <br>{{scope.row.date}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="操作" width="100px">
          <template #default="{ row }">
            <el-button class='mb5' size="mini"  @click="handleTransfer(row)">转存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
  <table-edit ref="edit"></table-edit>
  <Configuration ref="config"></Configuration>
  <Gif  ref="gif"></Gif>
  <Transfer ref="transfer"></Transfer>
  <split  ref="split"></split>
  </div>
</template>

<script>
  import TableEdit from './components/TableEdit'
  import Configuration from './components/Configuration'
  import Gif from './components/Gif'
  import Transfer from './components/Transfer'
  import split from './components/split'
  export default {
    name: "Shiyin",
    components: {
      TableEdit,
      Configuration,
      Gif,
      Transfer,
      split
    },
    data() {
      return {
        activeName: 'first',
         queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
         tableData: [{
           url:'',
           title:'视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题',
           types:'直播收录',
           person:'产品经理',
           status:'转码中',
           date: '2020-10-02 08：53',
        }, {
          url:'',
           title:'视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题',
           types:'直播收录',
           person:'产品经理',
           status:'转码中',
           date: '2020-10-02 08：53',
        }, {
           url:'',
           title:'视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题',
           types:'直播收录',
           person:'产品经理',
           status:'转码中',
           date: '2020-10-02 08：53',
        }, {
           url:'',
           title:'视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题',
           types:'直播收录',
           person:'产品经理',
           status:'转码中',
           date: '2020-10-02 08：53',
        }, {
           url:'',
           title:'视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题',
           types:'直播收录',
           person:'产品经理',
           status:'转码中',
           date: '2020-10-02 08：53',
        }, {
          url:'',
           title:'视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题',
           types:'直播收录',
           person:'产品经理',
           status:'转码中',
           date: '2020-10-02 08：53',
        }, {
          url:'',
           title:'视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题视屏标题',
           types:'直播收录',
           person:'产品经理',
           status:'转码中',
           date: '2020-10-02 08：53',
        }],
        multipleSelection: [],
      };
    },
    created() {},
    mounted() {},
    methods: {
       handleClick(tab, event) {
        console.log(tab, event);
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleAdd() {
        this.$refs['edit'].showEdit()
      },
      handleConfig(){
        this.$refs['config'].showEdit()
      },
      handleGif(){
        this.$refs['gif'].showEdit()
      },
      handleTransfer(){
        this.$refs['transfer'].showEdit()
      },
      handleSplit(){
        this.$refs['split'].showEdit()
      }
    },
  };
</script>
<style lang="scss">
  .text-right{
    text-align: right;
  }
  .mb5{
    margin-bottom: 5px;
  }
</style>
