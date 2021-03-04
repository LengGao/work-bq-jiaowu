<template>
  <section class="mainwrap">
    <search
      v-model="datas"
      :classNameHide="false"
      api="getlearners"
      :statusNum="2"
      @getTable="getTableList"
    ></search>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="myclient.data"
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
          prop="user_img"
          label="学员头像"
          show-overflow-tooltip
          min-width="90"
        >
          <template slot-scope="scope">
            <div style="width:50px ;height:50px;">
              <img :src="scope.row.user_img" alt class="school_class_box" />
            </div>
          </template>
        </el-table-column>
        <!--<el-table-column
          prop="institution_name"
          label="所属校区"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>-->
        <el-table-column
          prop="user_realname"
          label="学生姓名"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="telphone"
          label="手机号码"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="加入时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <!--<el-table-column
          prop="category_name"
          label="课程类型"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sources"
          label="渠道来源"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>-->
        <!-- <el-table-column
          prop="category_name"
          label="所属机构"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>-->
        <!--<el-table-column
          prop="teacher_name"
          label="所属老师"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="成交状态" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.type | dealType }}
          </template>
        </el-table-column>-->
        <el-table-column
          prop="is_admin"
          label="小程序管理员"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.is_admin == 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="unionid"
          label="unionid"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column> -->
        <el-table-column
          prop="uuid"
          label="uuid"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="apple_openid"
          label="小程序openid"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pc_openid"
          label="pc端openid"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <!--<el-table-column label="学习情况" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display:flex">
              <el-button type="text" @click="toStudentDetail(scope.row)">学员详情</el-button>
            </div>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display:flex">
              <el-button type="text" @click="operation(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="eliminate(scope.row)"
                >清除登录信息</el-button
              >
              <el-button type="text" @click="toStudentDetail(scope.row)"
                >学员详情</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="myclient.total"
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
  name: 'queryStudent',
  data() {
    return {
      myclient: [],
      status: 2,
      page: 1,
      datas: {},
      visible2: false,
    }
  },
  mounted() {
    this.$api.getlearners(this, 'myclient', status)
  },
  filters: {
    dealType(type) {
      if (type == '2') {
        return '已成交'
      } else if (type == '3') {
        return '已退费'
      } else {
        return '未成交'
      }
    },
  },
  methods: {
    getTableList(state, val, datas) {
      console.log(state, val, datas)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.myclient = val
      }
    },
    doPageChange(page) {
      this.page = page
      this.$api.getlearners(this, 'myclient', this.datas)
    },
    toStudentDetail(zx) {
      console.log(zx)
      this.$router.push({
        path: '/etm/studentDetail',
        query: { intent_id: zx.intent_id, uid: zx.uid },
      })
    },
    //编辑
    operation(xx) {
      this.$router.push({
        path: '/etm/studentsToEdit',
        query: { uid: xx.uid },
      })
    },
    //清除用户微信登录信息
    eliminate(yy) {
      var that = this
      that
        .$confirm('清除后,用户需要重新授权登录,需谨慎操作', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
          center: true,
          customClass: 'popUp',
        })
        .then(() => {
          var lol = {
            uid: yy.uid,
            login_clear: 1,
          }
          that.$api.clearlogininfo(that, lol, that.datas)
        })
        .catch(() => {
          // that.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
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
