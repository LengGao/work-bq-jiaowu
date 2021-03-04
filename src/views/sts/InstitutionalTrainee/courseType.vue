<template>
  <section class="mainwrap">
    <!--表格-->
    <search2
      :courseTypeShow="true"
      :contentShow="true"
      api="getCourseList"
      typeTx="punch"
      inputText="课程名称"
      @getTable="getTableList"
      :selectList="selectData.list"
    ></search2>
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
          prop="course_id"
          label="序号"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="课程分类"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="recommend_num"
          label="推销学员"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="transactions_num"
          label="成交学员"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="refund_quantity"
          label="退费学员"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="toFollowerManage(scope.row)"
              >学员管理</el-button
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
  name: 'realTopic',
  data() {
    return {
      selectData: [],
      datas: {},
      schoolData: [{ transactions_num: 1 }],
    }
  },
  created() {
    this.$api.getCategoryList(this, 'selectData')
    this.$api.getCourseCensus(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getCourseCensus(this, 'schoolData', this.datas)
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
    toFollowerManage(zx) {
      this.$router.push({
        path: '/sts/followerManage',
        // query: {
        //   institution_id: 1,
        //   course_id: 1,
        // },
        query: {
          institution_id: zx.institution_id,
          course_id: zx.course_id,
        },
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
