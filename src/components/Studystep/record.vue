<template>
  <div class="record">
    <el-input type="textarea"
              placeholder="请填写跟进记录" />
    <div class="record_btn">
      <el-button type="primary"
                 size="medium">发布</el-button>
    </div>
    <div class="userTable">
      <el-table ref="multipleTable"
                :data="schoolData"
                tooltip-effect="light"
                stripe
                style="width: 100%"
                class="min_table">
        <el-table-column prop="nickname"
                         label="员工姓名"
                         min-width="110"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classNum"
                         label="发布时间"
                         min-width="150"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classNum"
                         label="员工职位"
                         min-width="150"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classroomName"
                         label="记录详情"
                         min-width="100"
                         show-overflow-tooltip></el-table-column>

      </el-table>
      <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page :data="schoolData.count"
                :curpage="page"
                @pageChange="doPageChange" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schoolData: [
        { nickname: '聊', classNum: '1500333' },
        { nickname: '聊', classNum: '1500333' }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.el-textarea__inner {
  height: 100px;
}
.record_btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  .el-button {
    width: 100px;
  }
}
</style>