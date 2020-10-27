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
            新建时移
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
      <el-table-column show-overflow-tooltip label="时移节目名称">
        <template #default="scope">
          {{ scope.row.program_name }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="频道名称"
        prop="channel_name"
        width="95"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="节目起止时间"
        prop="date"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="时移状态" >
        <template #default="scope">
          <el-switch v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="发布人/时间" >
        <template #default="scope">
          <div>{{scope.row.person}}</div>
          <div>{{scope.row.created_at}}</div>
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
    name: 'Shiyi',
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
          program_name:'西马精彩节目2020年10月',
          channel_name:'新闻频道',
          date:'2020-10-11 08:00-2020-10-11 10:30:00',
          status:'成功',
          person:'管理员账号',
          created_at:'2020-10-11 12:00'
        },{
          program_name:'西马精彩节目2020年10月',
          channel_name:'新闻频道',
          date:'2020-10-11 08:00-2020-10-11 10:30:00',
          status:'成功',
          person:'管理员账号',
          created_at:'2020-10-11 12:00'
        },{
          program_name:'西马精彩节目2020年10月',
          channel_name:'新闻频道',
          date:'2020-10-11 08:00-2020-10-11 10:30:00',
          status:'成功',
          person:'管理员账号',
          created_at:'2020-10-11 12:00'
        },{
          program_name:'西马精彩节目2020年10月',
          channel_name:'新闻频道',
          date:'2020-10-11 08:00-2020-10-11 10:30:00',
          status:'成功',
          person:'管理员账号',
          created_at:'2020-10-11 12:00'
        },{
          program_name:'西马精彩节目2020年10月',
          channel_name:'新闻频道',
          date:'2020-10-11 08:00-2020-10-11 10:30:00',
          status:'成功',
          person:'管理员账号',
          created_at:'2020-10-11 12:00'
        },{
          program_name:'西马精彩节目2020年10月',
          channel_name:'新闻频道',
          date:'2020-10-11 08:00-2020-10-11 10:30:00',
          status:'成功',
          person:'管理员账号',
          created_at:'2020-10-11 12:00'
        },{
          program_name:'西马精彩节目2020年10月',
          channel_name:'新闻频道',
          date:'2020-10-11 08:00-2020-10-11 10:30:00',
          status:'成功',
          person:'管理员账号',
          created_at:'2020-10-11 12:00'
        },{
          program_name:'西马精彩节目2020年10月',
          channel_name:'新闻频道',
          date:'2020-10-11 08:00-2020-10-11 10:30:00',
          status:'成功',
          person:'管理员账号',
          created_at:'2020-10-11 12:00'
        },{
          program_name:'西马精彩节目2020年10月',
          channel_name:'新闻频道',
          date:'2020-10-11 08:00-2020-10-11 10:30:00',
          status:'成功',
          person:'管理员账号',
          created_at:'2020-10-11 12:00'
        },{
          program_name:'西马精彩节目2020年10月',
          channel_name:'新闻频道',
          date:'2020-10-11 08:00-2020-10-11 10:30:00',
          status:'成功',
          person:'管理员账号',
          created_at:'2020-10-11 12:00'
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
        console.log(this.$refs['edit'])
        console.log(this.$refs.edit)
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
