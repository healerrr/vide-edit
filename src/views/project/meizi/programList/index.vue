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
            新建节目单
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
      <el-table-column
        show-overflow-tooltip
        label="节目单名称"
        prop="name"
      ></el-table-column>
       <el-table-column show-overflow-tooltip label="应用">
        <template #default="scope">
          {{ scope.row.application }}
        </template>
      </el-table-column>
       <el-table-column show-overflow-tooltip label="操作" >
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">导入</el-button>
          <el-button type="text" @click="handleDelete(row)">编辑</el-button>
          <el-button type="text" @click="handleEdit(row)">删除</el-button>
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
  </div>
</template>

<script>
  import TableEdit from './components/TableEdit'
  export default {
    name: 'ProgramList',
    components: {
      TableEdit,
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
          name:'新闻频道2020年节目单',
          application:'电视直播/新闻频道',
        },{
          name:'新闻频道2020年节目单',
          application:'电视直播/新闻频道',
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
