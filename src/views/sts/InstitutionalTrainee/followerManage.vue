<template>
  <section class="mainwrap">
    <div class="head">
      <div style="display: flex;justify-content:space-between">
        <el-date-picker
          v-model="dataTime"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator=" 至 "
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-select
          style="width:150px;padding-left:10px"
          v-model="ruleForm.type"
          placeholder="成交状态"
        >
          <el-option
            v-for="item in dealData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          style="width:150px;padding-left:10px"
          v-model="ruleForm.school_id"
          placeholder="所属校区"
          @change="searchSchool"
        >
          <el-option
            v-for="item in campusData.list"
            :key="item.institution_id"
            :label="item.institution_name"
            :value="item.institution_id"
          ></el-option>
        </el-select>
        <el-input
          style="width:200px;margin-left:10px"
          placeholder="姓名,手机号码"
          prefix-icon="el-icon-search"
          v-model="ruleForm.name_phone"
          @keypress.native.enter="searchSchool"
        ></el-input>
        <el-button
          class="time_btn"
          @click="searchSchool"
          style="margin-left:10px;"
          >查询</el-button
        >
        <el-button
          class="time_btn"
          @click="reset"
          type="primary"
          style="margin-left:10px;"
          >重置</el-button
        >
      </div>
      <el-button type="primary">导出数据</el-button>
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
        <!-- <el-table-column type="selection" width="30"></el-table-column> -->
        <el-table-column
          prop="realname"
          label="学员姓名"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="注册时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="type"
          label="成交状态"
          min-width="70"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="to_school_id"
          label="所属校区"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="class_id"
          label="所属班级"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="learn_hours"
          label="学习时长"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="learn_process"
          label="学习进程"
          min-width="70"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="practice_total"
          label="做题总数"
          min-width="70"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="practice_process"
          label="做题进度"
          min-width="70"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="attend_rate"
          label="直播到课率"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="toStudentDetail(scope.row)"
              >学员详情</el-button
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
  name: 'practitioner',
  data() {
    return {
      campusData: [],
      dataTime: '',
      page: 1,
      ruleForm: {
        school_id: '',
        name_phone: '',
        type: '',
        startTime: '',
        endTime: '',
      },
      dealData: [
        {
          value: 1,
          label: '未成交',
        },
        {
          value: 2,
          label: '已成交',
        },
        {
          value: 3,
          label: '已退费',
        },
      ],
      schoolData: [
        {
          uid: 1,
          courseName: '260',
          courseType: '60%',
          cardPerson: '123',
        },
      ],
    }
  },
  created() {
    this.$api.getStaffCensus(this, 'schoolData')
    this.$api.getSubBlock(this, 'campusData')
  },
  methods: {
    reset() {},
    searchSchool() {
      this.ruleForm.startTime = this.dataTime[0]
      this.ruleForm.endTime = this.dataTime[1]
      console.log(this.ruleForm)
    },
    doPageChange(page) {
      this.page = page
      this.$api.getStaffCensus(this, 'schoolData')
    },
    toStudentDetail(zx) {
      this.$router.push({
        path: '/etm/studentDetail',
        query: {
          intent_id: zx.intent_id,
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
}
.userTable {
  margin-top: 20px;
}
</style>
