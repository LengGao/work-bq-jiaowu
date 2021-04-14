<template>
  <section class="mainwrap">
    <!-- <search2
      :courseTypeShow="true"
      :contentShow="true"
      api="getCourseList"
      typeTx="punch"
      inputText="课程名称"
      @getTable="getTableList"
      :selectList="selectData.list"
    ></search2> -->
    <!--表格-->

    <div class="search">
      <el-select
        v-model="searchData.type"
        placeholder="请选择发送类型"
        style="width:150px;margin-right:10px"
        filterable
        clearable
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入标题"
        clearable
        @keypress.native.enter="searchSchool"
        v-model="searchData.title"
        style="width:200px;margin:0 10px"
      >
      </el-input>
      <el-input
        clearable
        @keypress.native.enter="searchSchool"
        placeholder="请输入班级名称"
        v-model="searchData.classroom_name"
        style="width:200px;margin-right:10px"
      >
      </el-input>
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
          label="ID"
          prop="sms_id"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sms_type"
          label="发送类型"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="classroom_name"
          label="班级名称"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total"
          label="总数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="success"
          label="成功数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="fail"
          label="失败数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="发送时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          label="操作"
          fixed="right"
          min-width="200"
          max-width="200"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="dialogDetail(scope.row.content)"
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
    <!--详情弹框-->
    <el-dialog
      title=""
      :visible.sync="smsVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <div v-html="messDetail" class="boardDialog"></div>
      <!--
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
  </section>
</template>

<script>
import { type } from 'os'
export default {
  name: 'smsRecord',
  data() {
    return {
      page: 1,
      schoolData: [],

      selectData: [],
      smsVisible: false,
      datas: {},
      messDetail: '',
      searchData: {
        type: 1,
        title: '',
        classroom_name: '',
      },

      options: [
        {
          value: 1,
          label: '班级短信',
        },
        {
          value: 2,
          label: '面授课短信',
        },
        {
          value: 3,
          label: '验证码',
        },
      ],
    }
  },
  created() {
    // this.type = 'punch'
    // this.$api.getCategoryList(this, 'selectData')
    this.$api.getSmsList(this, 'schoolData')
  },
  methods: {
    searchSchool() {
      this.page = 1
      this.$api.getSmsList(this, 'schoolData')
    },
    dialogDetail(ab) {
      this.smsVisible = true
      this.messDetail = ab
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
    toClockDetail(zx) {
      console.log(zx)
      this.$router.push({
        path: '/sts/clockDetail',
        query: { problem_course_id: zx.problem_course_id },
      })
    },
    doPageChange(page) {
      this.page = page
      this.$api.getSmsList(this, 'schoolData')
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
.boardDialog {
  font-size: 16px;
  font-family: Arial Normal, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #999;
  text-align: left;
  line-height: 30px;
  padding-left: 40px;
}
</style>
