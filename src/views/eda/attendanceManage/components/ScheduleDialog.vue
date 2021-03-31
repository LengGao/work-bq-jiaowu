<template>
  <el-dialog
    title="提示"
    :visible.sync="visible"
    :close-on-click-modal="false"
    width="40%"
    @open="handleOpen"
  >
    <!-- <span>这是一段信息</span> -->
    <el-table
      ref="multipleTable"
      :data="schoolData"
      tooltip-effect="light"
      stripe
      style="width: 100%;"
      class="min_table"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        prop="uid"
        label="序号"
        show-overflow-tooltip
        min-width="90"
      ></el-table-column>
      <el-table-column
        prop="user_realname"
        label="上课日期"
        min-width="110"
        show-overflow-tooltip
      ></el-table-column>

      <el-table-column
        prop="user_realname"
        label="上课时间"
        min-width="110"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="user_realname"
        label="状态"
        min-width="110"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        min-width="200"
        max-width="200"
      >
        <template slot-scope="{ row }">
          <div class="operation_btn">
            <el-button type="text" @click="dialoShow">排班详情</el-button>
            <div>
              <el-button type="text" @click="toCallinClass(scope.row)"
                >上课点名</el-button
              >
              <el-button type="text" @click="toSinCode(scope.row)"
                >签到码</el-button
              >
              <el-button type="text" @click="toAttendanceStatistics(scope.row)"
                >考勤统计</el-button
              >
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" style="display:flex;justify-content:center">
      <el-button @click="detailVisible = false" type="primary">关 闭</el-button>
      <!-- <el-button type="primary" @click="detailVisible = false"
            >确 定</el-button
          > -->
    </span>
  </el-dialog>
</template>

<script>
import { getWorkPageList, getTeacherList, getcourseallclass } from '@/api/eda'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: this.value,
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
  },
  methods: {
    handleOpen() {},
  },
}
</script>

<style></style>
