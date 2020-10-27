<template>
  <div class="table-container">
         <el-row>
      <el-col :span="12">
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
      <el-col :span="12">
        <div class="text-right">
          <el-button  type="primary" @click="handleAdd">
            添加图片
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4" v-for="index of 24" :key="index">
        <div class="block" style="margin-bottom:20px;">
        <el-image
          style="width: 100%;height: 100px;"
          src=""
          ></el-image>
          <span class="demonstration">图片标题，支持两行图片标题，支持两行图片</span>
          <el-row>
            <el-col :span="12"><el-button size="mini">编辑</el-button></el-col>
            <el-col :span="12" style='text-align:right;'> <el-button size="mini">删除</el-button></el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
     <table-edit ref="edit"></table-edit>
  </div>
 
</template>

<script>
 import TableEdit from './components/TableEdit.vue'
  export default {
    name: 'tuku',
    data() {
      return {
        tabPosition: '全部',
        show:true,
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
      }
    },
    components: {
      TableEdit,
    },
    computed: {
      
    },
    created() {
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
     handleAdd() {
        this.$refs['edit'].showEdit()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
       handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .text-right{
    text-align: right;
  }
  .demonstration{
    display: inline-block;
    font-size: 10px;
    color: #696666;
    margin: 8px 0 16px 0;
  }
</style>
