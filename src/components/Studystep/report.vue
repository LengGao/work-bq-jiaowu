<template>
  <div>
    <el-row>
      <el-col :lg="6"
              v-for="(item,index) in 4"
              :key="index">
        <div class="timeCard">
          <div>
            <h3>坚持学习天数</h3>
            <div class="time_num"><span>55</span>天</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="practive">
      <h1>题库练习</h1>
      <div class="userTable">
        <el-table ref="multipleTable"
                  :data="schoolData"
                  tooltip-effect="light"
                  stripe
                  style="width: 100%"
                  class="min_table">

          <el-table-column prop="uid"
                           label="刷题数量"
                           show-overflow-tooltip
                           min-width="90"></el-table-column>
          <el-table-column prop="nickname"
                           label="做题进度"
                           min-width="110"
                           show-overflow-tooltip></el-table-column>

          <el-table-column prop="mobile"
                           label="正确率"
                           min-width="150"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="classNum"
                           label="收藏题数"
                           min-width="150"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="classroomName"
                           label="错数题数"
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
  </div>
</template>

<script>
export default {}
</script>

<style lang='scss' scoped>
.timeCard {
  width: 90%;
  height: 90px;
  border: 1px solid #ccc;
  float: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 14px;
  .time_num {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    span {
      font-size: 35px;
      font-weight: 600;
    }
  }
}
.practive {
  padding-top: 20px;
  h1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 6px;
    border-left: 4px solid #199fff;
    font-weight: 600;
  }
}
</style>