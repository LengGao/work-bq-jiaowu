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
        <el-table-column
          prop="uid"
          label="学员编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="uid"
          label="学员头像"
          show-overflow-tooltip
          min-width="90"
        >
          <template slot-scope="scope">
            <div style="margin:0 auto;width:50px ;height:50px;">
              <img :src="scope.row.user_img" alt class="school_class_box" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="user_nicename"
          label="微信昵称"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="realname"
          label="学生姓名"
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
          prop="create_time"
          label="加入时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column
          prop="class_type"
          label="意向类型"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="意向课程"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column> -->

        <el-table-column
          prop="sources"
          label="数据来源"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:center">
              <el-button
                type="text"
                @click="toStudentDetail(scope.row)"
                style="padding-right:20px"
                >详情</el-button
              >
              <el-button type="text" @click="receiveStudent(scope.row)"
                >领取</el-button
              >
            </div>
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

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
    // let status = 3
    this.$api.getMyclient(this, 'schoolData')
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

    toStudentDetail(zx) {
      console.log(zx)
      let intent_id = zx.intent_id
      this.$router.push({
        path: '/etm/studentDetail',
        query: { intent_id: intent_id, uid: zx.uid },
      })
    },
    receiveStudent(zx) {
      console.log(zx)
      this.$api.receive(this, zx.intent_id)
    },
    doPageChange(page) {
      this.page = page
      // this.$api.getMyclient(this, 'myclient', status)
      this.$api.getMyclient(this, 'schoolData', this.datas)
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
