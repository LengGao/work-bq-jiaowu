<template>
  <section class="mainwrap">
    <el-form
      label-width="70px"
      class="demo-ruleForm"
      :show-message="true"
      label-position="left"
    >
      <el-row style="min-width:1100px">
        <el-col :lg="21" :sm="21" :xs="21" :md="21">
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row class="detailLine">
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="课程分类" prop="category_name">
                  <div class="ruleWord">{{ ruleForm.category_name }}</div>
                  <!-- <el-input v-model="ruleForm.class_type" disabled></el-input> -->
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="直播场次" prop="live_name">
                  <div class="ruleWord">{{ ruleForm.live_name }}</div>
                  <!-- <el-input v-model="ruleForm.uid" disabled></el-input> -->
                </el-form-item>
                <!-- <span>学员编号</span>
                <el-input disabled v-model="ruleForm.uid"></el-input> -->
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="任课老师" prop="teacher_name">
                  <div class="ruleWord">{{ ruleForm.teacher_name }}</div>
                  <!-- <el-input
                    v-model="ruleForm.live_teacher_name"
                    disabled
                    style="width:100px"
                  ></el-input> -->
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="课程名称" prop="course_name">
                  <div class="ruleWord">{{ ruleForm.course_name }}</div>
                  <!-- <el-input v-model="ruleForm.class_type" disabled></el-input> -->
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="直播班级名称" prop="live_class_name">
                  <div class="ruleWord ruleWord-padfl ">
                    {{ ruleForm.live_class_name }}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="上课时长" prop="live_time">
                  <div class="ruleWord">{{ ruleForm.live_time }}</div>
                  <!-- <el-input
                    v-model="ruleForm.class_type"
                    disabled
                    style="width:100px"
                  ></el-input> -->
                </el-form-item>
              </el-col>

              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="上课时间" prop="start_push_time">
                  <div class="ruleWord ">
                    {{ ruleForm.start_push_time }}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="下课时间" prop="end_push_time">
                  <div class="ruleWord ">
                    {{ ruleForm.end_push_time }}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="推流详情">
                  <el-button type="text" @click="watchDetail(1)"
                    >详情</el-button
                  >
                </el-form-item>
              </el-col>
              <el-col :lg="8" :md="8" :sm="8" :xs="8">
                <el-form-item label="录制视频">
                  <el-button type="text" @click="watchDetail(2)"
                    >详情</el-button
                  >
                </el-form-item>
              </el-col>
              <el-col :lg="16" :md="16" :sm="16" :xs="16">
                <el-form-item label="关联班级" prop="classroom_name_str">
                  <div class="ruleWord">{{ ruleForm.classroom_name_str }}</div>
                  <!-- <el-input
                    v-model="ruleForm.update_time"
                    disabled
                    style="width:700px"
                  ></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
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
          v-for="(item, index) in dialogTitle"
          :key="index"
          :prop="item.prop"
          :label="item.name"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="下载链接"
          min-width="150"
          show-overflow-tooltip
          v-if="dialogWidth == '70%'"
        >
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="downLoad(scope.row.url)"
              >下载</el-button
            > -->
            <a :href="scope.row.url" target="_blank" style="color:#52adf1"
              >下载</a
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--下半部分-->
    <div class="studyDetail">
      <!--tag-->
      <div class="studentTag">
        <el-tabs v-model="currentView">
          <el-tab-pane label="直播概况" name="survey"></el-tab-pane>
          <!-- <el-tab-pane label="直播互动" name="interaction"></el-tab-pane> -->
          <el-tab-pane
            label="直播统计"
            name="liveBroadcastStatistics"
          ></el-tab-pane>
          <el-tab-pane label="回播统计" name="Statistics"></el-tab-pane>
          <!-- <el-tab-pane label="学习轨迹" name="trajectory"></el-tab-pane> -->
          <component
            :is="currentView"
            :uid="uid"
            :course_id="course_id"
            style="width:100%,height:700px"
            keep-alive
          ></component>
        </el-tabs>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'studentDetail',
  data() {
    return {
      dialogVisible: false,
      uid: 4431,
      detailData: [],
      dialogWidth: '',
      push_detail: [],
      title: '老师推流详情',
      video_list: [],

      dialogTitle: [],

      pushTitle: [
        { name: '推流时间', prop: 'start_time', width: '150' },
        { name: '断流时间', prop: 'end_time', width: '150' },
      ],
      videoTitle: [
        { name: '视频名称', prop: 'fileName', width: '100' },
        { name: '文件大小', prop: 'fileSize', width: '50' },
        { name: '视频时长', prop: 'duration', width: '50' },
        { name: '分辨率', prop: 'resolution', width: '50' },
        { name: '录制开始时间', prop: 'startTime', width: '120' },
        { name: '录制结束时间', prop: 'endTime', width: '120' },
      ],
      // pushTitle: [{ name: '推流时间' }, { name: '断流时间' }],
      course_id: '1',
      currentView: 'survey', //当前组件
      ruleForm: {},
      course_data: [], //自定义标签
      course_Arr: [],
      Courname: [],
    }
  },
  mounted() {
    this.$api.getLiveDetail(this, 'ruleForm')
    // this.$api.relateCourse(this, 'Courname', 'detail')
  },
  components: {
    //以下方式引入路由是路由的懒加载，有利于页面优化
    //跟进记录
    survey: (resolve) => {
      require(['@/components/liveBroadcast/survey.vue'], resolve)
    },
    //信息报告
    interaction: (resolve) => {
      require(['@/components/liveBroadcast/interaction.vue'], resolve)
    },
    //学习进度
    liveBroadcastStatistics: (resolve) => {
      require([
        '@/components/liveBroadcast/liveBroadcastStatistics.vue',
      ], resolve)
    },
    //订单记录
    Statistics: (resolve) => {
      require(['@/components/liveBroadcast/Statistics.vue'], resolve)
    },
  },
  methods: {
    downLoad(data) {
      this.$api.downloadZips(data)
    },
    watchDetail(num) {
      console.log(this.push_detail)
      switch (num) {
        case 1:
          this.dialogTitle = this.pushTitle
          this.detailData = this.push_detail

          this.title = '老师推流详情'
          this.dialogWidth = '30%'
          break
        case 2:
          this.dialogTitle = this.videoTitle
          this.detailData = this.video_list
          this.title = '录制视频详情'
          this.dialogWidth = '70%'
          break
      }
      // this.detailData = zx.detail
      this.dialogVisible = true
      // console.log(zx)
    },
    selectCourse() {
      this.course_id = this.ruleForm.course_id
    },
    handleClick() {
      console.log(11)
    },
    toStudyReport() {
      console.log(this.course_Arr)
      // this.$router.push({
      //   name: 'studyReport',
      // })
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
/deep/.el-form-item__label {
  color: #999;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.ruleWord {
  color: #666;
  font-size: 16px;
}
.ruleWord-padfl {
  padding-left: 20px;
}
.flexstyle {
  display: flex;
  align-items: center;
  span {
    padding-right: 10px;
  }
}
.el-input {
  width: 238px;
}
.breadcrumb {
  display: flex !important;
  justify-content: flex-start;
}
.el-select {
  width: 238px;
}
.detailLine {
  padding-bottom: 20px;
}
.studyDetail {
  border-top: 30px solid #f0f2f5;
  padding: 20px;
}
.mainwrap {
  padding: 30px 0;
}
.el-form {
  padding: 0 30px;
}
.el-tabs {
  padding: 0 30px;
}
</style>
