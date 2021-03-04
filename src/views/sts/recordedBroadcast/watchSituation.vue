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
          label="章节名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="courseName"
          label="视频总时长"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="courseType"
          label="=视频个数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cardPerson"
          label="观看人数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="观看人员">
          <template slot-scope="scope">
            <el-button type="text" @click="toSpectator(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  name: 'watchSituation',
  data() {
    return {
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
    toSpectator() {
      this.$router.push({
        path: '/sts/spectator',
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
