<template>
  <div class="order">
    <div style="margin-bottom:20px;display:flex">
      <!-- <search
        :hideTime="true"
        :hideOtherOption="true"
        :selectItems="true"
        api="videocollectionlist"
        placeholder="班级名称"
        @getTable="getTable"
      ></search> -->
      <search2
        :contentShow="true"
        api="getLiveStatisticForAdmin"
        inputText="学员姓名,手机号码"
        @getTable="getTableList"
      >
      </search2>
      <el-button
        type="primary"
        style="margin-left:20px"
        v-intervalclick="{ func: exportData, time: 2000 }"
        >导出</el-button
      >
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
        <el-table-column label="头像" min-width="90" show-overflow-tooltip>
          <template slot-scope="scope"
            ><img
              :src="scope.row.user_img"
              alt=""
              srcset=""
              style="width:45px;border-radius:50%"
          /></template>
        </el-table-column>
        <el-table-column
          prop="user_realname"
          label="学员姓名"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="telphone"
          label="手机号码"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column
          prop="classroom_name"
          label="所属班级"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column> -->
        <el-table-column
          prop="entry_time"
          label="最早加入时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="leave_time"
          label="最后离开时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="stay_duration"
          label="停留时长"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="play_duration"
          label="观看时长"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="progress"
          label="观看进度"
          min-width="90"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
         
            {{ scope.row.progress }}%</template
          > -->
        </el-table-column>
        <el-table-column label="观看详情">
          <template slot-scope="scope">
            <el-button type="text" @click="watchDetail(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
        <!-- <el-table-column prop="classroomName" label="订单来源" min-width="100" show-overflow-tooltip></el-table-column> -->
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
    <el-dialog
      title="观看详情"
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-table
        ref="multipleTable"
        :data="detailData"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="createdTime"
          label="最早加入时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="lastModified"
          label="最后离开时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="stayDuration"
          label="停留时长"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="playDuration"
          label="观看时长"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classDate: [],
      detailData: [],
      datas: {},
      dialogVisible: false,
      schoolData: [
        { nickname: '聊', classNum: '1500333' },
        { nickname: '聊', classNum: '1500333' },
      ],
      page: 1,
    }
  },
  created() {},
  mounted() {
    //班级名称
    // this.$api.getClassroomList(this, 'classDate')
    this.$api.getLiveStatisticForAdmin(this, 'schoolData')
    // this.$api.livecount(this, 'schoolData')
  },
  destroyed() {},
  methods: {
    //导出数据
    exportData: function(val) {
      let self = this
      // if (this.data >= '200') {
      //   self.$message.error('导出数据最多为200条！')
      //   return
      // }
      // this.disabled = true
      self.$message.success('正在导出数据，请勿重复提交！')
      location.href =
        self.$urls +
        '/LiveStatistic/exportLiveStatisticForAdmin' +
        '?live_id=' +
        self.$route.query.live_id
      console.log('点击的次数')
    },
    // exportData() {
    //   this.$api.exportLiveStatisticForAdmin(data)
    // },
    watchDetail(zx) {
      this.detailData = zx.detail
      this.dialogVisible = true
      // console.log(zx)
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
    // 获取数据
    getTable(state, val) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
      } else if (state == 'data') {
        this.dataList = val
      }
    },
    doPageChange(page) {
      this.page = page
      this.$api.getLiveStatisticForAdmin(this, 'schoolData', this.datas)
    },
  },
}
</script>

<style></style>
