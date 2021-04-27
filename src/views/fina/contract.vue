<template>
  <section>
    <div class="head_remind">
      *本模块主要用来规范合同订立行为，加强对合同使用的监督，防范和降低合同签订带来的风险。
    </div>
    <section class="mainwrap">
      <div class="client_head">
        <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table ref="multipleTable" :data="listData" tooltip-effect="light" stripe style="width: 100%;" :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" class="min_table">
          <el-table-column prop="order_no" label="订单编号" min-width="200" column-key="order_no" show-overflow-tooltip></el-table-column>
          <el-table-column prop="project_str" label="项目名称" min-width="200" column-key="project_str" show-overflow-tooltip></el-table-column>
          <el-table-column prop="surname" label="签署人" min-width="200" column-key="surname" show-overflow-tooltip></el-table-column>
          <el-table-column prop="pay_money" label="应收金额" min-width="200" column-key="pay_money" show-overflow-tooltip></el-table-column>
          <el-table-column prop="order_money" label="签署价格" min-width="200" column-key="order_money" show-overflow-tooltip></el-table-column>
          <el-table-column prop="create_time" label="上传时间" min-width="250" column-key="create_time" show-overflow-tooltip></el-table-column>
          <el-table-column label="合同状态" fixed="right" min-width="150" prop="contract_status">
            <template slot-scope="{row}">
              <div style="display: flex; justify-content:center;" :class="row.contract_status==4?'colorgreen' :'colored' ">
                {{ statusMap[row.contract_status] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="220">
            <template slot-scope="{row}">
              <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="Approval(row)" :class="row.contract_status == 1? 'entry2':'entry1'">审核</el-button>
                <el-button type="text" :class="row.contract_status == 1? 'entry1':'entry2'" @click="pcontract(row.sign_url)">查看合同</el-button>

                <!-- <el-button type="text" :class="row.contract_status == 1? 'entry1':'entry2'">查看收据</el-button> -->
              </div>
            </template>
          </el-table-column>
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </el-table>
        <div class="table_bottom">
          <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" />
        </div>
      </div>
      <Toexamine v-model="toexadialog" @on-success="auditlist" :contractInfo="contractInfo" :id="currentId" />
    </section>
  </section>
</template>
<script>
import { auditlist } from '@/api/fina'
import Toexamine from './components/toexadialog'

export default {
  name: 'contract',
  components: {
    Toexamine,
  },
  data() {
    return {
      seetempdialog: false,
      contractInfo: {},
      order_no: '',
      currentId: '',
      dialogTitle: '',
      toexadialog: false,
      contract_status: '',
      id: '',
      audit_type: '',
      audit_content: '',
      statusMap: {
        1: '待审核',
        2: '待签署',
        3: '审核不通过',
        4: '签署完成',
      },
      searchOptions: [
        {
          key: 'order_no',
          attrs: {
            placeholder: '请输入订单编号',
            clearable: true,
          },
        },
      ],
      options: [],
      searchData: {
        keyword: '',
      },
      listTotal: 0,
      pageNum: 1,
      listData: [],
    }
  },
  created() {
    this.auditlist()
  },
  methods: {
    //搜索功能
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = data
      this.auditlist()
    },
    handlePageChange(val) {
      this.pageNum = val
      this.auditlist()
    },
    // 合同审核列表接口
    async auditlist() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      }
      const res = await auditlist(data)
      console.log(res.data.data)
      this.listData = res.data.data
      this.listTotal = res.data.total
    },
    Approval(row) {
      this.toexadialog = true
      this.dialogTitle = '合同审核'
      // this.currentId = id
      this.contractInfo = row
    },
    pcontract(sign_url) {
      console.log(sign_url)
      // this.sign_url = row.sign_url
      var tempwindow = window.open('_blank')
      tempwindow.location = sign_url
      this.auditlist()
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/.search-lise .search-item[data-v-a11328ce] {
  width: 280px;
}
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
/deep/.el-form-item {
  margin-bottom: 10px;
}
/deep/.el-dialog__header {
  background: #f1f1f1;
}
/deep/.el-form-item__content {
  width: 50%;
}
/deep/.el-radio__input.is-checked + .el-radio__label {
  margin-right: 10px;
}
.mainPart {
  padding: 20px;
}
header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
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
.client_head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.table_bottom {
  text-align: right;
  margin-top: 40px;
}
.colorgreen {
  color: green;
}
.colored {
  color: red;
}
.entry1 {
  display: none;
}
.entry2 {
  display: inline;
}
</style>
