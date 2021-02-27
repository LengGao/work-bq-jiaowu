<template>
  <div class="trajectory">
    <div class="userTable">
      <el-table ref="multipleTable"
                :data="schoolData"
                tooltip-effect="light"
                stripe
                style="width: 100%"
                class="min_table">

        <el-table-column prop="uid"
                         label="序号"
                         show-overflow-tooltip
                         min-width="90"></el-table-column>
        <el-table-column prop="nickname"
                         label="操作时间"
                         min-width="110"
                         show-overflow-tooltip></el-table-column>

        <el-table-column prop="mobile"
                         label="操作详情"
                         min-width="150"
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

<style>
</style>