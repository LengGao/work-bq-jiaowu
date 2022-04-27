<template>
  <div>
    <div class="head_remind">
      *本模块主要用于管理层领导查看手下员工待办事项跟进的具体情况
    </div>
    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table ref="multipleTable" :data="listData" style="width: 100%" class="min_table" v-loading="listLoading" element-loading-text="loading" element-loading-spinner="el-icon-loading" element-loading-background="#fff" :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }" :cell-style="{ 'text-align': 'center' }">
          <el-table-column label="编号" width="50" type="index">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" min-width="140" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="type_name" label="待办类型" min-width="110" show-overflow-tooltip></el-table-column>
          <el-table-column prop="describe" label="待办事项" min-width="110" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="position" label="账号身份" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="follow_user_name" label="跟进人员" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="follow_state" label="跟进状态" min-width="140" show-overflow-tooltip>
            <template slot-scope="{ row }">
              <span :style="{ color: statusMap[row.follow_state].color }">{{
                statusMap[row.follow_state].text
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="update_time" label="跟进时间" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="{ row }" v-if="followRoute[row.follow_type]">
              <el-button type="text" @click="
                  linkTo(followRoute[row.follow_type], row.param_list || {})
                ">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getFollowPage } from '@/api/set'
import { followRoute } from '@/utils/index'
export default {
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        date: '',
        follow_type: '',
        follow_state: '',
        position: '',
        value: '',
      },
      searchOptions: [
        {
          key: 'date',
          type: 'datePicker',
          attrs: {
            clearable: true,
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            'value-format': 'yyyy-MM-dd',
          },
        },
        {
          key: 'follow_type', // 默认 0 跟进类型 1.学员跟进 2.资料缺失 3.待付款 4.排课 5 学习进度 6.约课 7 考试 8 入账 9 退费 10 学习回访
          type: 'select',
          options: [
            {
              label: '学员跟进',
              value: 1,
            },
            {
              label: '资料缺失',
              value: 2,
            },
            {
              label: '待付款',
              value: 3,
            },
            {
              label: '排课',
              value: 4,
            },
            {
              label: '学习进度',
              value: 5,
            },
            {
              label: '约课',
              value: 6,
            },
            {
              label: '考试',
              value: 7,
            },
            {
              label: '入账',
              value: 8,
            },
            {
              label: '退费',
              value: 9,
            },
            {
              label: '学习回访',
              value: 10,
            },
          ],
          attrs: {
            clearable: true,
            placeholder: '待办类型',
          },
        },
        {
          key: 'position',
          type: 'select',
          options: [
            {
              label: '招生',
              value: '招生',
            },
            {
              label: '教务',
              value: '教务',
            },
            {
              label: '财务',
              value: '财务',
            },
          ],
          attrs: {
            clearable: true,
            placeholder: '账号身份',
          },
        },
        {
          key: 'follow_state',
          type: 'select',
          options: [
            {
              label: '未开始',
              value: 1,
            },
            {
              label: '进行中',
              value: 2,
            },
            {
              label: '已完成',
              value: 3,
            },
          ],
          attrs: {
            clearable: true,
            placeholder: '跟进状态',
          },
        },
        {
          key: 'value',
          attrs: {
            placeholder: '跟进员工，待办内容',
          },
        },
      ],
      statusMap: {
        //代办类型 -1 全部 0 驳回 1未开始 2 进行中 3已经完成
        0: {
          text: '驳回',
          color: '#FD6500',
        },
        1: {
          text: '未开始',
          color: '#FD6500',
        },
        2: {
          text: '进行中',
          color: '#FDC400',
        },
        3: {
          text: '已完成',
          color: '#43D100',
        },
      },
      followRoute,
    }
  },

  created() {
    this.getFollowPage()
  },

  methods: {
    handleSearch(data) {
      const times = data.date || ['', '']
      this.pageNum = 1
      this.searchData = {
        ...data,
        start_time: times[0],
        end_time: times[1],
      }
      this.getFollowPage()
    },
    handlePageChange(val) {
      this.pageNum = val
      this.getFollowPage()
    },
    async getFollowPage() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        follow_type: this.searchData.follow_type || 0,
        follow_state: this.searchData.follow_state || -1,
      }
      delete data.date
      this.listLoading = true
      const res = await getFollowPage(data)
      this.listLoading = false
      this.listData = res.data.list
      this.listTotal = res.data.total
    },
    linkTo(name, query) {
      this.$router.push({
        name,
        query,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.table_bottom {
  text-align: right;
}
</style>
