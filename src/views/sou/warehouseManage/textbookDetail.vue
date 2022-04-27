<template>
  <section class="mainwrap">
    <search
      :organHide="false"
      :schoolHide="false"
      :classNameHide="false"
      :dealStatusHide="false"
      :teacherHide="false"
      @getTable="getTableList"
      api="getMyclient"
      :statusNum="3"
    ></search>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="uid"
          label="ID"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="user_nicename"
          label="教材名称"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="realname"
          label="所属分类"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="库存数量"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="最后更新时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'seaStudent',
  data() {
    return {
      schoolData: [],
      page: 1,
      status: 3,
      datas: {},
    }
  },
  mounted() {
    // this.$api.getCommonUserList(this, 'schoolData')
  },
  methods: {
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },

    doPageChange(page) {
      this.page = page
      // this.$api.getMyclient(this, 'myclient', status)
      this.$api.getCommonUserList(this, 'schoolData', this.datas)
    },
  },
}
</script>
<style lang="scss" scoped>
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
.userTable {
  margin-top: 20px;
}
/deep/.timeCard {
  color: #666666;
}
/deep/.studentTag ul li {
  color: #666666;
}
</style>
