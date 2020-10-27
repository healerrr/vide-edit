<template>
  <div v-if='show' class="table-container">
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
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button class="is-active" label="全部">全部</el-radio-button>
      <el-radio-button label="直播归档">直播归档</el-radio-button>
      <el-radio-button label="新媒体中心">新媒体中心</el-radio-button>
      <el-radio-button label="小编上传">小编上传</el-radio-button>
      <el-radio-button label="时政新闻">时政新闻</el-radio-button>
      <el-radio-button label="民生新闻">民生新闻</el-radio-button>
    </el-radio-group>
    <el-row :gutter="10">
      <el-col :span="3" v-for="index of 32" :key="index">
        <div class="block" @click="detail">
        <el-image
          style="width: 100%;height: 100px;"
          src=""
          ></el-image>
          <span class="demonstration">图片标题，支持两行图片标题，支持两行图片</span>
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
  </div>
  <div v-else>
      <Detail></Detail>
  </div>
</template>

<script>
 import Detail from './components/index.vue'
  export default {
    name: 'chaitiao',
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
      Detail,
    },
    computed: {
      
    },
    created() {
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
     detail(){
       this.show=false
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
