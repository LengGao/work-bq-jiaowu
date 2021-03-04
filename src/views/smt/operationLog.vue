<template>
  <section class="mainwrap">
    <!-- <search2
      :hideTime="true"
      :contentShow="true"
      api="getadminLogList"
      inputText="员工姓名"
      @getTable="getTableList"
    ></search2> -->

    <!--表格-->
    <div class="search">
      <el-input
        clearable
        v-model="staff_name"
        placeholder="操作人"
        style="width:200px;margin-right:10px"
      ></el-input>
      <el-input
        clearable
        placeholder="表名"
        v-model="table_name"
        style="width:200px"
      ></el-input>

      <el-select
        filterable
        slot="prepend"
        placeholder="请选择行为"
        clearable
        v-model="action"
        style="margin:0 10px"
      >
        <el-option
          :label="item.action_name"
          :value="item.action"
          v-for="(item, index) in selectList"
          :key="index"
        ></el-option>
      </el-select>
      <!-- <el-select
        filterable
        slot="prepend"
        placeholder="请选择执行状态"
        clearable
        style="margin: 0 10px"
      >
        <el-option
          :label="item.label"
          :value="item.id"
          v-for="(item, index) in statusList"
          :key="index"
        ></el-option>
      </el-select> -->
      <el-button type="primary" @click="searchSchool">搜索</el-button>
    </div>
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
        <!-- <el-table-column type="selection" width="30"></el-table-column> -->

        <el-table-column
          prop="id"
          label="日志编号"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="staff_name"
          label="操作账号"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="action"
          label="操作类型"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="table_name"
          label="操作表名"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column
          prop="controller"
          label="操作板块"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column> -->

        <!-- <el-table-column
          prop="content"
          label="操作详情"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column> -->
        <el-table-column
          prop="create_time"
          label="操作时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="update_time"
          label="回滚时间"
          min-width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="rollBack(scope.row)">回滚</el-button> -->
            <el-button type="text" @click="toLogDetails(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
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
  name: 'operationLog',
  data() {
    return {
      selectList: [],
      staff_name: '',
      action: '',
      table_name: '',
      statusList: [
        { id: 1, label: '已执行' },
        { id: 2, label: '未执行' },
      ],
      schoolData: [
        {
          courseName: '是否是分开',
          categoryName: '管理员',
          courseName: '123',
          classNum: '是否会实施',
        },
      ],
      page: 1,
      courseName: [],
      courseType: [],
      datas: {},
    }
  },
  created() {
    // this.$api.getadminLogList(this, 'schoolData')
    this.$api.getAdminOperationRecordList(this, 'schoolData')
    this.$api.getActionSelectList(this, 'selectList')
  },
  methods: {
    searchSchool() {
      this.$api.getAdminOperationRecordList(this, 'schoolData')
      // this.staff_name = ''
      // this.action = ''
      // this.table_name = ''
    },
    rollBack(ab) {
      this.$api.rollBackOperation(this, ab.id)
    },
    toLogDetails(ab) {
      this.$router.push({
        path: '/smt/logDetails',
        query: {
          id: ab.id,
        },
      })
    },
    doPageChange(page) {
      this.page = page
      this.$api.getAdminOperationRecordList(this, 'schoolData')
    },
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    toAddRole() {
      this.$router.push({
        path: '/smt/addRole',
      })
    },
    selectCoursetype() {},
    saveLink() {},
    toChapter() {
      this.$router.push({
        path: '/eda/faceMessage',
      })
    },
    // toFaceBlacklist() {
    //   this.$router.push({
    //     path: '/eda/faceBlacklist',
    //   })
    // },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
/deep/ .el-input--suffix .el-input__inner {
  // width: 200px;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.search {
  display: flex;
}
.userTable {
  margin-top: 20px;
}
</style>
