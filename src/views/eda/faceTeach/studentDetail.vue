<template>
  <section class="mainwrap">
    <div class="head">
      <search2
        api="getStudentList"
        :contentShow="true"
        @getTable="getTableList"
        inputText="学生姓名,手机号码"
      ></search2>
      <div>
        <el-button type="primary" @click="toAddTrainee">添加学员</el-button>

        <el-button
          type="primary"
          v-intervalclick="{ func: exportData, time: 2000 }"
          >导出数据</el-button
        >
        <!--  -->
        <!--  -->
      </div>
    </div>
    <!--tag-->
    <div class="studentTag">
      <ul>
        <li
          v-for="item in tags"
          :class="{ tabg: item.id == isTagactive }"
          @click="statusSwitch(item)"
          :key="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
      <el-button type="primary" v-if="messageShow" @click="toGroupmessage"
        >群发短信</el-button
      >
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData"
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
          min-width="80"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="学员姓名"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="100"
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
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column
          prop="teacher_name"
          label="所属老师"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column> -->
        <el-table-column label="状态" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.status | dealStatus(scope.row.missed) }}
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop="remarks"
          v-show="remarkShow"
          label="备注"
          min-width="90"
          show-overflow-tooltip
          >24234</el-table-column
        > -->
        <el-table-column
          prop="create_time"
          label="签到时间"
          v-if="signedIn"
          min-width="90"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="来源"
          prop="from"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          show-overflow-tooltip
          v-if="operateShow"
        >
          <template slot-scope="scope" v-if="operateShow">
            <!--取消预约   签到-->
            <div v-if="scope.row.status == 1 && scope.row.missed == 0">
              <el-button
                type="text"
                @click="
                  changeStatus(
                    scope.row,
                    -1,
                    '取消预约后学员无法签到上课,是否确认取消?'
                  )
                "
                >取消预约</el-button
              >
              <el-button
                type="text"
                @click="
                  changeStatus(
                    scope.row,
                    2,
                    '点击签到说明学生已来上课,是否确认签到?'
                  )
                "
                >签到</el-button
              >
            </div>

            <!--确认   取消预约-->
            <div v-else-if="scope.row.status == 0">
              <el-button
                type="text"
                @click="
                  changeStatus(
                    scope.row,
                    0,
                    '点击确认说明同意学生的申请,是否确认?'
                  )
                "
                >确认</el-button
              >
              <el-button
                type="text"
                @click="
                  changeStatus(
                    scope.row,
                    -1,
                    '取消预约后学员无法签到上课,是否确认取消?'
                  )
                "
                >取消预约</el-button
              >
            </div>

            <!-- 补签到  -->
            <div v-else-if="scope.row.status == 1 && scope.row.missed == 1">
              <el-button
                type="text"
                @click="
                  changeStatus(
                    scope.row,
                    2,
                    '点击签到说明学生已来上课,是否确认签到?'
                  )
                "
                >补签到</el-button
              >
            </div>
            <div v-else>
              ---
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
import Vue from 'vue'
export default {
  name: 'studentDetail',
  data() {
    return {
      page: 1,
      remarkShow: true,
      isTagactive: 1,
      messageShow: false,
      signedIn: false,
      operateShow: true,
      status: -2,
      schoolData: [],
      datas: {},
      student_id: '',
      tags: [
        {
          id: 1,
          name: '全部预约',
          status: -2,
        },
        {
          id: 2,
          name: '待确认',
          status: 0,
        },
        {
          id: 3,
          name: '待上课',
          status: 1,
        },
        {
          id: 4,
          name: '已签到',
          status: 2,
        },
        {
          id: 5,
          name: '已失约',
          status: 1,
        },
        {
          id: 6,
          name: '已取消',
          status: -1,
        },
      ],
    }
  },
  created() {},
  mounted() {
    this.$api.getStudentList(this, 'schoolData')
    // let status = sessionStorage.getItem('status')
    // let isTagactive = sessionStorage.getItem('isTagactive')
    // console.log(status, isTagactive)
    // if (status != null || status != '') {
    //   this.status = status
    // } else {
    //   this.status = -2
    // }
    // if (isTagactive != null || isTagactive != '') {
    //   this.isTagactive = isTagactive
    // } else {
    //   this.isTagactive = 1
    // }
  },
  filters: {
    dealFrom(val) {
      if (val == 1) {
        return '后台添加'
      } else if (val == 2) {
        return '小程序'
      } else if (val == 3) {
        return 'PC端'
      } else if (val == 4) {
        return '移动端'
      } else {
        return '未知'
      }
    },
    dealStatus(status, missed) {
      console.log(status, missed)
      if (status == -1) {
        return '已取消'
      } else if (status == 0) {
        return '待确认'
      } else if (status == 1 && missed == 0) {
        return '已预约'
      } else if (status == 1 && missed == 1) {
        return '已失约'
      } else if (status == 2) {
        return '已签到'
      }
      {
        return '---'
      }
    },
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getStudentList(this, 'schoolData', this.datas)
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
    //导出数据
    exportData: function(val) {
      if (this.data >= '200') {
        this.$message.error('导出数据最多为200条')
        return
      }
      this.$message.success('正在导出数据，请勿重复提交！')
      location.href =
        Vue.prototype.downLoad +
        '/subscribe/export' +
        '?subscribe_classroom_id=' +
        this.$route.query.subscribe_classroom_id
      console.log('点击的次数')
    },
    //状态切换
    statusSwitch(ab) {
      console.log(ab)
      //单击tag是切换背景颜色
      this.isTagactive = ab.id
      this.status = ab.status
      sessionStorage.setItem('status', ab.status)
      sessionStorage.setItem('isTagactive', ab.id)
      this.$api.getStudentList(this, 'schoolData')
      // this.status = ab.status
      // this.isFail = ab.isFail
      // this.$router.push({
      //   name: 'studentDetail',
      //   query: {
      //     id: this.$route.query.id,
      //     dateTime: this.$route.query.dateTime,
      //     status: ab,
      //     isFail: av,
      //     isTagactive: all.id,
      //   },
      // })
      var tabId = ab.id
      switch (tabId) {
        case 3:
          this.remarkShow = false
          this.signedIn = false
          this.messageShow = true
          break
        case 4:
          this.remarkShow = false
          this.signedIn = true
          this.messageShow = false
          this.operateShow = false
          break
        case 6:
          this.remarkShow = false
          this.operateShow = false
          break
        default:
          this.remarkShow = true //备注
          this.signedIn = false //签到
          this.messageShow = false //群发短信
          this.operateShow = true //操作
      }
      // if (ab.id == 2) {
      //   this.beConfirmed = true
      // } else {
      //   this.beConfirmed = false
      // }

      // if (ab.id == 3) {
      // } else {
      //   this.remarkShow = true
      // }
      // if (all.id == 4) {
      //   this.remarkShow = false
      // } else {
      //   this.remarkShow = true
      // }
      // if (all.id == 5) {
      //   this.breakPromise = true
      // } else {
      //   this.breakPromise = false
      // }
      // if (all.id == 6) {
      //   this.Cancelled = true
      // } else {
      //   this.Cancelled = false
      // }
    },
    changeStatus(zx, status, title) {
      console.log(zx)
      this.student_id = zx.student_id
      // let status = status
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.$api.updateStudentStatus(this, status)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    toGroupmessage() {
      this.$router.push({
        path: '/eda/GroupSms',
        query: {
          subscribe_classroom_id: this.$route.query.subscribe_classroom_id,
          course_id: this.$route.query.course_id,
          problem_course_id: this.$route.query.problem_course_id,
        },
      })
    },

    toAddTrainee() {
      this.$router.push({
        path: '/eda/addTrainee',
        query: {
          subscribe_classroom_id: this.$route.query.subscribe_classroom_id,
          course_id: this.$route.query.course_id,
          problem_course_id: this.$route.query.problem_course_id,
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
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.tabg {
  background: #2798ee;
  color: #fff;
}
.studentTag {
  padding: 20px 0;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul {
    max-width: 420px;
    display: flex;
    border: 1px solid rgb(220, 223, 230);
    border-radius: 3px;
    height: 32px;
    li {
      width: 70px;
      height: 31px;
      border-right: 1px solid rgb(220, 223, 230);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
      // li:hover {
      //   display: block;
      //   background: #2798ee;
      // }
    }
    li:last-child {
      border-right: 0 !important;
    }
  }
}
</style>
