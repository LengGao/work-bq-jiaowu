<template>
  <div class="order">
    <div style="margin-bottom:20px">
      <search
        :hideTime="true"
        :hideOtherOption="true"
        :selectItems="true"
        api="videocollectionlist"
        placeholder="班级名称"
        @getTable="getTable"
      ></search>
    </div>

    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.data"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
      >
        <el-table-column label="头像" min-width="110" show-overflow-tooltip>
            <template slot-scope="scope"><img :src="scope.row.user_img" alt="" srcset="" style="width:45px;border-radius:50%" /></template>
        </el-table-column>
          <el-table-column prop="course_username" label="学员姓名" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="telphone" label="手机号码" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="entry_time" label="最早加入时间" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="leave_time" label="最后离开时间" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="classroom_name" label="所属班级" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="live_video_learn_time" label="观看时长" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="progress" label="观看进度" min-width="120" show-overflow-tooltip>
           <template slot-scope="scope"> 
             <!-- <el-progress :percentage="parseFloat(scope.row.progress)"   :show-text="false" style="float:left" :stroke-width="10" color="#db3e71"></el-progress> -->
             {{scope.row.progress}}%</template>
          
        </el-table-column>
        <!-- <el-table-column prop="classroomName" label="订单来源" min-width="100" show-overflow-tooltip></el-table-column> -->
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page :data="schoolData.total"
                :curpage="page"
                @pageChange="doPageChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schoolData: [],
      page:1
    };
  },
  mounted(){
    this.$api.livevideocount(this,'schoolData')
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
    doPageChange(page){
       this.page = page;
     this.$api.livevideocount(this,'schoolData')
    }
  }
};
</script>

<style>
</style>