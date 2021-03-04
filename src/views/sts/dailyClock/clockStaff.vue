<template>
  <section class="mainwrap">
    <search2
      :contentShow="true"
      :campusShow="true"
      :organShow="true"
      :classShow="true"
      api="getPunchInfo"
      inputText="学员姓名,手机号码"
      :organList="organData.list"
      :classList="classDate.list"
      @getTable="getTableList"
    ></search2>
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
        <!-- <el-table-column type="selection" width="30"></el-table-column> -->

        <el-table-column
          prop="nickname"
          label="学员姓名"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="institution_name"
          label="所属机构"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="campus_name"
          label="所属校区"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="classroom_name"
          label="所属班级"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="打卡时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="use_time"
          label="打卡用时"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="right_problem"
          label="正确题数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="accuracy"
          label="正确率"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="courseType"
          label="打卡排行"
          min-width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="打卡排行">
          <template slot-scope="scope">
            <el-button type="text" @click="toClockStaff(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column> -->
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
  name: 'clockStaff',
  data() {
    return {
      page: 1,
      schoolData: [],
      organData: [],
      datas: {},
      classDate: [],
    }
  },
  created() {
    this.$api.getPunchInfo(this, 'schoolData')
    //所属机构
    this.$api.getRecommender(this, 'organData')
    //班级名称
    this.$api.getClassroomList(this, 'classDate')
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
      this.$api.getPunchInfo(this, 'schoolData', this.datas)
    },
    toClockStaff() {
      this.$router.push({
        path: '/sts/clockStaff',
      })
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
</style>
