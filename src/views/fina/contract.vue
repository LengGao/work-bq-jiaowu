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
          <el-table-column prop="role_id" label="合同名称" min-width="200" column-key="role_id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="role_id" label="签署时间" min-width="250" column-key="role_id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="role_id" label="签署人" min-width="200" column-key="role_id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="role_id" label="项目名称" min-width="200" column-key="role_id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="role_id" label="项目价格" min-width="200" column-key="role_id" show-overflow-tooltip></el-table-column>
          <el-table-column prop="role_id" label="签署价格" min-width="200" column-key="role_id" show-overflow-tooltip></el-table-column>
          <el-table-column label="审批状态" fixed="right" min-width="150">
            <template slot-scope="scope">
              <div style="display: flex; justify-content:center;">
                <span style="color:green;">已审批</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="220">
            <template slot-scope="scope">
              <div style="display: flex; justify-content:center;">
                <el-button type="text">查看合同</el-button>
                <el-button type="text">查看收据</el-button>
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
    </section>
  </section>
</template>
<script>
export default {
  name: 'contract',
  data() {
    return {
      searchOptions: [
        {
          key: 'search_box',
          attrs: {
            placeholder: '请输入合同名称',
            clearable: true,
          },
        },
      ],
      options: [],
      searchData: {
        category_id: [],
        search_box: '',
      },
      listTotal: 0,
      pageNum: 1,
      listData: [
        { role_id: '2021' },
        { role_id: '系统集成项目管理工程师' },
        { role_id: '309080898988767' },
      ],
    }
  },
  created() {},
  methods: {
    //搜索功能
    handleSearch(data) {
      this.pageNum = 1
      this.searchData = data
      this.noticelist()
    },
    handlePageChange(val) {
      this.pageNum = val
      this.noticelist()
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
</style>
