<template>
  <section class="mainwrap">
    <search :hideTime="true" :hideOtherOption="true"></search>

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
          prop="uid"
          label="学员姓名"
          min-width="50"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="courseName"
          label="手机号码"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="courseType"
          label="所属机构"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="courseType"
          label="所属班级"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cardPerson"
          label="最早加入时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cardPerson"
          label="最后离开时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cardPerson"
          label="观看时长"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cardPerson"
          label="观看进度"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="观看情况" fixed="right" min-width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="watchDialog(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
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
            prop="uid"
            label="加入时间"
            min-width="50"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="courseName"
            label="离开时间"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cardPerson"
            label="观看时长"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: 'classSituation',
  data() {
    return {
      dialogVisible: false,
      schoolData: [
        {
          uid: 1,
          courseName: '系统集成项目管理师',
          courseType: '职称类',
          cardPerson: '123',
        },
      ],
    }
  },
  methods: {
    toLiveStatistics() {
      this.$router.push({
        path: '/sts/liveStatistics',
      })
    },
    toReplayStatistics() {
      this.$router.push({
        path: '/sts/replayStatistics',
      })
    },
    watchDialog() {
      this.dialogVisible = true
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
