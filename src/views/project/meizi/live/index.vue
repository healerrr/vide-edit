<template>
  <div class="table-container">
    <el-row>
      <el-col :span="12">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
          <el-radio-button class="is-active" label="全部">全部</el-radio-button>
          <el-radio-button label="电台直播">电台直播</el-radio-button>
          <el-radio-button label="电视直播">电视直播</el-radio-button>
          <el-radio-button label="长直播">长直播</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="12">
        <div class="text-right">
          <el-button  type="primary" @click="handleAdd">
            新建直播
          </el-button>
          <el-button  @click="handleConfig">
            配置
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
      @sort-change="tableSortChange"
    >
      <el-table-column show-overflow-tooltip align="center" label="序号" width="100">
        <template #default="scope">
         {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="台标" width="95">
        <template #default="{ row }">
          <el-image
            v-if="imgShow"
            :preview-src-list="imageList"
            :src="row.img"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="分类"
        prop="type"
        width="95"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="频道名称"
        prop="name"
        width="95"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="状态" width="95">
        <template #default="scope">
          <el-switch v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="排序" width="80">
        <template #default="scope">
          <el-input v-model="scope.row.sort"></el-input>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="输入流">
        <template #default="scope">
          {{ scope.row.inputStream }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="输出流">
        <template #default="scope">
          {{ scope.row.outputStream }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="280px">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
          <el-button type="text" @click="handleEdit(row)">节目单</el-button>
          <el-button type="text" @click="handleDelete(row)">屏蔽节目</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <Configuration ref="config"></Configuration>
  </div>
</template>

<script>
  // import { getList, doDelete } from '@/api/table'
  import TableEdit from './components/TableEdit'
  import Configuration from './components/Configuration'
  export default {
    name: 'ComprehensiveTable',
    components: {
      TableEdit,
      Configuration,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger',
        }
        return statusMap[status]
      },
    },
    data() {
      return {
        tabPosition: '全部',
        imgShow: true,
        list: [{
            id:1,
            logo:'',
            type:'电视直播',
            name:'新闻频道',
            status:false,
            sort:'12',
            inputStream:'https://chu1204505056.gitee.io/vue-admin-beautiful-pro',
            outputStream:'预览',
          },{
            id:2,
            logo:'',
            type:'电视直播',
            name:'新闻频道',
            status:false,
            sort:'12',
            inputStream:'https://chu1204505056.gitee.io/vue-admin-beautiful-pro',
            outputStream:'预览',
          },{
            id:3,
            logo:'',
            type:'电视直播',
            name:'新闻频道',
            status:false,
            sort:'12',
            inputStream:'https://chu1204505056.gitee.io/vue-admin-beautiful-pro',
            outputStream:'预览',
          },{
            id:4,
            logo:'',
            type:'电视直播',
            name:'新闻频道',
            status:false,
            sort:'12',
            inputStream:'https://chu1204505056.gitee.io/vue-admin-beautiful-pro',
            outputStream:'预览',
          },{
            id:5,
            logo:'',
            type:'电视直播',
            name:'新闻频道',
            status:false,
            sort:'12',
            inputStream:'https://chu1204505056.gitee.io/vue-admin-beautiful-pro',
            outputStream:'预览',
          },{
            id:6,
            logo:'',
            type:'电视直播',
            name:'新闻频道',
            status:false,
            sort:'12',
            inputStream:'https://chu1204505056.gitee.io/vue-admin-beautiful-pro',
            outputStream:'预览',
          },{
            id:7,
            logo:'',
            type:'电视直播',
            name:'新闻频道',
            status:false,
            sort:'12',
            inputStream:'https://chu1204505056.gitee.io/vue-admin-beautiful-pro',
            outputStream:'预览',
          },{
            id:8,
            logo:'',
            type:'电视直播',
            name:'新闻频道',
            status:false,
            sort:'12',
            inputStream:'https://chu1204505056.gitee.io/vue-admin-beautiful-pro',
            outputStream:'预览',
          },{
            id:9,
            logo:'',
            type:'电视直播',
            name:'新闻频道',
            status:false,
            sort:'12',
            inputStream:'https://chu1204505056.gitee.io/vue-admin-beautiful-pro',
            outputStream:'预览',
          },{
            id:10,
            logo:'',
            type:'电视直播',
            name:'新闻频道',
            status:false,
            sort:'12',
            inputStream:'https://chu1204505056.gitee.io/vue-admin-beautiful-pro',
            outputStream:'预览',
          }],
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
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      handleAdd() {
        this.$refs['edit'].showEdit()
      },
      handleConfig(){
        this.$refs['config'].showEdit()
      },
      handleEdit(row) {
        this.$refs['edit'].showEdit(row)
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids: ids })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        // const { data, totalCount } = await getList(this.queryForm)
        // this.list = data
        // const imageList = []
        // data.forEach((item, index) => {
        //   imageList.push(item.img)
        // })
        // this.imageList = imageList
        // this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      testMessage() {
        this.$baseMessage('test1', 'success')
      },
      testALert() {
        this.$baseAlert('11')
        this.$baseAlert('11', '自定义标题', () => {
          /* 可以写回调; */
        })
        this.$baseAlert('11', null, () => {
          /* 可以写回调; */
        })
      },
      testConfirm() {
        this.$baseConfirm(
          '你确定要执行该操作?',
          null,
          () => {
            /* 可以写回调; */
          },
          () => {
            /* 可以写回调; */
          }
        )
      },
      testNotify() {
        this.$baseNotify('测试消息提示', 'test', 'success', 'bottom-right')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .text-right{
    text-align: right;
  }
</style>
