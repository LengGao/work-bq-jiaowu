<template>
  <section class="mainwrap">
    <search2
      :contentShow="true"
      :campusShow="true"
      :organShow="true"
      :classShow="true"
      api="getSubscribeInfo"
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
          prop="uid"
          label="学员编号"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="username"
          label="学员姓名"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="classroom_name"
          label="所在班级"
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
          prop="institution_name"
          label="所属校区"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="admin_name"
          label="所属老师"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cardPerson"
          label="备注"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="toFaceManagement(scope.row)"
              >面授课管理</el-button
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
  name: 'followerDetail',
  data() {
    return {
      page: 1,
      datas: {},
      schoolData: [],
      organData: [],
      classDate: [],
    }
  },
  created() {
    this.$api.getSubscribeInfo(this, 'schoolData')
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
      this.$api.getSubscribeInfo(this, 'schoolData', this.datas)
    },
    toFaceManagement() {
      this.$router.push({
        path: '/sts/faceManagement',
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
