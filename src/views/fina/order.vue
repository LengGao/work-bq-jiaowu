<template>
  <div>
    <div class="head_remind">
      *本模块主要用来财务入账结算和退费作废申请审批。
    </div>
    <section class="mainwrap">
      <ul class="customer_navigation">
        <li v-for="(item, index) in tabFun" :key="index" :class="{ active: index === activeIndex }" @click="statusSwitch(index, item.status)">
          {{ item.name }}
        </li>
      </ul>
      <div class="client_head">
        <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
        <div>
          <!-- <el-button type="primary" @click="toCreateClass"
            >导出数据</el-button
          > -->
          <el-button type="primary">导出数据</el-button>
        </div>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table ref="multipleTable" :data="listData" tooltip-effect="light" style="width: 100%" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" class="min_table">
          <el-table-column type="selection" width="45"> </el-table-column>
          <el-table-column prop="create_time" label="订单时间" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="order_no" label="订单编号" min-width="180" column-key="course_id" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="orderDetail(scope.row)">
                {{ scope.row.order_no }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="surname" label="学员姓名" min-width="70" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="联系方式" min-width="100" show-overflow-tooltip>
            <template slot-scope="{ row }">
              <div>
                {{ row.mobile | filterPhone }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" min-width="180" show-overflow-tooltip>
            <template slot-scope="{ row }">
              <div>
                {{ formatProjectName(row.project) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="pay_money" label="实付金额" min-width="80" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="财务状态" min-width="80" show-overflow-tooltip>
            <template slot-scope="{ row }">
              <div :class="
                  row.pay_status == 1
                    ? 'wordcolor'
                    : row.pay_status == 3
                    ? 'wordcolor2'
                    : ''
                ">
                {{ statusMap[row.pay_status] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div>
                <el-button type="text" @click="Entrydetail(scope.row)">订单详情</el-button>
                <el-button type="text" @click="Entry(scope.row)" :class="
                    scope.row.pay_status == 3
                      ? 'entry2'
                      : scope.row.pay_status == 0
                      ? 'entry2'
                      : scope.row.pay_status == 1
                      ? 'entry1'
                      : scope.row.pay_status == 2
                      ? 'entry1'
                      : scope.row.pay_status == 4
                      ? 'entry2'
                      : scope.row.pay_status == 5
                      ? 'entry2'
                      : ''
                  " style="margin-left: 20px">入账</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" />
        </div>
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="25%">
        <span style="font-size: 20px">是否将此笔订单入账？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="Entryenter">确 定</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { Approvalist, Orderentry } from '@/api/fina'

export default {
  name: 'order',
  data() {
    return {
      statusMap: {
        0: '待付款',
        1: '未入账',
        2: '部分入账',
        3: '已入账',
        4: '已作废',
        5: '已退款',
      },
      pay_status: '',
      listData: [],
      activeIndex: 0,
      pageNum: 1,
      listTotal: 0,
      dialogVisible: false,
      startend: '',
      isTagactive: 1,
      ruleForm: { category_id: '' },
      page: 1,
      order_id: '',
      schoolData: [],
      course_ids: [],
      datas: {},
      selectData: [],
      tabFun: [
        {
          name: '入账审批',
          status: '',
        },
        {
          name: '退费审批',
          status: 5,
        },
        {
          name: '作废审批',
          status: 4,
        },
      ],
      //搜索框
      searchData: {
        date: '',
        keyword: '',
      },
      searchOptions: [
        {
          key: 'date',
          type: 'datePicker',
          attrs: {
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            format: 'yyyy-MM-dd',
            'value-format': 'yyyy-MM-dd',
          },
        },
        {
          key: 'keyword',
          attrs: {
            placeholder: '学生姓名/手机号码',
          },
        },
      ],
    }
  },
  created() {
    this.Approvalist()
  },
  methods: {
    // 显示项目名称
    formatProjectName(json) {
      const projectData = JSON.parse(json)
      const projectArr = Array.isArray(projectData) ? projectData : [projectData]
      return projectArr.map((item) => item.project_name).join('，')
    },
    //订单审批列表接口
    async Approvalist() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
        // all: 1,
        pay_status: this.activeStatus,
      }
      const res = await Approvalist(data)
      this.listLoading = false
      console.log(res.data.list)
      this.listData = res.data.list
      this.listTotal = res.data.total
    },
    //订单入账接口
    async Orderentry() {
      const data = {
        // page: this.pageNum,
        // ...this.searchData,
        order_id: this.order_id,
      }
      const res = await Orderentry(data)
      if (res.code == 0) {
        this.$message.success(res.message)
      }
      // console.log( res.data.list)
      // this.listData = res.data.list
      // this.listTotal = res.data.total
    },
    //搜索模块
    handleSearch(data) {
      console.log(data)
      this.pageNum = 1
      this.searchData = {
        ...data,
        date: data.date ? data.date.join(' - ') : '',
      }
      this.Approvalist()
    },
    orderDetail(ab) {
      this.$router.push({
        name: 'orderdetail',
        query: {
          order_id: ab.order_id,
        },
      })
    },
    handlePageChange(val) {
      this.pageNum = val
      this.Approvalist()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    statusSwitch(index, status) {
      this.activeIndex = index
      this.activeStatus = status
      this.Approvalist()
    },
    //入账
    Entry(row) {
      this.dialogVisible = true
      this.order_id = row.order_id
    },
    Entrydetail(ab) {
      this.$router.push({
        name: 'orderdetail',
        query: {
          order_id: ab.order_id,
        },
      })
    },
    Entryenter(order_id) {
      this.dialogVisible = false
      order_id, this.Orderentry()
      this.Approvalist()
    },
  },
}
</script>

<style lang="scss" scoped>
.wordcolor {
  color: #bbb;
}
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.navigation {
  width: 240px;
  display: flex;
  justify-content: space-between;
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 22px;
  margin-bottom: 10px;
  li {
    height: 28px;
    font-size: 15px;
    border-bottom: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    color: #666666;
    margin-right: 10px;
  }
  li:last-child {
    margin-right: 0px !important;
  }
  li:hover {
    color: #199fff;
    border-bottom: 2px solid #199fff;
  }
}
.tabg {
  //background: #2798ee;
  color: #2798ee !important;
  border-bottom: 2px solid #199fff !important;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.batch_btn {
  padding-top: 20px;
  .el-button {
    margin-right: 25px;
  }
}
.coursename {
  color: #2798ee;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.customer_navigation {
  display: flex;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  margin-bottom: 20px;
  li {
    min-width: 60px;
    height: 28px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 25px;
    cursor: pointer;
    color: #666666;
    border-bottom: 2px solid #fff;
    &.active {
      color: #199fff;
      border-color: #199fff;
    }
  }
  li:last-child {
    margin-right: 0px;
  }
  li:hover {
    color: #199fff;
    border-color: #199fff;
  }
}
.entry1 {
  display: inline;
}
.entry2 {
  display: none;
}
</style>
