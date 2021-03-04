<template>
  <div class="order">
    <div style="margin-bottom:20px">
      <search
        :hideTime="true"
        :hideOtherOption="true"
        :selectItems="false"
        api="videocollectionlist"
        placeholder="课程分类"
        @getTable="getTable"
      ></search>
    </div>

    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
      >
        <el-table-column prop="nickname" label="订单编号" min-width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="classNum" label="支付时间" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="classNum" label="课程名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="classroomName" label="应收金额" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="classroomName" label="已收金额" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="classroomName" label="欠费金额" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="classroomName" label="退费金额" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="classroomName" label="订单来源" min-width="100" show-overflow-tooltip></el-table-column>
      </el-table>
      <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page :data="schoolData.count"
                :curpage="page"
                @pageChange="doPageChange" />
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schoolData: [
        { nickname: "聊", classNum: "1500333" },
        { nickname: "聊", classNum: "1500333" },
      ],
    };
  },
   methods:{
      // 获取数据
    getTable(state, val) {
      console.log(state, val);
      if (state == "page") {
        this.page = val;
      } else if (state == "data") {
        this.dataList = val;
      }
    },
  }
};
</script>

<style>
</style>