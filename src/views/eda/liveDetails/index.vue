<template>
  <div class="live-detail">
    <div class="detail-header">
      <div class="label">
        <span class="label-name">所属分类</span>
        <span class="label-content">{{ detailData.category_name }}</span>
      </div>
      <div class="label">
        <span class="label-name">直播名称</span>
        <span class="label-content">{{ detailData.live_class_name }}</span>
      </div>
      <div class="label">
        <span class="label-name">直播场次</span>
        <span class="label-content">{{ detailData.live_name }}</span>
      </div>
      <div class="label">
        <span class="label-name">推流详情</span>
        <span class="label-content">
          <el-button type="text" @click="openPushFlowDialog"
            >查看详情</el-button
          >
        </span>
      </div>
      <div class="label">
        <span class="label-name">任课老师 </span>
        <span class="label-content">{{ detailData.teacher_name }}</span>
      </div>
      <div class="label label-large">
        <span class="label-name">关联班级 </span>
        <span class="label-content"> {{ detailData.classroom_name_str }}</span>
      </div>
      <div class="label">
        <span class="label-name">课程明称 </span>
        <span class="label-content"> {{ detailData.course_name }}</span>
      </div>
      <div class="label">
        <span class="label-name">上课时间 </span>
        <span class="label-content">{{ detailData.start_push_time }}</span>
      </div>
      <div class="label">
        <span class="label-name">下课时间 </span>
        <span class="label-content">{{ detailData.end_push_time }}</span>
      </div>
      <div class="label">
        <span class="label-name">上课时长 </span>
        <span class="label-content">{{ detailData.live_time }}</span>
      </div>
      <div class="label">
        <span class="label-name">录制视频 </span>
        <span class="label-content">
          <el-button type="text" @click="openVideoRecordDialog"
            >查看详情</el-button
          >
        </span>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="直播概况" name="LiveEchart"></el-tab-pane>
      <el-tab-pane label="直播统计" name="LiveStatistics"></el-tab-pane>
      <el-tab-pane label="回播统计" name="PlaybackStatistics"></el-tab-pane>
    </el-tabs>
    <component
      :is="getComponent"
      :liveId="detailData.live"
      :liveClassId="detailData.live_class_id"
    />
    <PushFlowDialog v-model="pushFlowVisible" :datas="detailData.push_detail" />
    <VideoRecordDialog
      v-model="videoRecordVisible"
      :datas="detailData.video_list"
    />
  </div>
</template>

<script>
import PushFlowDialog from "./components/PushFlowDialog";
import VideoRecordDialog from "./components/VideoRecordDialog";
import { getLiveDetail } from "@/api/eda";
export default {
  name: "ClassDetail",
  components: {
    PushFlowDialog,
    VideoRecordDialog,
  },
  data() {
    return {
      activeName: "LiveEchart",
      detailData: {},
      pushFlowVisible: false,
      videoRecordVisible: false,
      currentId: "",
    };
  },
  computed: {
    getComponent() {
      if (this.activeName) {
        return () => import(`./components/${this.activeName}.vue`);
      }
    },
  },
  created() {
    this.getLiveDetail();
  },
  methods: {
    openVideoRecordDialog() {
      this.videoRecordVisible = true;
    },
    openPushFlowDialog() {
      this.pushFlowVisible = true;
    },
    async getLiveDetail() {
      const data = {
        live_id: this.$route.query?.live_id || "",
      };
      const res = await getLiveDetail(data);
      if (res.code === 0) {
        this.detailData = res.data;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.live-detail {
  padding: 20px;
  .detail-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 14px;
    .label {
      width: calc(100% / 4);
      margin-bottom: 16px;
      &-name {
        color: #909399;
        margin-right: 20px;
      }
      &-content {
        color: #606266;
      }
    }
    .label-large {
      width: 50%;
    }
  }
}
</style>